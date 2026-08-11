# Bank News AI — Scraper Design

## 1. Objective

The scraper layer is intended to collect business and banking news from selected Indian publications and make the articles available to the AI processing pipeline.

## 2. Target Sources

The initial source list is:

1. Business Standard
2. Zee Business
3. News18
4. The Economic Times
5. ANI
6. The Hindu BusinessLine
7. ET BFSI
8. PSU Connect

## 3. Current Status

The scraper architecture is part of the project design, but scheduled production-grade scraping is **not yet documented as complete** at this Git checkpoint.

The dashboard and API currently operate against the existing persisted news dataset.

## 4. Proposed Flow

```text
Publication
     |
     v
Source-specific scraper
     |
     v
Raw article extraction
     |
     +--> headline
     +--> URL
     +--> publish date
     +--> author
     +--> publisher
     +--> category
     +--> content
     |
     v
Normalization
     |
     v
Deduplication
     |
     v
News table
     |
     v
AI processing
```

## 5. Normalized Article Contract

Every source-specific scraper should normalize its output to a common structure:

```text
external_id
source
headline
url
publish_date
author
publisher
category
content
scraped_at
```

## 6. Deduplication

The current database provides useful uniqueness constraints:

- `external_id`
- `url`

The final scraper implementation should additionally consider cross-source duplicate stories where different URLs describe the same event.

## 7. Source Attribution

Source attribution is preserved through the `source` field and is displayed in the React news card.

The dashboard also provides a link back to the original article.

## 8. Scraper Reliability — Planned

The production scraper layer should include:

- Request timeouts
- Retry handling
- Rate limiting
- Source-specific parsing failure handling
- Logging
- Duplicate detection
- Content validation
- Last successful scrape timestamp
- Source health monitoring

## 9. Scheduling — Planned

The scraper should eventually run on a schedule appropriate for management news monitoring.

The scheduler/orchestration technology has not yet been finalized.
