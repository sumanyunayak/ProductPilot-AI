def build_product_analysis_prompt(idea):
    return f"""
You are an experienced Senior Product Manager.

Analyze the following startup idea.

Title:
{idea.title}

Problem:
{idea.problem}

Provide your response in exactly the following format:

## Overall Score
Give a score out of 10.

## Strengths
List 3 strengths.

## Weaknesses
List 3 weaknesses.

## Target Audience
Who would benefit from this product?

## Market Potential
Explain whether the market opportunity is Low, Medium, or High and why.

## Suggestions
Give 3 practical improvements.

Keep the response professional, concise, and actionable.
"""