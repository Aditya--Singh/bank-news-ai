# Bank News AI — API Reference

## 1. Backend

The API is implemented using FastAPI.

Base URL during local development:

```text
http://127.0.0.1:8000
```

## 2. News API

### GET `/api/news`

Returns a paginated list of news articles with the latest available AI analysis.

Example:

```text
GET /api/news?page=1&page_size=10
```

### Pagination Parameters

| Parameter | Default | Description |
|---|---:|---|
| `page` | 1 | Page number |
| `page_size` | 20 | Number of records per page |
| `source` | — | Filter by publication/source |
| `sentiment` | — | Filter by sentiment |
| `importance` | — | Filter by importance |
| `risk_level` | — | Filter by risk |
| `bank` | — | Filter by bank |

`page_size` is currently constrained to a maximum of 100.

## 3. Combined Filters

Multiple AI filters can be applied together.

For example:

```text
GET /api/news?importance=High&risk_level=High
```

The backend uses a single AI-analysis join when one or more AI filters are supplied, avoiding duplicate joins.

## 4. Response Structure

Example:

```json
{
  "page": 1,
  "page_size": 10,
  "total": 272,
  "articles": [
    {
      "id": 1,
      "source": "PSU Connect",
      "headline": "...",
      "url": "...",
      "publish_date": "2026-08-07T03:30:00",
      "author": "...",
      "publisher": "PSU Connect",
      "category": "Bank News",
      "ai_status": "completed",
      "ai_analysis": {
        "executive_summary": [],
        "summary": "...",
        "sentiment": "Neutral",
        "importance": "Medium",
        "risk_level": "Low",
        "banks": [],
        "organizations": [],
        "keywords": [],
        "topics": []
      }
    }
  ]
}
```

## 5. News Detail API

### GET `/api/news/{news_id}`

Returns an individual news article and its AI analysis information.

The endpoint is implemented but the React news-detail experience is not yet implemented.

## 6. Dashboard APIs

The frontend currently consumes:

```text
GET /api/dashboard/summary
GET /api/dashboard/top-banks
GET /api/dashboard/top-topics
GET /api/dashboard/stats
```

The summary response currently contains values such as:

```json
{
  "total_articles": 272,
  "sentiment": {
    "Negative": 2,
    "Neutral": 103,
    "Positive": 167
  },
  "importance": {
    "Critical": 8,
    "High": 138,
    "Low": 1,
    "Medium": 125
  },
  "risk": {
    "High": 3,
    "Low": 162,
    "Medium": 107
  }
}
```

## 7. Frontend API Client

The React application uses Axios through:

```text
frontend/src/api/client.js
```

The current development base URL is:

```text
http://127.0.0.1:8000
```

This should later be moved to an environment variable.

## 8. API Improvements Planned

- Introduce Pydantic response schemas.
- Standardize error responses.
- Add automated API tests.
- Add production authentication/authorization if required.
- Move API base URL to environment configuration.
