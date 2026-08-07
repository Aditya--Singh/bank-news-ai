from abc import ABC, abstractmethod

from app.ai.schemas import AIAnalysis


class AIProvider(ABC):
    @abstractmethod
    def analyze(
        self,
        headline: str,
        article: str,
    ) -> AIAnalysis:
        pass
