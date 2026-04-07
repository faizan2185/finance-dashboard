// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-wrapper">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;