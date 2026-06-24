import { Routes, Route, Link } from "react-router-dom";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import HomePage from "./pages/HomePage/HomePage";

import "./App.css";

function App() {
  return (
    <div>
      {/* Kolayca test edebilmek için geçici bir Navigasyon Menüsü ekleyelim */}
      <nav
        style={{
          padding: "10px",
          background: "#f0f0f0",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
        {/* Tanımlanmayan bir sayfaya gidilirse 404 göstermek için */}
        <Route
          path="*"
          element={<div style={{ padding: "20px" }}>Page Not Found!</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
