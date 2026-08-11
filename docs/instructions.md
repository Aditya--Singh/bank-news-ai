# Bank News AI — Local Setup & Porting Instructions

## 1. Purpose

This document explains how to move the project to another development machine and initialize it locally.

These instructions describe the current development setup. Production deployment is not yet a completed process.

## 2. Prerequisites

Install:

- Git
- Python
- Node.js
- npm

Verify:

```powershell
git --version
python --version
node --version
npm --version
```

Exact versions should eventually be pinned as part of production hardening.

## 3. Clone the Repository

```powershell
cd C:\Users\<username>\Downloads
git clone https://github.com/Aditya--Singh/bank-news-ai.git
cd bank-news-ai
```

Verify:

```powershell
git branch --show-current
git remote -v
```

The main development branch is:

```text
main
```

## 4. Backend Environment

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Verify:

```powershell
python --version
pip --version
```

## 5. Install Backend Dependencies

If `requirements.txt` exists:

```powershell
pip install -r requirements.txt
```

Do not install dependencies manually without updating the project's dependency file.

## 6. Environment Variables

If `.env.example` exists:

```powershell
copy .env.example .env
```

Populate local values as required.

Never commit `.env` or secrets to Git.

## 7. Database

The current development setup uses SQLite.

The logical tables are:

```text
news
news_ai_analysis
```

If the development database is intentionally excluded from Git, initialize/populate it using the project's database setup process.

Do not assume SQLite is the final production database.

## 8. Start FastAPI

From `backend` with the virtual environment activated:

```powershell
uvicorn app.main:app --reload
```

Expected local API:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

If the repository uses a different application entry point, use the actual module path present in the codebase.

## 9. Verify Backend

```powershell
curl http://127.0.0.1:8000/api/dashboard/summary
```

Then:

```powershell
curl "http://127.0.0.1:8000/api/news?page=1&page_size=10"
```

The endpoints should return data when the local database has been initialized/populated.

## 10. Frontend Setup

Open a second PowerShell window:

```powershell
cd C:\Users\<username>\Downloads\bank-news-ai\frontend
npm install
```

Do not commit `node_modules`.

## 11. Start React/Vite

```powershell
npm run dev
```

Open the URL shown by Vite, normally similar to:

```text
http://localhost:5173/
```

## 12. Backend + Frontend Ports

Run both services:

```text
Terminal 1
FastAPI
http://127.0.0.1:8000

Terminal 2
React/Vite
http://localhost:5173
```

The current Axios client is:

```text
frontend/src/api/client.js
```

and currently points to the FastAPI development URL.

## 13. Verify the Dashboard

Check:

- Total News
- High Importance
- High Risk
- Negative Sentiment
- Sentiment chart
- Importance chart
- Risk chart
- Top Banks
- Top Topics
- News Cards
- Filters
- Pagination

## 14. Test News Filters

```powershell
curl "http://127.0.0.1:8000/api/news?source=PSU%20Connect"
```

```powershell
curl "http://127.0.0.1:8000/api/news?importance=High"
```

```powershell
curl "http://127.0.0.1:8000/api/news?risk_level=High"
```

Combined:

```powershell
curl "http://127.0.0.1:8000/api/news?importance=High&risk_level=High"
```

## 15. Test Pagination

```powershell
curl "http://127.0.0.1:8000/api/news?page=1&page_size=10"
```

Then:

```powershell
curl "http://127.0.0.1:8000/api/news?page=2&page_size=10"
```

In React, page navigation should load the selected page and scroll to the beginning of the News section.

## 16. Git Workflow

Before changes:

```powershell
git status
git pull origin main
```

Review changes:

```powershell
git status
git diff
```

Stage:

```powershell
git add .
```

Review staged changes:

```powershell
git diff --cached --stat
git diff --cached
```

Commit:

```powershell
git commit -m "feat: describe the change"
```

Push:

```powershell
git push
```

## 17. Files That Must Not Be Committed

Ensure these are ignored:

```text
.venv/
venv/
__pycache__/
*.pyc
node_modules/
dist/
.env
*.db
*.sqlite
*.sqlite3
```

Check:

```powershell
git status --short
```

## 18. Windows Line Endings

A warning such as:

```text
LF will be replaced by CRLF
```

is normally a Git line-ending warning, not an application failure.

A `.gitattributes` file can standardize repository files:

```gitattributes
* text=auto
*.py text eol=lf
*.js text eol=lf
*.jsx text eol=lf
*.css text eol=lf
*.json text eol=lf
*.md text eol=lf
```

## 19. Troubleshooting

### React says "Unable to load dashboard data"

First test:

```powershell
curl http://127.0.0.1:8000/api/dashboard/summary
```

Then:

```powershell
curl "http://127.0.0.1:8000/api/news?page=1&page_size=10"
```

If the API returns HTTP 500, investigate the FastAPI terminal first.

### Combined news filters return HTTP 500

Test:

```text
importance
risk_level
importance + risk_level
```

The current implementation uses a single `NewsAIAnalysis` join when AI filters are supplied.

### Dashboard has no data

Check:

1. FastAPI is running.
2. The database is accessible.
3. `/api/dashboard/summary` returns data.
4. `/api/news` returns articles.
5. React uses the correct backend URL.

### CORS error

Check FastAPI CORS configuration and confirm the frontend origin is allowed.

Do not allow every origin in production merely to hide a configuration problem.

## 20. Quick Startup

### Terminal 1

```powershell
cd bank-news-ai\backend
.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Terminal 2

```powershell
cd bank-news-ai\frontend
npm install
npm run dev
```

Then open the Vite URL.

## 21. First-Time Machine Checklist

```text
[ ] Install Git
[ ] Install Python
[ ] Install Node.js/npm
[ ] Clone repository
[ ] Create Python virtual environment
[ ] Install backend dependencies
[ ] Configure .env if required
[ ] Initialize/restore development database
[ ] Start FastAPI
[ ] Verify /docs
[ ] Verify /api/news
[ ] Verify /api/dashboard/summary
[ ] Run npm install
[ ] Start Vite
[ ] Open React dashboard
[ ] Verify KPIs
[ ] Verify charts
[ ] Verify News Cards
[ ] Verify filters
[ ] Verify pagination
```

## 22. Porting Principle

Do not copy machine-specific environments.

Recreate:

```powershell
python -m venv .venv
pip install -r requirements.txt
```

and:

```powershell
npm install
```

This keeps the new machine reproducible from the Git repository.
