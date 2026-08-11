# Bank News AI — Database Design

## 1. Current Database

The development environment currently uses SQLite with SQLAlchemy.

The database contains two primary logical entities:

- `news`
- `news_ai_analysis`

## 2. News Table

Current SQLAlchemy model:

```python
class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True)
    external_id = Column(Integer, unique=True, index=True)

    source = Column(String(100), nullable=False)
    headline = Column(Text, nullable=False)
    url = Column(String(500), unique=True, nullable=False)

    publish_date = Column(DateTime, nullable=False)

    author = Column(String(200))
    publisher = Column(String(200))
    category = Column(String(100))

    content = Column(Text, nullable=False)
    scraped_at = Column(DateTime)

    ai_status = Column(
        String(20),
        nullable=False,
        default="pending",
    )
```

## 3. AI Analysis Relationship

A news article can have one or more `NewsAIAnalysis` records.

The relationship is configured as:

```python
analyses = relationship(
    "NewsAIAnalysis",
    back_populates="news",
    cascade="all, delete-orphan",
)
```

This supports retaining analysis history rather than overwriting previous AI analysis records.

## 4. AI Analysis Data

The current API exposes the following AI-derived fields:

- `executive_summary`
- `summary`
- `sentiment`
- `importance`
- `risk_level`
- `banks`
- `organizations`
- `keywords`
- `topics`

The analysis model also exposes metadata such as:

- model provider
- model name
- prompt version
- processing time
- created timestamp

## 5. Latest Analysis

The application is designed to return the most recent analysis associated with a news article.

At the current development checkpoint, `created_at` values have been observed to be `NULL`. Therefore, latest-analysis selection should be treated as a temporary implementation concern until `created_at` is populated reliably.

### Planned improvement

Populate `NewsAIAnalysis.created_at` when an analysis record is created and use it as the authoritative ordering field.

## 6. Development vs Production

SQLite is suitable for the current local development stage.

For production, a server-grade relational database should be evaluated.

The production database choice has **not yet been finalized**.

## 7. Data Integrity

Current important constraints include:

- Primary key on `news.id`
- Unique index on `external_id`
- Unique constraint on `url`
- Non-null source, headline, URL, publish date and content
- Cascading deletion of associated AI analyses
