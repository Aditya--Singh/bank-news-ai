import json
import re


def extract_json(text: str) -> dict:
    """
    Extract the first JSON object from an LLM response.
    Handles:
      - ```json ... ```
      - Extra explanatory text
      - Plain JSON
    """

    # Remove markdown fences
    text = re.sub(r"```json", "", text, flags=re.IGNORECASE)
    text = re.sub(r"```", "", text)

    text = text.strip()

    # Find first JSON object
    match = re.search(r"\{.*\}", text, flags=re.DOTALL)

    if not match:
        raise ValueError("No JSON found in response.")

    return json.loads(match.group(0))
