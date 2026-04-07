// src/pages/Insights.jsx
import { useStore } from "../store/useStore";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#7c6aff", "#6affb8", "#ff6a6a", "#ffbb28", "#00c49f"];

const Insights = () => {
  const { transactions } = useStore();

  if (transactions.length === 0) {
    return (
      <div className="content">
        <h2 className="page-heading">Insights</h2>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  // CATEGORY DATA
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // MONTHLY DATA
  const monthlyMap = {};

  transactions.forEach((t) => {
    const rawMonth = t.date.slice(0, 7);
    const dateObj = new Date(rawMonth + "-01");

    const formattedMonth = dateObj.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyMap[formattedMonth]) {
      monthlyMap[formattedMonth] = {
        month: formattedMonth,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") {
      monthlyMap[formattedMonth].income += t.amount;
    } else {
      monthlyMap[formattedMonth].expense += t.amount;
    }
  });

  const monthlyData = Object.values(monthlyMap);

  const highestCategory =
    categoryData.length > 0
      ? categoryData.reduce((a, b) =>
          a.value > b.value ? a : b
        ).name
      : "N/A";

  return (
    <div className="content">
      <h2 className="page-heading">Insight</h2>

      <p>
        <strong>Highest Spending Category:</strong> {highestCategory}
      </p>

      <div className="insights-grid">
        
        {/* PIE */}
        <div className="insight-card">
          <h4>Spending by Category</h4>

          <PieChart width={320} height={320}>
            <Pie data={categoryData} dataKey="value" outerRadius={120}>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* BAR */}
        <div className="insight-card">
          <h4>Monthly Comparison</h4>

          <BarChart width={450} height={320} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a38" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="income" fill="#6affb8" />
            <Bar dataKey="expense" fill="#ff6a6a" />
          </BarChart>
        </div>

      </div>
    </div>
  );
};

export default Insights;