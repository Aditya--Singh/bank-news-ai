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
} from "recharts";

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
                    {chartData.map((entry) => (
                        <Cell key={entry.name} />
                    ))}
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
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" />

                <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                />

                <Tooltip />

                <Bar
                    dataKey="value"
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
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" />

                <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                />

                <Tooltip />

                <Bar
                    dataKey="count"
                    radius={[0, 6, 6, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}