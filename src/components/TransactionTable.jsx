// src/components/TransactionTable.jsx
import { useStore } from "../store/useStore";

const TransactionTable = () => {
  const {
    transactions,
    role,
    deleteTransaction,
    openModal,
    openView, // ✅ NEW
  } = useStore();

  // ✅ EMPTY STATE
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: "36px" }}>📭</div>
        <p>No transactions yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>

            <td>{t.category}</td>

            <td>
              <span className={`type-badge ${t.type}`}>
                {t.type}
              </span>
            </td>

            <td>
              <span className={`amount-cell ${t.type}`}>
                {t.type === "expense" ? "-" : "+"}₹
                {t.amount.toLocaleString()}
              </span>
            </td>

            <td>
              <div className="action-btns">
                
                {/* ✅ VIEW BUTTON */}
                <button
                  className="btn-view"
                  onClick={() => openView(t)}
                >
                  View
                </button>

                {/* ✅ ADMIN ONLY */}
                {role === "admin" && (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => openModal(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-del"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;