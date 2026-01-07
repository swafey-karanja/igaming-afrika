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
// import Return from "./pages/checkoutpage/Return.jsx";
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="select-none bg-gray-100">
        {/* Animated Banner at the very top - fixed position */}
        <div className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100 py-1">
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

        {/* Main Layout with Side Banners */}
        <div className="relative flex justify-center">
          {/* Left Vertical Banner - Hidden on mobile and tablet, visible on large screens */}
          <div className="hidden xl:flex sticky top-10 h-screen w-[150px] items-center justify-center flex-shrink-0">
            <a
              href="https://www.igasummit.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/iga x lionbets.gif"
                alt="Left Advertisement"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Center Content Area */}
          <div className="flex-1 min-w-[1300px]">
            <Navbar />
            <Hero />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<EventApplicationForm />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/publications/:category"
                element={<Publications />}
              />
              {/* <Route path="/return" element={<Return />} /> */}
              <Route
                path="/speaker-registration"
                element={<SpeakerRegistrationPage />}
              />
            </Routes>
            <Footer />
          </div>

          {/* Right Vertical Banner - Hidden on mobile and tablet, visible on large screens */}
          <div className="hidden xl:flex sticky top-10 h-screen w-[150px] items-center justify-center flex-shrink-0">
            <a
              href="https://www.igasummit.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/iga x lionbets.gif"
                alt="Right Advertisement"
                className="w-full h-auto object-contain"
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
