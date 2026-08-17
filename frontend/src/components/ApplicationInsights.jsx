import { useEffect, useState } from "react";

import { getMonthlyFeedback } from "../api/feedback";


const INSIGHTS_DATA = [
    {
        year: 2026,
        month: "June",
        totalUsers: 8,
        activeUsers: 6,
        sessions: 30,
    },
    {
        year: 2026,
        month: "July",
        totalUsers: 8,
        activeUsers: 6,
        sessions: 42,
    },
    {
        year: 2026,
        month: "August",
        totalUsers: 8,
        activeUsers: 6,
        sessions: 22,
    },
];


function ApplicationInsights() {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const data = await getMonthlyFeedback();

                setFeedbackData(data);
            } catch (error) {
                console.error(
                    "Unable to load feedback data:",
                    error,
                );
            }
        };

        loadFeedback();
    }, []);

    const insightsData = INSIGHTS_DATA.map((row) => {
        const feedback = feedbackData.find(
            (item) =>
                item.year === row.year &&
                item.month === row.month,
        );

        return {
            ...row,
            feedbackCaptured:
                feedback?.feedbackCaptured ?? 0,
        };
    });

    return (
        <section className="panel application-insights">
            <div className="section-header">
                <div>
                    <h2>Application Insights</h2>

                    <p>
                        Application usage and engagement metrics
                    </p>
                </div>
            </div>

            <div className="insights-table-container">
                <table className="insights-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Total Users</th>
                            <th>Active Users</th>
                            <th>Session</th>
                            <th>Feedback Captured</th>
                        </tr>
                    </thead>

                    <tbody>
                        {insightsData.map((row) => (
                            <tr
                                key={`${row.year}-${row.month}`}
                            >
                                <td>{row.year}</td>

                                <td>{row.month}</td>

                                <td>{row.totalUsers}</td>

                                <td>{row.activeUsers}</td>

                                <td>{row.sessions}</td>

                                <td>{row.feedbackCaptured}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


export default ApplicationInsights;