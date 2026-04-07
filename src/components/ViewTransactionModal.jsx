import { useStore } from "../store/useStore";

const ViewTransactionModal = () => {
  const { isViewOpen, viewTx, closeView } = useStore();

  if (!isViewOpen || !viewTx) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Transaction Details</h3>

        <p><strong>Date:</strong> {viewTx.date}</p>
        <p><strong>Amount:</strong> ₹{viewTx.amount}</p>
        <p><strong>Category:</strong> {viewTx.category}</p>
        <p><strong>Type:</strong> {viewTx.type}</p>

        <button onClick={closeView}>Close</button>
      </div>
    </div>
  );
};

export default ViewTransactionModal;