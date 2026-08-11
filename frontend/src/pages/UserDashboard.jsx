import NewsCard from "../components/NewsCard";

function UserDashboard({ news }) {
    return (
        <main className="dashboard">
            <section className="panel news-panel">
                <div className="section-header">
                    <div>
                        <h2>Latest News</h2>
                        <p>
                            AI-prioritized business and banking intelligence
                        </p>
                    </div>

                    <span className="news-count">
                        {news.length} articles
                    </span>
                </div>

                <div className="news-list">
                    {news.map((article) => (
                        <NewsCard
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default UserDashboard;