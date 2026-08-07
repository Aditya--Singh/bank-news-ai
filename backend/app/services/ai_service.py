import json
from loguru import logger
from app.llm.prompt_manager import PromptManager
from app.llm.providers.base import BaseLLMProvider
from app.schemas.ai_result import AIResult
from app.utils.json_utils import extract_json


class AIService:
    def __init__(self, provider: BaseLLMProvider):
        self.provider = provider
        self.prompts = PromptManager()

    def summarize(self, article: str) -> AIResult:

        logger.info("Generating AI summary...")

        prompt = self.prompts.load("executive_summary.txt")

        prompt = prompt.replace(
            "{{ARTICLE}}",
            article,
        )

        response = self.provider.generate_with_retry(prompt)

        logger.info("AI summary generated successfully.")

        data = extract_json(response)

        logger.exception("Invalid JSON received from model.")

        return AIResult.model_validate(data)
