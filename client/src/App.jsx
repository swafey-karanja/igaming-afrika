import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Registration from "./pages/registration.jsx";
import { Toaster } from "react-hot-toast"; // ✅ Add this

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
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
        {/* ✅ Global Toast Mount */}
      </Provider>
    </I18nextProvider>
  );
};

export default App;
