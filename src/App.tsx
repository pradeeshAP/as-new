import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CursorDot } from "./components/CursorDot";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

/** Resets scroll to top on every route change that isn't targeting an in-page anchor. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <CursorDot />
      <ScrollProgress />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
