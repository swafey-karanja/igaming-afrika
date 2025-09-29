// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Numbers from "../components/home/Numbers.jsx";
import GlobalNews from "../components/home/GlobalNews.jsx";
import Sponsors from "../components/home/EventSponsors.jsx";
import Navbar from "../components/home/Navbar.jsx";
import Schedule from "../components/home/Schedule.jsx";
import Speakers from "../components/home/Speakers.jsx";
import Gallery from "../components/home/Galleria.jsx";
import FAQSection from "../components/home/FaqSection.jsx";
import Packages from "../components/home/SponsorshipOpportunities.jsx";
import ExhibitionPackages from "../components/home/ExhibitionOpportunities.jsx";
import FloorPlan from "../components/home/Floorplan.jsx";
import Tickets from "../components/home/Tickets.jsx";
import Venue from "../components/home/VenueInfo.jsx";
import Attendees from "../components/home/Attendees.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 overflow-hidden">
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
          <Attendees />
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
    </>
  );
};

export default Home;
