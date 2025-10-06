import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PropertyPage from "./components/PropertyPage";

const PropertyPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>Property not found</p>;
  return <PropertyPage propertyId={id} />;
};

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "'Poppins', sans-serif",
          color: "#0f172a",
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: "#0f766e",
            color: "white",
            padding: "25px 0",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: 600 }}>
            Flex Living Reviews Dashboard
          </h1>
          <p style={{ fontSize: "1rem", opacity: 0.9 }}>
            Real feedback from real customers 🌿
          </p>
        </header>

        {/* Main content */}
        <main
          style={{
            width: "100vw",
            minHeight: "calc(100vh - 140px)",
            backgroundColor: "#f5f5f5",
            padding: "40px 60px",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/property/:id" element={<PropertyPageWrapper />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#0f766e",
            color: "white",
            textAlign: "center",
            padding: "12px 0",
            fontSize: "0.9rem",
            marginTop: "40px",
          }}
        >
          © {new Date().getFullYear()} Flex Living Reviews
        </footer>
      </div>
    </Router>
  );
}

export default App;
