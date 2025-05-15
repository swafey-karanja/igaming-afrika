import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Registration from './pages/registration.jsx';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Registration />} />
          </Routes>
        <Footer />
      </Provider>
    // </I18nextProvider>
  );
};

export default App;