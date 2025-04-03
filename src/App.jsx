import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import TopPosts from './components/TopPosts.jsx'
import TopGameReviews from './components/TopGames.jsx'
import GlobalNews from './components/GlobalNews.jsx'

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TopPosts />
      <TopPosts variant="editors-choice" />
      <TopGameReviews />
      <GlobalNews variant="global-news" />
      <GlobalNews variant="international-regulations" />
      <Footer />
    </>
  )
}

export default App
