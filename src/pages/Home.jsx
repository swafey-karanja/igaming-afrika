import React from 'react'
import Numbers from "../components/Numbers.jsx"
import GlobalNews from "../components/GlobalNews.jsx"
import Sponsors from '../components/Sponsors.jsx'
import Navbar from '../components/Navbar.jsx'
import Schedule from '../components/Schedule.jsx'
import Speakers from '../components/Speakers.jsx'
import Gallery from '../components/Galleria.jsx'
import FAQSection from '../components/FaqSection.jsx'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Numbers />
      <GlobalNews variant="international-regulations" />
      <Sponsors />
      <Schedule />
      <Speakers />
      <Gallery />
      <FAQSection />
    </div>
  )
}

export default Home;
