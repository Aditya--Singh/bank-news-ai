# 🏦 Bank News AI

An AI-powered banking news aggregation platform that collects news from multiple Indian business publications, stores it locally, generates executive summaries using local LLMs (Ollama), and serves the results through a FastAPI backend and React dashboard.

---

# Features

- Multi-source news scraping
- Incremental article ingestion
- SQLite database
- AI-powered executive summaries
- Local LLM support (Ollama)
- Provider abstraction (OpenAI/Azure OpenAI ready)
- REST APIs with FastAPI
- React dashboard
- Semantic search (planned)
- Executive insights & analytics (planned)

---

# News Sources

Current

- ✅ PSU Connect

Planned

- Business Standard
- Economic Times
- ET BFSI
- BusinessLine
- ANI
- Zee Business
- News18 Business

---

# Technology Stack

## Backend

- Python 3.11+
- FastAPI
- SQLAlchemy
- Pydantic
- BeautifulSoup
- Loguru
- APScheduler

## AI

- Ollama
- Qwen 3
- LangChain

## Frontend

- React
- Vite
- Material UI

## Database

- SQLite

---

# Project Structure

backend/
```
app/
├── api/
├── config/
├── database/
├── llm/
│ ├── providers/
│ └── prompts/
├── models/
├── repositories/
├── schemas/
├── scrapers/
├── services/
└── utils/

run_scraper.py
pyproject.toml
uv.lock

```

frontend/
```
src/
public/

```

---

# Architecture

```

News Sources
│
▼
Scrapers
│
▼
SQLite Database
│
├─────────────┐
▼             ▼
AI            Search
Processing    Embeddings
│
▼
FastAPI
│
▼
React Dashboard

```

---

# Setup

## Clone

```bash
git clone https://github.com/Aditya--Singh/bank-news-ai.git

cd bank-news-ai/backend
```

---

## Install uv

Windows

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Verify

```bash
uv --version
```

---

## Install Dependencies

```bash
uv sync
```

Activate

Windows

```powershell
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```text
DATABASE_URL=sqlite:///news.db

OLLAMA_BASE_URL=http://localhost:11434

OLLAMA_MODEL=qwen3:8b

TIMEZONE=Asia/Kolkata

NEWS_CUTOFF_DATE=2026-06-20
```

---

# Run Backend

```bash
uvicorn app.main:app --reload
```

---

# Run Scraper

```bash
python run_scraper.py
```

---

# Run Frontend

```bash
cd ../frontend

npm install

npm run dev
```

---

# Development Workflow

Create a feature branch

```bash
git checkout -b feature/feature-name
```

Commit

```bash
git add .

git commit -m "feat: description"
```

Push

```bash
git push origin feature/feature-name
```

---

# Git Branches

```
main

feature/*
bugfix/*
release/*
```

---

# Current Status

Completed

- FastAPI project
- SQLite database
- SQLAlchemy models
- Repository layer
- Service layer
- Pydantic schemas
- PSU Connect scraper
- Pagination
- Duplicate detection
- IST timezone support

In Progress

- Ollama integration
- Executive summaries

Planned

- React dashboard
- Semantic search
- Multi-source scraping
- Scheduler
- Analytics

---

# Roadmap

## Phase 1

- PSU Connect scraper
- Database
- AI summaries

## Phase 2

- React dashboard
- Remaining news sources

## Phase 3

- Embeddings
- RAG
- Executive analytics

---

# License

MIT License

---

# Author

Aditya Singh