import React from 'react'
import Hero from "../components/Hero.jsx"
import TopPosts from "../components/TopPosts.jsx"
import TopGameReviews from "../components/TopGames.jsx"
import GlobalNews from "../components/GlobalNews.jsx"

const News = () => {
  return (
    <div>
      <Hero />
      <TopPosts />
      <TopPosts variant="editors-choice" />
      <TopGameReviews />
      <GlobalNews variant="global-news" />
      <GlobalNews variant="international-regulations" />
    </div>
  )
}

export default News
