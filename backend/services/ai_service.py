import os
import requests
from requests.exceptions import RequestException

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_completion(prompt):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    }

    try:
        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=60,
        )

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except RequestException as error:
        raise Exception(f"OpenRouter request failed: {error}")


def analyze_product_idea(prompt):
    return generate_completion(prompt)