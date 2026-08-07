from abc import ABC, abstractmethod


class BaseLLMProvider(ABC):
    @abstractmethod
    def generate(
        self,
        prompt: str,
        temperature: float = 0.2,
    ) -> str:
        pass

    def generate_with_retry(
        self,
        prompt: str,
        retries: int = 2,
    ) -> str:

        last_error = None

        for _ in range(retries):
            try:
                return self.generate(prompt)

            except Exception as e:
                last_error = e

        raise last_error
