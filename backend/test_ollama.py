from app.llm.providers.ollama import OllamaProvider

provider = OllamaProvider()

response = provider.generate("Reply with exactly: Hello from Qwen")

print(response)
