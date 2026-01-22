/* eslint-disable no-unused-vars */
import EventSponsors from "./EventSponsors";
import { motion } from "framer-motion";
import EventDetails from "./EventDetails";
import Floorplan from "./Floorplan";
import EventSchedule from "./EventSchedule";
// import EventSpeakers from "./EventSpeakers";
import SponsorshipPackages from "./SponsorshipPackages";
import ExhibitionPackages from "./ExhibitionPackages";
import EventTickets from "./EventTickets";
import EventGallery from "./EventGallery";
import EventNews from "./EventNews";
import FAQs from "./FAQs";
import VenueInfo from "./VenueInfo";
import Accordion from "../../components/Accordion";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scrollLinks = [
    { name: "About", href: "#eventDetails" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FloorPlan", href: "#floorPlan" },
    { name: "Schedule", href: "#schedule" },
    { name: "Sponsor", href: "#sponsorshipPackages" },
    { name: "Exhibit", href: "#exhibitionPackages" },
    { name: "Tickets", href: "#eventTickets" },
    { name: "FAQs", href: "#faqs" },
    { name: "Venue-Info", href: "#venueInfo" },
  ];
  return (
    <div className="py-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <div className="w-full pb-2 text-center flex gap-x-6 items-center justify-start xl:justify-center overflow-x-auto hide-scrollbar flex-nowrap py-6">
          {scrollLinks.map((link) => (
            <button
              key={link.href}
              className="py-3 cursor-pointer px-6 bg-gray-100 hover:bg-[#47cf8b] hover:border-[#47cf8b] text-[#14a45c] transition-colors duration-100 ease-in-out hover:text-white rounded-3xl border-2 border-lime-500 font-semibold whitespace-nowrap flex-shrink-0"
              onClick={() => {
                const section = document.querySelector(link.href);
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
        <hr className="text-gray-300 my-5 font-bold xl:container xl:mx-auto " /> */}
        {/* <Accordion title="Event Details" defaultOpen={false}> */}
        <EventDetails />
        {/* </Accordion> */}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <Accordion title="Event Sponsors" defaultOpen={false}> */}
        <EventSponsors />
        {/* </Accordion> */}
      </motion.div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <Accordion title="Event Schedule" defaultOpen={false}> */}
        <EventSchedule />
        {/* </Accordion> */}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <Accordion title="Event Tickets" defaultOpen={false}> */}
        <EventTickets />
        {/* </Accordion> */}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <Accordion title="Event News & Blogs" defaultOpen={false}> */}
        <EventNews />
        {/* </Accordion> */}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Floorplan" defaultOpen={false}>
          <Floorplan />
        </Accordion>
      </motion.div>

      {/* <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <EventSpeakers />
      </motion.div> */}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Sponsorship Packages" defaultOpen={false}>
          <SponsorshipPackages />
        </Accordion>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Exhibition Packages" defaultOpen={false}>
          <ExhibitionPackages />
        </Accordion>
      </motion.div>

      {/* <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Event Gallery" defaultOpen={false}>
          <EventGallery />
        </Accordion>
      </motion.div> */}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Frequently Asked Questions" defaultOpen={false}>
          <FAQs />
        </Accordion>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Accordion title="Venue Information" defaultOpen={false}>
          <VenueInfo />
        </Accordion>
      </motion.div>
    </div>
  );
};

export default Home;
