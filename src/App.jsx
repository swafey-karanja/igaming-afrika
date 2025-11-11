import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./lib/utils.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Checkout from "./pages/checkoutpage/Checkout.jsx";
import Home from "./pages/homepage/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Publications from "./pages/publicationspage/Publications.jsx";
import Hero from "./components/Hero.jsx";
import EventApplicationForm from "./pages/registrationpage/EventApplicationForm.jsx";

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
      <div className="select-none bg-gray-100 overflow-hidden">
        <Navbar />
        <Hero />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<EventApplicationForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/publications/:category" element={<Publications />} />
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
