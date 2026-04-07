// src/pages/Transactions.jsx
import { useStore } from "../store/useStore";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import ViewTransactionModal from "../components/ViewTransactionModal";

const Transactions = () => {
  const { role, openModal } = useStore();

  return (
    <div className="content">
      <div className="tx-header">
        <div>
          <h2 className="page-heading">Transactions</h2>
          <p className="page-sub">Manage your income and expenses</p>
        </div>

        {role === "admin" && (
          <button className="add-btn" onClick={() => openModal(null)}>
            + Add New
          </button>
        )}
      </div>

      <TransactionTable />
      <TransactionModal />
      <ViewTransactionModal />
    </div>
  );
};

export default Transactions;