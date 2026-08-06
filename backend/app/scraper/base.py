from abc import ABC, abstractmethod


class BaseScraper(ABC):
    @abstractmethod
    def fetch_articles(self):
        """Return article metadata."""
        pass

    @abstractmethod
    def fetch_article_content(self, article):
        """Return full article."""
        pass
