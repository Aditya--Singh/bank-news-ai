from loguru import logger

from app.database.database import SessionLocal
from app.repositories.news_repository import NewsRepository
from app.scraper.psuconnect import PSUConnectScraper


class ScraperService:
    def run(self):

        db = SessionLocal()

        try:
            repository = NewsRepository(db)

            scraper = PSUConnectScraper()

            articles = scraper.fetch_articles()

            logger.info(f"Found {len(articles)} articles")

            existing_urls = repository.get_existing_urls()

            logger.info(f"{len(existing_urls)} articles already exist")

            inserted = 0
            skipped = 0

            for article in articles:
                if article.url in existing_urls:
                    skipped += 1
                    continue

                article = scraper.fetch_article_content(article)

                repository.save(article)

                existing_urls.add(article.url)

                inserted += 1

                logger.info(f"Inserted: {article.headline}")

            logger.info(f"Completed. Inserted={inserted}, Skipped={skipped}")

        finally:
            db.close()
