function DashboardStats({ stats }) {
    const cards = [
        {
            label: "Total News",
            value: stats?.total_news ?? 0,
        },
        {
            label: "High Risk",
            value: stats?.high_risk ?? 0,
        },
        {
            label: "High Importance",
            value: stats?.high_importance ?? 0,
        },
        {
            label: "AI Processed",
            value: `${stats?.ai_processed_percent ?? 0}%`,
        },
    ];

    return (
        <section className="dashboard-stats">
            {cards.map((card) => (
                <div className="stat-card" key={card.label}>
                    <div className="stat-label">
                        {card.label}
                    </div>

                    <div className="stat-value">
                        {card.value}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default DashboardStats;