function NewsFilters({ filters, onChange, onClear }) {
    const updateFilter = (name, value) => {
        onChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="news-filters">
            <select
                value={filters.source}
                onChange={(event) =>
                    updateFilter("source", event.target.value)
                }
            >
                <option value="">All Sources</option>
                <option value="PSU Connect">PSU Connect</option>
                <option value="Business Standard">
                    Business Standard
                </option>
                <option value="Zee Business">Zee Business</option>
                <option value="News18">News18</option>
                <option value="Economic Times">
                    Economic Times
                </option>
                <option value="ANI">ANI</option>
                <option value="BusinessLine">BusinessLine</option>
                <option value="ET BFSI">ET BFSI</option>
            </select>

            <input
                type="text"
                placeholder="Search bank"
                value={filters.bank}
                onChange={(event) =>
                    updateFilter("bank", event.target.value)
                }
            />

            <select
                value={filters.sentiment}
                onChange={(event) =>
                    updateFilter("sentiment", event.target.value)
                }
            >
                <option value="">All Sentiments</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
            </select>

            <select
                value={filters.importance}
                onChange={(event) =>
                    updateFilter("importance", event.target.value)
                }
            >
                <option value="">All Importance</option>
                {/* <option value="Critical">Critical</option> */}
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            {/* <select
                value={filters.riskLevel}
                onChange={(event) =>
                    updateFilter("riskLevel", event.target.value)
                }
            >
                <option value="">All Risk</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select> */}

            <button type="button" onClick={onClear}>
                Clear Filters
            </button>
        </div>
    );
}

export default NewsFilters;