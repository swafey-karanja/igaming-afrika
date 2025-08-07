import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Registration from "./pages/registration.jsx";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import CheckoutPage from "./pages/checkout.jsx";

const App = () => {
  useEffect(() => {
    // Enable browser's automatic scroll restoration for reloads
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }

    // Prevent copy, paste, and cut keyboard shortcuts
    const handleKeyDown = (e) => {
      const isShortcut =
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x"].includes(e.key.toLowerCase());
      if (isShortcut) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="select-none">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-center"
          containerStyle={{
            top: "50%",
            transform: "translateY(-80%)",
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#f0fdf4",
              color: "#14532d",
              fontSize: "15px",
            },
          }}
        />
      </div>
    </Provider>
  );
};

export default App;
