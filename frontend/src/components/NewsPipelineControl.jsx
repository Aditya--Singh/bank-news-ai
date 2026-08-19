import { useState } from "react";

import { runNewsIngestion } from "../api/admin";

function NewsPipelineControl() {
    const [running, setRunning] = useState(false);
    const [message, setMessage] = useState("");

    const handleRun = async () => {
        setRunning(true);
        setMessage("");

        try {
            const result = await runNewsIngestion();

            setMessage(
                result.message ||
                "News ingestion started successfully.",
            );
        } catch (error) {
            console.error(
                "Unable to start news ingestion:",
                error,
            );

            setMessage(
                "Unable to start news ingestion.",
            );
        } finally {
            setRunning(false);
        }
    };

    return (
        <section className="panel news-pipeline-panel">
            <div className="section-header">
                <div>
                    <h2>News Data Pipeline</h2>
                    <p>
                        Fetch latest news and run AI analysis
                    </p>
                </div>
            </div>

            <button
                type="button"
                className="pipeline-button"
                onClick={handleRun}
                disabled={running}
            >
                {running
                    ? "Starting..."
                    : "Run News Ingestion"}
            </button>

            {message && (
                <p className="pipeline-message">
                    {message}
                </p>
            )}
        </section>
    );
}

export default NewsPipelineControl;