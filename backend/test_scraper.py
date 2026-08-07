from app.scrapers.psuconnect import PSUConnectScraper

scraper = PSUConnectScraper()

articles = scraper.fetch_articles()
article = scraper.fetch_article_content(articles[0])

print(f"Articles: {len(articles)}")

# print(articles[0][0])

# print(articles[0]["url"])

print(article["headline"])
print(article["author"])
print(article["publish_date"])
print(article["content"][:])
