/* eslint-disable no-unused-vars */
import EventSponsors from "./components/EventSponsors";
import { motion } from "framer-motion";
import EventDetails from "./components/EventDetails";
import Floorplan from "./components/Floorplan";
import EventSchedule from "./components/EventSchedule";
import EventSpeakers from "./components/EventSpeakers";
import SponsorshipPackages from "../sponsorship/SponsorshipPackages";
import ExhibitionPackages from "../exhibition/ExhibitionPackages";
import EventTickets from "./components/EventTickets";
// import EventGallery from "./EventGallery";
import EventNews from "./components/EventNews";
import FAQs from "./components/FAQs";
import VenueInfo from "./components/VenueInfo";
import useFetch from "../../hooks/useFetch.ts";
import { fetchDataFromApi } from "../../services/api.js";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const {
    data: speakers,
    isLoading: speakerLoading,
    error: speakerError,
    refetch: refetchSpeakers,
  } = useFetch(() => fetchDataFromApi("speakers"));

  return (
    <div>
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
        <EventSchedule speakers={speakers ?? []} />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventSpeakers
          speakers={speakers ?? []}
          speakerLoading={speakerLoading}
          speakerError={speakerError}
          refetchSpeakers={refetchSpeakers}
        />
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

      {/* <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
          <EventGallery />

      </motion.div> */}

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
    </div>
  );
};

export default Home;
