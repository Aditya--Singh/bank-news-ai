import { useState } from "react";

function FeedbackModal({ onClose, onSubmit }) {
    const [ratings, setRatings] = useState({
        relevance: 0,
        accuracy: 0,
        usefulness: 0,
        clarity: 0,
        timeliness: 0,
    });

    const [comments, setComments] = useState("");

    const parameters = [
        {
            key: "relevance",
            label: "Relevance",
            description: "How relevant was the information to your work?",
        },
        {
            key: "accuracy",
            label: "Accuracy",
            description: "How accurate and trustworthy was the information?",
        },
        {
            key: "usefulness",
            label: "Usefulness",
            description: "How useful was the application for your work?",
        },
        {
            key: "clarity",
            label: "Clarity",
            description: "How clear and easy to understand were the insights?",
        },
        {
            key: "timeliness",
            label: "Timeliness",
            description: "How timely were the news and insights?",
        },
    ];

    const handleRating = (parameter, rating) => {
        setRatings((previous) => ({
            ...previous,
            [parameter]: rating,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const incomplete = Object.values(ratings).some(
            (rating) => rating === 0
        );

        if (incomplete) {
            return;
        }

        await onSubmit({
            ...ratings,
            comments: comments.trim() || null,
        });
    };

    return (
        <div className="feedback-overlay">
            <div className="feedback-modal">
                <div className="feedback-header">
                    <div>
                        <h2>Share Your Feedback</h2>
                        <p>
                            Help us improve Bank News Intelligence.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="feedback-close"
                        onClick={onClose}
                        aria-label="Close feedback"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="feedback-ratings">
                        {parameters.map((parameter) => (
                            <div
                                className="feedback-rating-row"
                                key={parameter.key}
                            >
                                <div className="feedback-rating-label">
                                    <strong>{parameter.label}</strong>
                                    <span>
                                        {parameter.description}
                                    </span>
                                </div>

                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            className={
                                                rating <=
                                                    ratings[parameter.key]
                                                    ? "star active"
                                                    : "star"
                                            }
                                            onClick={() =>
                                                handleRating(
                                                    parameter.key,
                                                    rating
                                                )
                                            }
                                            aria-label={`${rating} out of 5`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="feedback-comments">
                        <label htmlFor="feedback-comments">
                            Additional comments
                            <span> (optional)</span>
                        </label>

                        <textarea
                            id="feedback-comments"
                            value={comments}
                            onChange={(event) =>
                                setComments(event.target.value)
                            }
                            placeholder="Tell us how we can improve..."
                            rows={4}
                        />
                    </div>

                    <div className="feedback-footer">
                        <button
                            type="button"
                            className="feedback-button secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="feedback-button primary"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackModal;