import time

from app.ai.ollama_provider import OllamaProvider
from app.ai.schemas import AIAnalysis


class AIProcessor:
    def __init__(self):

        self.provider = OllamaProvider()

    def process(
        self,
        headline: str,
        content: str,
    ) -> tuple[AIAnalysis, int]:

        start = time.perf_counter()

        analysis = self.provider.analyze(
            headline,
            content,
        )

        elapsed = int((time.perf_counter() - start) * 1000)

        return analysis, elapsed
