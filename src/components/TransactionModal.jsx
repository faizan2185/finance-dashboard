// src/components/TransactionModal.jsx
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

const TransactionModal = () => {
  const { isModalOpen, closeModal, addTransaction, updateTransaction, editingTx } =
    useStore();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editingTx) {
      setForm(editingTx);
    } else {
      setForm({ date: "", amount: "", category: "", type: "expense" });
    }
  }, [editingTx]);

  if (!isModalOpen) return null;

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) return;

    if (editingTx) {
      updateTransaction(form);
    } else {
      addTransaction({ ...form, id: Date.now() });
    }
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{editingTx ? "Edit Transaction" : "Add Transaction"}</h3>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Groceries, Salary..."
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSubmit}>
            {editingTx ? "Save Changes" : "Add Transaction"}
          </button>
          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;