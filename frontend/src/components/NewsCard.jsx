function formatIST(dateString) {
    if (!dateString) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(dateString));
}

function normalizeList(value) {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter(Boolean);
}

function formatLabel(value) {
    if (!value) {
        return "";
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function NewsCard({ article }) {
    const analysis = article.ai_analysis ?? {};

    const banks = normalizeList(analysis.banks);
    const topics = normalizeList(analysis.topics);

    const executiveSummary = normalizeList(
        analysis.executive_summary,
    );

    const risk = analysis.risk_level?.toLowerCase();
    const importance = analysis.importance?.toLowerCase();
    const sentiment = analysis.sentiment?.toLowerCase();

    const isHighRisk = risk === "high";
    const isHighImportance =
        importance === "high" || importance === "critical";

    const priorityClass =
        isHighRisk && isHighImportance
            ? "news-card-critical"
            : isHighRisk
                ? "news-card-high-risk"
                : isHighImportance
                    ? "news-card-high-importance"
                    : "";

    return (
        <article
            className={`news-card ${priorityClass}`}
        >
            {/* Header */}
            <div className="news-card-header">
                <div className="news-source">
                    <span className="source-name">
                        {article.source}
                    </span>

                    <span className="source-separator">
                        •
                    </span>

                    <time
                        className="news-date"
                        dateTime={article.publish_date}
                    >
                        {formatIST(article.publish_date)} IST
                    </time>
                </div>

                <div className="news-badges">
                    {importance && (
                        <span
                            className={`badge badge-${importance}`}
                        >
                            {formatLabel(importance)} Importance
                        </span>
                    )}

                    {risk && (
                        <span
                            className={`badge badge-risk-${risk}`}
                        >
                            {formatLabel(risk)} Risk
                        </span>
                    )}
                </div>
            </div>

            {/* Headline */}
            <h3 className="news-headline">
                {article.headline}
            </h3>

            {/* Executive Summary */}
            <section className="news-summary">
                <div className="summary-label">
                    Executive Summary
                </div>

                {executiveSummary.length > 0 ? (
                    <ul className="summary-points">
                        {executiveSummary
                            .slice(0, 3)
                            .map((point, index) => (
                                <li key={index}>
                                    {point}
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p className="summary-pending">
                        AI analysis is not available yet.
                    </p>
                )}
            </section>

            {/* AI Analysis */}
            <section className="news-analysis">
                {sentiment && (
                    <div className="analysis-item">
                        <span className="analysis-label">
                            Sentiment
                        </span>

                        <span
                            className={`badge badge-sentiment-${sentiment}`}
                        >
                            {formatLabel(sentiment)}
                        </span>
                    </div>
                )}

                {banks.length > 0 && (
                    <div className="analysis-item analysis-list">
                        <span className="analysis-label">
                            Banks
                        </span>

                        <div className="tag-list">
                            {banks.slice(0, 5).map((bank) => (
                                <span
                                    className="entity-tag"
                                    key={bank}
                                >
                                    {bank}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {topics.length > 0 && (
                    <div className="analysis-item analysis-list">
                        <span className="analysis-label">
                            Topics
                        </span>

                        <div className="tag-list">
                            {topics.slice(0, 5).map((topic) => (
                                <span
                                    className="entity-tag"
                                    key={topic}
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="news-card-footer">
                <span className="attribution">
                    Source: {article.source}
                </span>

                {article.url && (
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-link"
                    >
                        Read original article →
                    </a>
                )}
            </footer>
        </article>
    );
}

export default NewsCard;