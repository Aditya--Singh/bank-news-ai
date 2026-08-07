from ollama import Client

from app.config.settings import get_settings
from app.llm.providers.base import BaseLLMProvider


class OllamaProvider(BaseLLMProvider):
    def __init__(self):

        settings = get_settings()

        self.client = Client(host=settings.ollama_base_url)

        self.model = settings.ollama_model

    def generate(self, prompt: str) -> str:

        response = self.client.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            options={
                "temperature": temperature,
            },
        )

        return response["message"]["content"]
