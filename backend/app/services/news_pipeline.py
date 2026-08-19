from loguru import logger

from app.services.scraper_service import ScraperService
from app.services.ai_service import AIService


class NewsPipelineService:
    def run(self):
        logger.info("Starting news ingestion pipeline")

        logger.info("Step 1: Scraping latest news")
        ScraperService().run()

        logger.info("Step 2: Running AI analysis")
        AIService().run()

        logger.info("News ingestion pipeline completed")
