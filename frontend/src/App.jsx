import { submitFeedback } from "./api/feedback";
import FeedbackModal from "./components/FeedbackModal";
import Login from "./pages/Login";
import { useEffect, useRef, useState } from "react";

import {
  getDashboardSummary,
  getTopBanks,
  getTopTopics,
} from "./api/dashboard";
import { getNews } from "./api/news";
import KpiCard from "./components/KpiCard";

import "./index.css";

import {
  DistributionBarChart,
  RankingBarChart,
  SentimentChart,
  SentimentImportanceChart,
} from "./components/DistributionChart";

import NewsCard from "./components/NewsCard";

import NewsFilters from "./components/NewsFilters";

import ApplicationInsights from "./components/ApplicationInsights";
import NewsPipelineControl from "./components/NewsPipelineControl";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("bankNewsUser") || "null"
      );
    } catch {
      return null;
    }
  });
  const [summary, setSummary] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [adminTab, setAdminTab] = useState("backend-summary");
  const [topBanks, setTopBanks] = useState([]);
  const [topTopics, setTopTopics] = useState([]);
  const [filters, setFilters] = useState({
    source: "",
    bank: "",
    sentiment: "",
    importance: "",
    // riskLevel: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalNews, setTotalNews] = useState(0);
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  const handleClearFilters = () => {
    setFilters({
      source: "",
      bank: "",
      sentiment: "",
      importance: "",
      // riskLevel: "",
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalNews / pageSize);

  const startArticle = totalNews === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endArticle = Math.min(currentPage * pageSize, totalNews);

  const newsSectionRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("bankNewsUser");

    setUser(null);
    setShowFeedback(false);
    setAdminTab("backend-summary");
  };

  const handleLogin = (loggedInUser) => {
    localStorage.setItem(
      "bankNewsUser",
      JSON.stringify(loggedInUser),
    );

    setUser(loggedInUser);
  };


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryData, banksData, topicsData] =
          await Promise.all([
            getDashboardSummary(),
            getTopBanks(),
            getTopTopics(),
          ]);

        setSummary(summaryData);
        setTopBanks(banksData.items);
        setTopTopics(topicsData.items);
      } catch (err) {
        console.error("Dashboard loading failed:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("bankNewsUser");
          setUser(null);
          setSummary(null);
          setTopBanks([]);
          setTopTopics([]);
        } else {
          setError("Unable to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      loadDashboard();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await getNews({
          page: currentPage,
          pageSize,
          ...filters,
        });

        setNews(newsData.articles);
        setTotalNews(newsData.total);

        requestAnimationFrame(() => {
          newsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      } catch (err) {
        console.error("News loading failed:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("bankNewsUser");
          setUser(null);
          setNews([]);
          setTotalNews(0);
        }
      }
    };

    if (user?.accessToken) {
      loadNews();
    }
  }, [user, currentPage, pageSize, filters]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return <div className="loading">Loading Bank News Intelligence...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const highImportance =
    (summary?.importance?.Critical ?? 0) +
    (summary?.importance?.High ?? 0);

  // const highRisk =
  //   summary?.risk?.high ??
  //   summary?.risk?.High ??
  //   0;

  const positiveSentiment =
    summary?.sentiment?.positive ??
    summary?.sentiment?.Positive ??
    0;

  const negativeSentiment =
    summary?.sentiment?.negative ??
    summary?.sentiment?.Negative ??
    0;

  return (
    <div className="app">
      <header className="header">
        <div>
          {/* <h1>Bank News Intelligence</h1>
          <p>Executive News &amp; Risk Dashboard</p> */}
          <h1>AI-Enabled Top Management Decision Support Platform</h1>
          <p>Insights from External Sources</p>
        </div>

        <div className="header-actions">
          <div className="header-user">
            <div className="header-user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="header-user-info">
              <span className="header-user-greeting">
                Welcome
              </span>

              <strong>
                {user.username}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="feedback-header-button"
            onClick={() => setShowFeedback(true)}
          >
            Give Feedback
          </button>

          <div className="header-date">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard">

        {user.role === "admin" && (
          <div className="admin-tabs">
            <button
              type="button"
              className={
                adminTab === "backend-summary"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() => setAdminTab("backend-summary")}
            >
              Backend Summary
            </button>

            <button
              type="button"
              className={
                adminTab === "latest-news"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() => setAdminTab("latest-news")}
            >
              Latest News
            </button>

            <button
              type="button"
              className={
                adminTab === "application-insights"
                  ? "admin-tab active"
                  : "admin-tab"
              }
              onClick={() =>
                setAdminTab("application-insights")
              }
            >
              Application Insights
            </button>
          </div>
        )}

        {user.role === "admin" &&
          adminTab === "backend-summary" && (

            <>
              <section className="kpi-grid">
                <KpiCard
                  title="Total News"
                  value={summary?.total_articles ?? 0}
                  subtitle="Articles monitored"
                />

                <KpiCard
                  title="High Importance"
                  value={highImportance}
                  subtitle="Requires attention"
                />

                {/* <KpiCard
                  title="High Risk"
                  value={highRisk}
                  subtitle="Risk flagged"
                /> */}

                <KpiCard
                  title="Positive Sentiment"
                  value={positiveSentiment}
                  subtitle="Positive developments"
                />

                <KpiCard
                  title="Negative Sentiment"
                  value={negativeSentiment}
                  subtitle="Negative developments"
                />
              </section>

              <section className="chart-grid">
                <div className="panel chart-panel">
                  <h2>Sentiment</h2>
                  <SentimentChart data={summary?.sentiment} />
                </div>

                <div className="panel chart-panel">
                  <h2>Importance</h2>
                  <DistributionBarChart
                    data={summary?.importance}
                  />
                </div>

                <div className="panel chart-panel">
                  <h2>Sentiment by Importance</h2>
                  <SentimentImportanceChart
                    data={summary?.sentiment_by_importance}
                  />
                </div>

              </section>

              <section className="ranking-grid">
                <div className="panel">
                  <h2>Top Banks</h2>
                  <RankingBarChart data={topBanks} />
                </div>

                <div className="panel">
                  <h2>Top Topics</h2>
                  <RankingBarChart data={topTopics} />
                </div>
              </section>

              <NewsPipelineControl />

            </>
          )}


        {(user.role === "user" ||
          (user.role === "admin" &&
            adminTab === "latest-news")) && (
            <section ref={newsSectionRef} className="panel news-panel">
              <div className="section-header">
                <div>
                  <h2>Latest News</h2>
                  <p>AI-prioritized business and banking intelligence</p>
                </div>

                <span className="news-count">
                  {news.length} articles
                </span>
              </div>

              <NewsFilters
                filters={filters}
                onChange={handleFiltersChange}
                onClear={handleClearFilters}
              />

              <div className="news-list">
                {news.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>

              <div className="pagination">
                <div className="pagination-info">
                  Showing {startArticle}–{endArticle} of {totalNews} articles
                </div>

                <div className="pagination-controls">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                  >
                    ← Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages || 1}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                  >
                    Next →
                  </button>
                </div>
              </div>
            </section>
          )}

        {user.role === "admin" &&
          adminTab === "application-insights" && (
            <ApplicationInsights />
          )}
      </main>
      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={async (feedback) => {
            try {
              await submitFeedback({
                username: user.username,
                role: user.role,
                ...feedback,
              });

              alert("Thank you for your feedback!");
              setShowFeedback(false);
            } catch (err) {
              console.error("Feedback submission failed:", err);
              alert("Unable to submit feedback. Please try again.");
            }
          }}
        />
      )}
    </div>
  );
}

export default App;