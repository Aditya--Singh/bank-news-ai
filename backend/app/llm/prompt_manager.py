from pathlib import Path


class PromptManager:
    def __init__(self):
        self.prompt_dir = Path(__file__).parent / "prompts"

    def load(self, name: str) -> str:
        return (self.prompt_dir / name).read_text(encoding="utf-8")
