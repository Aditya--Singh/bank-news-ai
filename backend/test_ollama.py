from app.llm.providers.ollama import OllamaProvider


def test_ollama_generate():
    provider = OllamaProvider()

    response = provider.generate("Reply with exactly: Hello from Qwen")

    assert response
