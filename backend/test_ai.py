from app.ai.processor import AIProcessor

processor = AIProcessor()

analysis, ms = processor.process(
    headline="RBI cuts repo rate",
    content="""
Reserve Bank of India reduced the repo rate by 25 basis points.

Banks are expected to lower lending rates.
""",
)

print()

print(analysis)

print()

print(ms)
