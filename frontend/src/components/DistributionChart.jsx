import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";


const PNB_RED = "#8B0000";
const PNB_GOLD = "#F4C300";

const SENTIMENT_COLORS = {
    positive: "#287A35",
    negative: "#B42318",
    neutral: PNB_GOLD,
};


export function SentimentChart({ data }) {
    const chartData = Object.entries(data ?? {}).map(
        ([name, value]) => ({
            name,
            value,
        }),
    );

    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    label
                >
                    {chartData.map((entry) => {
                        const color =
                            SENTIMENT_COLORS[
                            entry.name.toLowerCase()
                            ] ?? PNB_RED;

                        return (
                            <Cell
                                key={entry.name}
                                fill={color}
                            />
                        );
                    })}
                </Pie>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}


export function DistributionBarChart({ data }) {
    const chartData = Object.entries(data ?? {}).map(
        ([name, value]) => ({
            name,
            value,
        }),
    );

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5DDD0"
                />

                <XAxis
                    type="number"
                    stroke="#6B6B6B"
                />

                <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                    stroke="#6B6B6B"
                />

                <Tooltip />

                <Bar
                    dataKey="value"
                    fill={PNB_RED}
                    radius={[0, 6, 6, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}


export function RankingBarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5DDD0"
                />

                <XAxis
                    type="number"
                    stroke="#6B6B6B"
                />

                <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    stroke="#6B6B6B"
                />

                <Tooltip
                    formatter={(value, name) => [
                        value,
                        `${name} News`,
                    ]}
                />

                <Bar
                    dataKey="count"
                    fill={PNB_GOLD}
                    radius={[0, 6, 6, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}


export function SentimentImportanceChart({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="empty-chart">
                No sentiment/importance data available
            </div>
        );
    }

    const importanceOrder = [
        "Critical",
        "High",
        "Medium",
        "Low",
    ];

    const chartData = importanceOrder
        .filter((importance) => data[importance])
        .map((importance) => ({
            importance,
            Positive:
                data[importance]?.Positive ??
                data[importance]?.positive ??
                0,
            Neutral:
                data[importance]?.Neutral ??
                data[importance]?.neutral ??
                0,
            Negative:
                data[importance]?.Negative ??
                data[importance]?.negative ??
                0,
        }));

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={chartData}
                margin={{
                    top: 10,
                    right: 15,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="importance"
                    tick={{ fontSize: 12 }}
                />

                <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Legend />

                <Bar
                    dataKey="Positive"
                    stackId="sentiment"
                    name="Positive"
                    fill="#2e7d32"
                />

                <Bar
                    dataKey="Neutral"
                    stackId="sentiment"
                    name="Neutral"
                    fill="#f4b400"
                />

                <Bar
                    dataKey="Negative"
                    stackId="sentiment"
                    name="Negative"
                    fill="#c62828"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}