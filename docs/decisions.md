# Bank News AI — Architecture & Technology Decisions

## 1. Purpose

This document records the major technical and architectural decisions made during the current implementation phase, together with the reasoning behind them.

## 2. Decision Log

### D-001 — Python for the backend and AI pipeline
**Decision:** Use Python for the backend and AI-related processing.

**Reason:** Python has a strong ecosystem for data engineering, scraping and AI/ML. It also allows the backend and AI processing layers to share the same language and libraries.

**Status:** Implemented.

### D-002 — FastAPI for the backend API
**Decision:** Use FastAPI.

**Reason:** FastAPI is lightweight, supports typed parameters, provides automatic OpenAPI documentation, and integrates cleanly with SQLAlchemy.

**Status:** Implemented.

### D-003 — SQLAlchemy as ORM
**Decision:** Use SQLAlchemy for database access.

**Reason:** It separates database access from API logic, supports relationships between `News` and `NewsAIAnalysis`, and keeps a future database migration manageable.

**Status:** Implemented.

### D-004 — SQLite for current development
**Decision:** Use SQLite during local development.

**Reason:** It requires no separate database server and is sufficient for rapid local development and the current dataset.

**Trade-off:** SQLite is not the final production database decision.

**Status:** Implemented for development.

### D-005 — Separate `News` and `NewsAIAnalysis` entities
**Decision:** Store source news and AI analysis separately.

**Reason:** This preserves the original article, supports reprocessing, retains analysis metadata/history, and keeps AI output independent from source content.

**Status:** Implemented.

### D-006 — Persist structured AI attributes
**Decision:** Store sentiment, importance, risk, banks, organizations, keywords and topics as structured fields.

**Reason:** Structured attributes enable filtering, KPI calculation, charts, prioritization and management-oriented analysis.

**Status:** Implemented.

### D-007 — React + Vite for the frontend
**Decision:** Use React with Vite.

**Reason:** React provides reusable components for KPI cards, charts and news cards, while Vite provides a fast development workflow.

**Status:** Implemented.

### D-008 — Axios for frontend API communication
**Decision:** Use Axios through a centralized API client.

**Reason:** It centralizes the backend base URL and keeps API calls separate from UI components.

**Status:** Implemented.

### D-009 — Centralized news API
**Decision:** Expose news through `/api/news` rather than allowing the frontend to access the database directly.

**Reason:** Filtering, sorting and pagination remain server-side and the frontend gets a stable API contract.

**Status:** Implemented.

### D-010 — Combined AI filters use one join
**Decision:** Join `NewsAIAnalysis` once when sentiment, importance, risk or bank filters are supplied.

**Reason:** Earlier repeated joins caused SQL errors such as `ambiguous column name: news_ai_analysis.importance`. The single-join approach avoids that problem.

**Status:** Implemented.

### D-011 — Publication date is primary ordering
**Decision:** Sort news primarily by publication date.

**Reason:** Management users need the latest developments first.

**Status:** Implemented.

### D-012 — AI priority score for secondary ordering
**Decision:** Use a deterministic priority score after publication date.

| Condition | Score |
|---|---:|
| High Risk + High Importance | 5 |
| High Risk | 4 |
| High Importance | 3 |
| Medium Risk + High Importance | 2 |
| Other | 1 |

**Reason:** Important and risky news becomes more visible without overriding the primary recency requirement.

**Status:** Implemented.

### D-013 — Backend pagination
**Decision:** Paginate news at the API layer.

**Reason:** Avoids transferring the complete dataset and scales better as article volume grows.

**Status:** Implemented.

### D-014 — Scroll to first card after page navigation
**Decision:** Automatically scroll to the beginning of the News section after changing page.

**Reason:** Without this, users could remain at the bottom of the previous page and not immediately see the first article of the new page.

**Status:** Implemented.

### D-015 — News Card as the executive news unit
**Decision:** Present each article as a structured News Card.

**Reason:** Top-management users need rapid scanning. The card surfaces source, date, headline, importance, risk, executive summary, sentiment, banks, topics and original article.

**Status:** Implemented.

### D-016 — Strong visual treatment for high-priority news
**Decision:** High Risk + High Importance receives the strongest visual treatment.

**Reason:** Users should identify critical developments without reading every card.

**Status:** Implemented.

### D-017 — Keep scraping separate from API/UI
**Decision:** Source-specific scrapers should feed normalized articles into the database rather than directly into the frontend.

**Reason:** This decouples source parsing from presentation and makes scheduling, AI processing and source maintenance easier.

**Status:** Architectural decision; production scraper orchestration is still pending.

### D-018 — Documentation reflects actual implementation
**Decision:** Documentation explicitly distinguishes implemented, in-progress and planned functionality.

**Reason:** The project is being developed incrementally and documentation should not present target architecture as completed functionality.

**Status:** Adopted.

## 3. Decisions Still Pending

- Production database.
- Production hosting platform.
- Containerization strategy.
- Scheduler/orchestration technology.
- Authentication/authorization model.
- Production monitoring solution.
- CI/CD platform.
- Final scraper implementation strategy for every source.
