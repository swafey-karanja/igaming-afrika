import Numbers from "../components/Numbers.jsx"
import GlobalNews from "../components/GlobalNews.jsx"
import Sponsors from '../components/Sponsors.jsx'
import Navbar from '../components/Navbar.jsx'
import Schedule from '../components/Schedule.jsx'
import Speakers from '../components/Speakers.jsx'
import Gallery from '../components/Galleria.jsx'
import FAQSection from '../components/FaqSection.jsx'
import Packages from "../components/Packages.jsx"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Numbers />
      <Sponsors />
      <Schedule />
      <Speakers />
      <Packages />
      <Gallery />
      <GlobalNews variant="international-regulations" />
      <FAQSection />
    </div>
  )
}

export default Home;
