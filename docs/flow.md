# Bank News AI — Execution Flow

## 1. Purpose

This document explains how execution travels through the current application: which module calls which module, in what order, and where data is transformed.

## 2. High-Level Runtime Flow

```text
React Application
       |
       | HTTP
       v
FastAPI Router
       |
       v
SQLAlchemy Session
       |
       v
Database
       |
       v
News + NewsAIAnalysis
       |
       v
JSON Response
       |
       v
React State
       |
       v
Dashboard Components
```

## 3. Frontend Startup

```text
frontend/src/main.jsx
        |
        v
createRoot(...)
        |
        v
<App />
        |
        v
frontend/src/App.jsx
```

`main.jsx` imports the global CSS and renders the React application.

## 4. App.jsx Dashboard Loading

When `App` mounts, its `useEffect()` runs the dashboard loading function.

Current parallel calls:

```text
App.jsx
   |
   +--> getDashboardSummary()
   |
   +--> getNews(...)
   |
   +--> getTopBanks()
   |
   +--> getTopTopics()
```

The calls are executed using `Promise.all()`.

## 5. Frontend API Layer

Dashboard calls travel through:

```text
App.jsx
   |
   v
frontend/src/api/dashboard.js
   |
   v
frontend/src/api/client.js
   |
   | HTTP
   v
FastAPI
```

News calls travel through:

```text
App.jsx
   |
   v
frontend/src/api/news.js
   |
   v
frontend/src/api/client.js
   |
   | HTTP
   v
FastAPI /api/news
```

## 6. FastAPI News Flow

The news router receives:

```text
page
page_size
source
sentiment
importance
risk_level
bank
```

Execution:

```text
GET /api/news
      |
      v
get_news(...)
      |
      v
get_db()
      |
      v
SQLAlchemy Session
      |
      v
db.query(News)
```

## 7. Filter Flow

The endpoint first checks whether an AI-analysis join is needed.

```text
source
  |
  +--> News.source

sentiment / importance / risk_level / bank
  |
  +--> JOIN NewsAIAnalysis
```

When multiple AI filters are supplied, they are applied to the same join.

```text
News
  |
  +---- JOIN ----> NewsAIAnalysis
                       |
                       +--> sentiment
                       +--> importance
                       +--> risk_level
                       +--> banks
```

## 8. Count Flow

After filters:

```text
query
  |
  v
distinct().count()
  |
  v
total
```

The total is returned for pagination.

## 9. Priority Flow

The API creates a SQLAlchemy `case()` expression:

```text
risk + importance
       |
       v
priority_score
       |
       +--> 5 High Risk + High Importance
       +--> 4 High Risk
       +--> 3 High Importance
       +--> 2 Medium Risk + High Importance
       +--> 1 Other
```

Ordering:

```text
publication date DESC
        |
        v
priority score DESC
        |
        v
publish timestamp DESC
```

## 10. Pagination Flow

The API calculates:

```text
offset = (page - 1) * page_size
```

and applies:

```text
offset(...)
limit(...)
```

The response contains `page`, `page_size`, `total` and `articles`.

## 11. AI Analysis Flow

For each returned article:

```text
News
 |
 +--> article.analyses
          |
          v
      select analysis
          |
          v
      ai_analysis
```

The intended long-term authoritative field for selecting the latest analysis is `created_at`.

At the current checkpoint, `created_at` has been observed to be `NULL`, so this remains a cleanup item.

## 12. Backend Response Transformation

The SQLAlchemy objects are transformed into dictionaries containing:

```text
id
source
headline
url
publish_date
author
publisher
category
ai_status
ai_analysis
```

`ai_analysis` contains:

```text
executive_summary
summary
sentiment
importance
risk_level
banks
organizations
keywords
topics
```

## 13. React State Flow

The response returns to `App.jsx`.

React updates:

```text
summary
news
topBanks
topTopics
loading
error
```

React then re-renders the dashboard.

## 14. Component Rendering

```text
App.jsx
 |
 +--> KpiCard
 |
 +--> SentimentChart
 |
 +--> DistributionBarChart
 |
 +--> RankingBarChart
 |
 +--> NewsCard
```

Each article is passed to:

```text
<NewsCard article={article} />
```

## 15. NewsCard Flow

`NewsCard.jsx` receives the article and extracts:

```text
article.ai_analysis
```

It normalizes:

```text
banks
topics
executive_summary
```

It derives:

```text
risk
importance
sentiment
```

Then it determines the priority CSS class:

```text
High Risk + High Importance
        |
        v
news-card-critical

High Risk
        |
        v
news-card-high-risk

High/Critical Importance
        |
        v
news-card-high-importance
```

The card renders source/date, headline, executive summary, AI attributes, tags and the original article link.

## 16. Pagination Navigation Flow

When the page changes:

```text
Pagination control
       |
       v
setCurrentPage(...)
       |
       v
News API request
       |
       v
setNews(...)
       |
       v
requestAnimationFrame(...)
       |
       v
newsSectionRef.current.scrollIntoView(...)
```

The user therefore lands at the beginning of the News section and sees the first card of the selected page.

## 17. End-to-End Current Flow

```text
User opens dashboard
        |
        v
main.jsx
        |
        v
App.jsx
        |
        +-----------------------------+
        |                             |
        v                             v
Dashboard APIs                    News API
        |                             |
        v                             v
FastAPI dashboard router          get_news()
                                      |
                                      v
                                  SQLAlchemy
                                      |
                                      v
                              News + AI Analysis
                                      |
                                      v
                              filter / sort
                                      |
                                      v
                                  pagination
                                      |
                                      v
                                  JSON
                                      |
        +-----------------------------+
        |
        v
React state
        |
        v
Dashboard components
        |
        v
NewsCard
        |
        v
Executive News Dashboard
```

## 18. Future Full Pipeline

When the production scraper is implemented:

```text
Scheduled Job
     |
     v
Source Scraper
     |
     v
Normalize Article
     |
     v
Deduplicate
     |
     v
News table
     |
     v
AI Processing
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
