import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MapPin, Car, Train, Phone, Mail, Calendar, Users } from "lucide-react";
import Header from "../../components/Header";

const VenueInfo = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const venueInfo = {
    name: "Sarit Expo Centre",
    address: "Sarit Centre, Westlands, Nairobi, Kenya",
    description:
      "A premier exhibition and conference venue in Nairobi offering over 3,300 square meters of versatile space with state-of-the-art facilities, perfectly suited for the iGaming AFRIKA Summit.",
    capacity: "3,300+ sqm exhibition space",
    parking: "Available at Sarit Centre",
    accessibility: "Fully accessible venue",
  };

  const venueImages = [
    {
      url: "https://saritexpo.com/media/images/18.width-1440.jpg",
      alt: "Sarit Expo Centre Exterior",
      title: "Main Entrance",
    },
    {
      url: "https://saritexpo.com/media/images/Sarit_Expo_Centre_-_Exhibition_and.2e16d0ba.fill-600x300.jpg",
      alt: "Exhibition Hall Interior",
      title: "Main Exhibition Hall",
    },
    {
      url: "https://www.africatechsummit.com/nairobi/wp-content/uploads/2021/02/sarit-1.jpg",
      alt: "Sarit Expo Centre Entrance",
      title: "Main Entrance",
    },
  ];

  const transportOptions = [
    {
      icon: Car,
      title: "By Car",
      description: "20 minutes from Jomo Kenyatta Airport",
      details: "Parking available at Sarit Centre mall",
    },
    {
      icon: Train,
      title: "Public Transport",
      description: "Matatu routes 11, 12, 13, 15",
      details: "Bus stop directly outside Sarit Centre",
    },
    {
      icon: MapPin,
      title: "Taxi/Uber",
      description: "Available 24/7",
      details: "Drop-off point at main entrance",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+254 737 448 844",
    },
    {
      icon: Mail,
      label: "Email",
      value: "events@igamingafrika.com",
    },
    {
      icon: Calendar,
      label: "Event Date",
      value: "4-6 MAY, 2026",
    },
    {
      icon: Users,
      label: "Space",
      value: "3,300+ sqm",
    },
  ];

  return (
    <section
      id="venueInfo"
      className="scroll-mt-40 xl:container xl:mx-auto  px-6 lg:px-8 py-8"
    >
      {/* Header Section */}
      <Header
        title="Venue Information"
        subtitle="Discover the details of the iGaming AFRIKA Summit 2026 venue at Sarit Expo Centre, Nairobi."
      />

      {/* Rest of the component remains the same */}
      {/* Tab Navigation */}
      <motion.div
        className="flex justify-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          {["overview", "gallery", "directions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Venue Details Card */}
          <motion.div
            variants={cardVariant}
            className="bg-white rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="h-64 relative overflow-hidden">
              {/* Background image */}
              <img
                src="/sarit-1.webp"
                alt="Venue background"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

              {/* Venue info text */}
              <div className="absolute bottom-6 left-6 text-white z-20">
                <h3 className="text-2xl font-bold mb-2">{venueInfo.name}</h3>
                <p className="text-green-100 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {venueInfo.address}
                </p>
              </div>

              {/* Decorative circle */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 z-20">
                <div className="absolute inset-0 bg-white rounded-full transform rotate-45 translate-x-12 -translate-y-12"></div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 text-sm md:text-[13px]">
                {venueInfo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Space</p>
                    <p className="font-semibold text-gray-900">
                      {venueInfo.capacity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Car className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Parking</p>
                    <p className="font-semibold text-gray-900">
                      {venueInfo.parking}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact & Transport Info */}
          <motion.div variants={cardVariant} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <item.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Options */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Getting There
              </h4>
              <div className="space-y-4">
                {transportOptions.map((option, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1">
                      <option.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {option.title}
                      </h5>
                      <p className="text-gray-600 text-sm">
                        {option.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {option.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {venueImages.map((image, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">{image.title}</h4>
                <p className="text-gray-600 text-sm">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Directions Tab */}
      {activeTab === "directions" && (
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Map - Increased height and added marker */}
          <motion.div variants={cardVariant} className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="h-[500px] bg-gray-200 relative">
                {" "}
                {/* Increased height from h-96 to h-[500px] */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8525895537273!2d36.79932981475401!3d-1.2606596990805028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176b6e9bd5e5%3A0xcd8fcd4811d8fc0f!2sThe%20Sarit%20Expo%20Centre!5e0!3m2!1sen!2suk!4v1612799533181!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Location Map"
                ></iframe>
              </div>
              <div className="p-4 bg-green-50 border-t border-green-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <p className="text-sm text-gray-700">
                    Sarit Expo Centre location
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Directions */}
          <motion.div variants={cardVariant}>
            <div className="bg-white rounded-2xl p-6 shadow-xl h-full flex flex-col">
              <h4 className="text-xl font-bold text-green-700 mb-4">
                Quick Directions
              </h4>
              <div className="space-y-4 flex-grow">
                <div className="p-4 bg-green-50 rounded-xl">
                  <h5 className="font-semibold text-green-700 mb-2">
                    From Airport
                  </h5>
                  <p className="text-sm text-gray-600">
                    Take Mombasa Road to Waiyaki Way, then follow signs to
                    Westlands. 20-25 minutes drive.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <h5 className="font-semibold text-green-700 mb-2">
                    From CBD
                  </h5>
                  <p className="text-sm text-gray-600">
                    Take Waiyaki Way westbound directly to Sarit Centre. 10-15
                    minutes drive.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <h5 className="font-semibold text-green-700 mb-2">
                    Public Transport
                  </h5>
                  <p className="text-sm text-gray-600">
                    Take matatu routes 11, 12, 13, or 15 to Westlands. Alight at
                    Sarit Centre.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: "#14a45c" }}
                className="w-full mt-6 py-3 px-6 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps?ll=-1.261299,36.801215&z=16&t=m&hl=en&gl=GB&mapclient=embed&cid=14812283408865623055",
                    "_blank"
                  )
                }
              >
                Open in Google Maps
                <span className="ml-2">→</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default VenueInfo;
