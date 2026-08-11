# Bank News AI — Architecture

## 1. Project Status

**Documentation baseline:** Current Git checkpoint.

### Implemented
- FastAPI backend
- SQLAlchemy data layer
- SQLite development database
- News API with filtering and pagination
- AI analysis integration and persisted AI analysis records
- AI-based sentiment, importance, risk, bank, organization, keyword and topic extraction
- Priority-based news ordering
- React/Vite frontend
- Executive dashboard KPIs and charts
- News cards with AI analysis
- Pagination with automatic navigation to the first card of the selected page

### In progress / planned
- Responsive UI
- News detail view
- Production deployment
- Scheduled scraper orchestration
- Production database
- Automated testing and production hardening

## 2. High-Level Architecture

```text
                 +----------------------+
                 |   News Sources       |
                 |  Business/Banking    |
                 |      Publications    |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |   Scraper Layer      |
                 |   (planned/ongoing)  |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |     News Database    |
                 |       SQLite         |
                 |                      |
                 |       News           |
                 |       AI Analysis    |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |   AI Analysis Layer  |
                 |  Summary / Risk /    |
                 |  Importance / Topics |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 |     FastAPI API      |
                 | /api/news            |
                 | /api/dashboard/*     |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 | React / Vite Frontend|
                 | Executive Dashboard  |
                 +----------------------+
```

## 3. Backend

The backend is implemented using Python and FastAPI.

Primary responsibilities:
- Expose dashboard APIs.
- Expose paginated news APIs.
- Apply news filters.
- Select the latest available AI analysis for an article.
- Prioritize important/risky news.
- Return data in a frontend-friendly JSON structure.

## 4. Frontend

The frontend is implemented using React with Vite.

Current structure:

```text
frontend/src/
├── api/
│   ├── client.js
│   ├── dashboard.js
│   └── news.js
├── components/
│   ├── DashboardStats.jsx
│   ├── DistributionChart.jsx
│   ├── KpiCard.jsx
│   └── NewsCard.jsx
├── pages/
│   └── Dashboard.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

The current dashboard consumes the FastAPI backend directly through Axios.

## 5. Current News Prioritization

News is ordered primarily by publication date and then by an AI-derived priority score.

Current priority concept:

| Condition | Score |
|---|---:|
| High Risk + High Importance | 5 |
| High Risk | 4 |
| High Importance | 3 |
| Medium Risk + High Importance | 2 |
| Other | 1 |

Publication date remains the primary ordering dimension.

## 6. Design Principles

- Separate scraping, persistence, AI processing and presentation concerns.
- Keep the React frontend independent from backend implementation details.
- Use API contracts between frontend and backend.
- Keep AI-generated attributes structured rather than embedding them only in free text.
- Make prioritization deterministic and explainable.
