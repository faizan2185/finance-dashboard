// src/pages/Dashboard.jsx
import { useStore } from "../store/useStore";
import "../dashboard.css";

const Dashboard = () => {
  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;

  return (
    <div className="content">
      <h2 className="page-heading">Overview</h2>
      <p className="page-sub">Here's a summary of your finances</p>

      <div className="cards">
        <div className="card">
          <div className="card-icon">💰</div>
          <p className="card-label">Balance</p>
          <p className={`card-value ${balance >= 0 ? "balance" : "expense"}`}>
            ₹{balance.toLocaleString()}
          </p>
        </div>

        <div className="card">
          <div className="card-icon">📥</div>
          <p className="card-label">Total Income</p>
          <p className="card-value income">₹{income.toLocaleString()}</p>
        </div>

        <div className="card">
          <div className="card-icon">📤</div>
          <p className="card-label">Total Expenses</p>
          <p className="card-value expense">₹{expense.toLocaleString()}</p>
        </div>
      </div>

      <div className="summary-bar">
        <h4>SAVINGS RATE — {savingsRate}%</h4>

        <div className="bar-track">
          <div
            className="bar-fill"
            style={{ width: `${Math.min(Math.max(savingsRate, 0), 100)}%` }}
          />
        </div>

        <div className="bar-labels">
          <span>₹0</span>
          <span>₹{income.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;