import { useEffect, useState } from "react";

import { getDashboardSummary } from "../api/dashboard";
import { getNews } from "../api/news";
import DashboardStats from "../components/DashboardStats";

function Dashboard() {
    console.log("NEW DASHBOARD COMPONENT LOADED");
    const [summary, setSummary] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [summaryData, newsData] = await Promise.all([
                    getDashboardSummary(),
                    getNews({
                        page: 1,
                        pageSize: 10,
                    }),
                ]);

                console.log("Dashboard summary:", summaryData);
                console.log("Dashboard news:", newsData);

                setSummary(summaryData);
                setNews(newsData.articles);
            } catch (error) {
                console.error(
                    "Dashboard loading failed:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h1>Bank News Intelligence</h1>

            <DashboardStats stats={summary} />

            <section className="latest-news">
                <h2>Latest News</h2>

                {news.map((article) => (
                    <div key={article.id}>
                        <h3>{article.headline}</h3>

                        <p>
                            {article.source} ·{" "}
                            {new Date(
                                article.publish_date
                            ).toLocaleDateString("en-IN")}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Dashboard;