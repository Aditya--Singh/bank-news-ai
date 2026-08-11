# Bank News AI — AI Pipeline

## 1. Current Status

The AI analysis pipeline is integrated with the news data model and dashboard.

AI analysis results are persisted separately from the raw news article.

## 2. Current AI Outputs

For each processed article, the application currently supports:

```text
Executive Summary
Summary
Sentiment
Importance
Risk Level
Banks
Organizations
Keywords
Topics
```

These fields are returned to the React dashboard through `/api/news`.

## 3. Processing Flow

```text
News Article
     |
     v
AI Processing
     |
     +--> Executive Summary
     +--> Summary
     +--> Sentiment
     +--> Importance
     +--> Risk
     +--> Banks
     +--> Organizations
     +--> Keywords
     +--> Topics
     |
     v
NewsAIAnalysis
     |
     v
FastAPI
     |
     v
React Dashboard
```

## 4. Example Analysis

Example classification observed during development:

```json
{
  "sentiment": "Neutral",
  "importance": "Medium",
  "risk_level": "Low",
  "banks": [
    "Bandhan Bank"
  ],
  "topics": [
    "ESOPs",
    "Corporate Actions",
    "Equity Capital",
    "Employee Compensation",
    "Share Allotment"
  ]
}
```

## 5. News Prioritization

The dashboard uses AI-derived `risk_level` and `importance` to calculate a deterministic priority score.

This enables high-value news to appear earlier within the same publication-date grouping.

## 6. Current AI Status

The `News.ai_status` field currently supports the workflow state, with:

```text
pending
completed
```

Additional failure/retry states should be added as the processing pipeline is hardened.

## 7. Planned AI Enhancements

Potential future capabilities:

- Explain why a story matters to management.
- Impact assessment.
- Related-news clustering.
- Duplicate event detection.
- Cross-source event consolidation.
- AI confidence scoring, if supported by the selected model/pipeline.
- Retry and failure handling.
- Model/prompt version governance.

These are planned and should not be considered implemented at the current checkpoint.
