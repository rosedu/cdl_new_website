import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import { scrollToHash } from "./components/HashLink";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EditionPage from "./pages/EditionPage";
import EditionsPage from "./pages/EditionsPage";
import NotFound from "./pages/NotFound";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // after navigating, the target section may not be mounted yet:
    // retry for a few frames until it is
    let tries = 0;
    let id = 0;
    const attempt = () => {
      if (scrollToHash(hash) || ++tries > 10) return;
      id = requestAnimationFrame(attempt);
    };
    attempt();
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editions" element={<EditionsPage />} />
          <Route path="/editii" element={<Navigate to="/editions" replace />} />
          <Route path="/:year/:season" element={<EditionPage />} />
          <Route path="/:year" element={<EditionPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
