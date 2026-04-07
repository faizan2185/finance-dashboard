import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useStore } from "../store/useStore";

const Charts = () => {
  const { transactions } = useStore();

  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || {
          name: curr.category,
          value: 0,
        };
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {})
  );

  const monthlyData = transactions.map((t) => ({
    name: t.date,
    amount: t.amount,
  }));

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      
      <PieChart width={300} height={300}>
        <Pie data={categoryData} dataKey="value">
          {categoryData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <BarChart width={400} height={300} data={monthlyData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </div>
  );
};

export default Charts;