import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration.jsx';
import Location from './pages/Location.jsx';
import News from './pages/News.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/location' element={<Location />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/news' element={<News />} />
          </Routes>
        <Footer />
      </Provider>
    </I18nextProvider>
  );
};

export default App;