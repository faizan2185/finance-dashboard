// src/store/useStore.js
import { create } from "zustand";

export const useStore = create((set, get) => ({
  role: "user",

  // ✅ MOCK TRANSACTIONS
  transactions: [
    {
      id: 1,
      date: "2026-04-01",
      amount: 5000,
      category: "Salary",
      type: "income",
    },
    {
      id: 2,
      date: "2026-04-02",
      amount: 1200,
      category: "Food",
      type: "expense",
    },
    {
      id: 3,
      date: "2026-04-03",
      amount: 800,
      category: "Transport",
      type: "expense",
    },
    {
      id: 4,
      date: "2026-04-05",
      amount: 2000,
      category: "Freelance",
      type: "income",
    },
    {
      id: 5,
      date: "2026-04-07",
      amount: 1500,
      category: "Shopping",
      type: "expense",
    },
  ],

  // ===== MODAL STATES =====
  editingTx: null,
  isModalOpen: false,

  // ✅ VIEW MODAL (NEW 🔥)
  viewTx: null,
  isViewOpen: false,

  // ===== ROLE =====
  toggleRole: () =>
    set((state) => ({
      role: state.role === "admin" ? "user" : "admin",
    })),

  // ===== EDIT / ADD MODAL =====
  openModal: (tx = null) =>
    set({
      isModalOpen: true,
      editingTx: tx,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingTx: null,
    }),

  // ===== VIEW MODAL =====
  openView: (tx) =>
    set({
      viewTx: tx,
      isViewOpen: true,
    }),

  closeView: () =>
    set({
      viewTx: null,
      isViewOpen: false,
    }),

  // ===== CRUD =====
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...tx, id: Date.now() }, // auto id
      ],
    })),

  updateTransaction: (updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTx.id ? updatedTx : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  // ===== INSIGHTS (DERIVED DATA 🔥) =====

  getSummary: () => {
    const { transactions } = get();

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  },

  getCategoryData: () => {
    const { transactions } = get();

    const map = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  },

  getMonthlyData: () => {
    const { transactions } = get();

    const map = {};

    transactions.forEach((t) => {
      const rawMonth = t.date.slice(0, 7);
      const dateObj = new Date(rawMonth + "-01");

      const formattedMonth = dateObj.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!map[formattedMonth]) {
        map[formattedMonth] = {
          month: formattedMonth,
          income: 0,
          expense: 0,
        };
      }

      if (t.type === "income") {
        map[formattedMonth].income += t.amount;
      } else {
        map[formattedMonth].expense += t.amount;
      }
    });

    return Object.values(map);
  },

  getHighestCategory: () => {
    const data = get().getCategoryData();

    if (data.length === 0) return "N/A";

    return data.reduce((a, b) =>
      a.value > b.value ? a : b
    ).name;
  },
}));