import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import your i18n configuration
import News from './pages/News.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import Magazine from './pages/Magazine.jsx';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Navbar />
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/magazine' element={<Magazine />} />
        </Routes>
      <Footer />
    </I18nextProvider>
  );
};

export default App;