import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"; // Yeni oluşturduğumuz Header'ı import ettik
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

import "./App.css";

function App() {
  return (
    <div>
      {/* Tüm sayfalarda en tepede görünecek modern Header componenti */}
      <Header />

      {/* Sayfa İçerikleri ve Rotalar */}
      <main style={{ minHeight: "calc(100vh - 70px)" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* 404 - Sayfa Bulunamadı Durumu */}
          <Route
            path="*"
            element={
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                <h2>404 - Page Not Found!</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
