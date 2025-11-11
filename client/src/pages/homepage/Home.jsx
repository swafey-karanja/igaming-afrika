/* eslint-disable no-unused-vars */
import EventSponsors from "./EventSponsors";
import { motion } from "framer-motion";
import EventDetails from "./EventDetails";
import Floorplan from "./Floorplan";
import EventSchedule from "./EventSchedule";
import EventSpeakers from "./EventSpeakers";
import SponsorshipPackages from "./SponsorshipPackages";
import ExhibitionPackages from "./ExhibitionPackages";
import EventTickets from "./EventTickets";
import EventGallery from "./EventGallery";
import EventNews from "./EventNews";
import FAQs from "./FAQs";
import VenueInfo from "./VenueInfo";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventDetails />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventSponsors />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Floorplan />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventSchedule />
      </motion.div>

      {/* <motion.div*/}
      {/*  variants={fadeInUp}*/}
      {/*  initial="hidden"*/}
      {/*  whileInView="visible"*/}
      {/*  viewport={{ once: true }}*/}
      {/*>*/}
      {/*  <EventSpeakers />*/}
      {/*</motion.div>*/}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SponsorshipPackages />
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
        <EventTickets />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventGallery />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventNews />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FAQs />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <VenueInfo />
      </motion.div>
    </>
  );
};

export default Home;
