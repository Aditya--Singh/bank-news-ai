from datetime import datetime, timezone

from app.scrapers.base import BaseScraper
from app.scrapers.utils import get
import json
import pprint
from bs4 import BeautifulSoup
from app.schemas.news import NewsArticle
from loguru import logger
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
import re

IST = ZoneInfo("Asia/Kolkata")


class PSUConnectScraper(BaseScraper):
    API = "https://www.psuconnect.in/api/category"

    def _build_article_url(self, urltitle: str) -> str:
        slug = urltitle.replace("\u00a0", " ")
        slug = re.sub(r"\s+", "-", slug.strip())
        return f"https://www.psuconnect.in/bank-news/{slug}"

    def fetch_articles(self):

        offset = 0
        limit = 16

        articles = []

        while True:
            response = get(
                self.API,
                params={
                    "category": "bank-news",
                    "limit": limit,
                    "offset": offset,
                },
            )

            data = response.json()

            # print(type(data))
            # print(data.keys())
            # print(json.dumps(data, indent=2)[:3000])
            # break

            if not data.get("success"):
                break

            articles_data = data.get("data", [])

            if not articles_data:
                break

            # import pprint

            # pprint.pp(articles_data[0])
            # return []

            cutoff = datetime(2026, 6, 20, tzinfo=timezone.utc)
            page_has_recent = False

            for item in articles_data:
                publish_date = datetime.fromisoformat(
                    item["date"].replace("Z", "+00:00")
                ).astimezone(IST)

                if publish_date >= cutoff:
                    page_has_recent = True

                # if publish_date < datetime(2026, 6, 20, tzinfo=timezone.utc):
                #     logger.info("Reached cutoff date. Stopping scraper.")
                #     return articles

                # article = {
                #     "id": item["id"],
                #     "headline": item["title"],
                #     "url": f"https://www.psuconnect.in/bank-news/{item['urltitle'].replace(' ', '-')}",
                #     "publish_date": publish_date,
                #     "publisher": item.get("publisher"),
                #     "author": item.get("auther"),  # API typo
                #     "shortdesc": item.get("shortdesc"),
                #     "image": item.get("image"),
                # }

                article = NewsArticle(
                    source="PSU Connect",
                    headline=item["title"],
                    # url=f"https://www.psuconnect.in/bank-news/{item['urltitle'].replace(' ', '-')}",
                    url=self._build_article_url(item["urltitle"]),
                    publish_date=publish_date,
                    publisher=item.get("publisher"),
                    author=item.get("auther"),
                    shortdesc=item.get("shortdesc"),
                    image=item.get("image"),
                    external_id=item["id"],
                )

                articles.append(article)

            logger.info(f"Fetching offset={offset}")
            logger.info(f"Returned {len(articles_data)} articles")
            # print(article.headline)
            # print(article.publish_date)

            if not page_has_recent:
                logger.info("Reached cutoff date.")
                break

            offset += limit

        return articles

    def fetch_article_content(self, article):

        response = get(article.url)

        soup = BeautifulSoup(response.text, "lxml")

        # Remove unwanted tags
        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()

        # print(article.url)
        # print(soup.title)
        # print(soup.prettify()[:])

        # Find the article container
        article_body = (
            soup.find("div", class_="news-content")
            or soup.find("div", class_="post-content")
            or soup.find("div", class_="entry-content")
            or soup.find("article")
        )

        if article_body is None:
            raise Exception(f"Article body not found: {article['url']}")

        content = []

        for element in article_body.find_all(["h3", "p"]):
            text = element.get_text(" ", strip=True)

            if not text:
                continue

            # Skip unwanted text
            if text.startswith("Follow PSU Connect"):
                continue

            if text == "Advertisement":
                continue

            content.append(text)

        article.content = "\n\n".join(content)

        return article
