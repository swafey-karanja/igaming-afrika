import React from 'react'
import Numbers from "../components/Numbers.jsx"
// import TopGameReviews from "../components/TopGames.jsx"
import GlobalNews from "../components/GlobalNews.jsx"
import Sponsors from '../components/Sponsors.jsx'

const News = () => {
  return (
    <div>
      <Numbers />
      <GlobalNews variant="international-regulations" />
      <Sponsors />
    </div>
  )
}

export default News
