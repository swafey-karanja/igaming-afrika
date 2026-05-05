import Footer from "./components/layout/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./lib/utils.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import Home from "./features/home/HomePage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Publications from "./features/publications/PublicationsPage.jsx";
import Hero from "./components/layout/Hero.jsx";
import EventApplicationForm from "./features/registration/EventApplicationPage.jsx";
import SpeakerRegistrationPage from "./features/speakerApplication/SpeakerRegistrationPage.jsx";
import SocialSidebar from "./components/layout/SocialSidebar.jsx";
import PromoModal from "./components/PromoModal.jsx";

const App = () => {
  const [promoOpen, setPromoOpen] = useState(false);

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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setPromoOpen(true); // fires on every load/reload
  }, []);

  return (
    <Provider store={store}>
      <div className="select-none bg-gray-100 w-full flex-shrink-0 overflow-hidden">
        {/* Use flexbox for better consistency */}
        {/* Top Banner - fixed position */}
        <div className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-200 py-0 xl:py-1.5">
          <a
            href="https://www.sagaming.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/sagaming-banner.gif"
              alt="bnetwork accommodation specialist"
              className="w-full h-auto object-contain max-h-[60px] sm:max-h-[80px] md:max-h-[100px]"
            />
          </a>
        </div>
        <Navbar />
        <SocialSidebar />
        <Hero />
        {/* <PromoModal open={promoOpen} onClose={() => setPromoOpen(false)} /> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<EventApplicationForm />} /> */}
          <Route path="/publications/:category" element={<Publications />} />
          <Route
            path="/speaker-registration"
            element={<SpeakerRegistrationPage />}
          />
        </Routes>
        <Footer />
      </div>

      <Toaster richColors position="top-right" />
    </Provider>
  );
};

export default App;
