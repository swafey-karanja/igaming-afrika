// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Numbers from "../components/Numbers.jsx";
import GlobalNews from "../components/GlobalNews.jsx";
import Sponsors from "../components/EventSponsors.jsx";
import Navbar from "../components/Navbar.jsx";
import Schedule from "../components/Schedule.jsx";
import Speakers from "../components/Speakers.jsx";
import Gallery from "../components/Galleria.jsx";
import FAQSection from "../components/FaqSection.jsx";
import Packages from "../components/SponsorshipOpportunities.jsx";
import ExhibitionPackages from "../components/ExhibitionOpportunities.jsx";
import FloorPlan from "../components/Floorplan.jsx";
import Tickets from "../components/Tickets.jsx";
import Venue from "../components/VenueInfo.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div className="bg-gray-100 overflow-hidden">
      <Navbar />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Numbers />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Sponsors />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FloorPlan />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Schedule />
      </motion.div>

      {/* <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Speakers />
      </motion.div> */}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Packages />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ExhibitionPackages />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Tickets />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Gallery />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <GlobalNews variant="international-regulations" />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FAQSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Venue />
      </motion.div>
    </div>
  );
};

export default Home;
