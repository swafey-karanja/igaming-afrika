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
import SpeakerRegistrationPage from "./pages/speakerRegistration/SpeakerRegistrationPage.jsx";

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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="select-none bg-gray-100">
        {/* Use flexbox for better consistency */}
        <div className="xl:flex xl:min-h-screen">
          {/* Left Side Banner */}
          <div className="hidden xl:flex xl:w-[calc((100%-1280px)/2)] sticky top-[100px] h-[calc(100vh-100px)] items-start justify-end pt-10 pr-5">
            <a
              href="https://www.igasummit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/iga x lionbets.gif"
                alt="Side banner left"
                className="xl:max-w-[160px] w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Main Content Column with fixed width */}
          <div className="w-full xl:w-[1280px] flex-shrink-0 overflow-hidden">
            {/* Top Banner - fixed position */}
            <div className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100 py-0 xl:py-1">
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
            <Hero />
            <ScrollToTop />
            {/* Ensure consistent width for all pages */}
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<EventApplicationForm />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/publications/:category"
                  element={<Publications />}
                />
                <Route
                  path="/speaker-registration"
                  element={<SpeakerRegistrationPage />}
                />
              </Routes>
            </div>
            <Footer />
          </div>

          {/* Right Side Banner */}
          <div className="hidden xl:flex xl:w-[calc((100%-1280px)/2)] sticky top-[100px] h-[calc(100vh-100px)] items-start justify-start pt-10 pl-5">
            <a
              href="https://www.igasummit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/iga x lionbets.gif"
                alt="Side banner right"
                className="max-w-[160px] w-full h-auto object-contain"
              />
            </a>
          </div>
        </div>

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
