import json

from ollama import Client

from app.ai.base import AIProvider
from app.ai.prompts import SYSTEM_PROMPT
from app.ai.schemas import AIAnalysis
from app.config.settings import get_settings

settings = get_settings()


class OllamaProvider(AIProvider):
    def __init__(self):

        self.client = Client(
            host=settings.ollama_base_url,
        )

    def analyze(
        self,
        headline: str,
        article: str,
    ) -> AIAnalysis:

        prompt = f"""
Headline:
{headline}

Article:

{article}
"""

        response = self.client.chat(
            model=settings.ollama_model,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            format=AIAnalysis.model_json_schema(),
        )

        data = json.loads(response["message"]["content"])

        # Normalize executive_summary
        if isinstance(data.get("executive_summary"), str):
            data["executive_summary"] = [data["executive_summary"]]

        # Normalize list fields
        for field in ["banks", "organizations", "keywords", "topics"]:
            if isinstance(data.get(field), str):
                data[field] = [data[field]]

        return AIAnalysis.model_validate(data)
