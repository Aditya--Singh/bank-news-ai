from app.llm.providers.ollama import OllamaProvider
from app.services.ai_service import AIService

article = """
State Bank of India has reported a 14% increase in quarterly profit
driven by lower provisions and strong loan growth.
"""

provider = OllamaProvider()

service = AIService(provider)

result = service.summarize(article)

print(result.model_dump_json(indent=4))
