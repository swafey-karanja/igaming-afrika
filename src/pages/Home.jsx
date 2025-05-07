import React from 'react'
import Numbers from "../components/Numbers.jsx"
// import TopGameReviews from "../components/TopGames.jsx"
import GlobalNews from "../components/GlobalNews.jsx"
import Sponsors from '../components/Sponsors.jsx'
import Navbar from '../components/Navbar.jsx'
import Schedule from '../components/Schedule.jsx'
import Speakers from '../components/Speakers.jsx'
import Gallery from '../components/Galleria.jsx'

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
    </div>
  )
}

export default Home;
