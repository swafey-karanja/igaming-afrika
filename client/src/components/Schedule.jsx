import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Schedule() {
  const [activeTab, setActiveTab] = useState(0);

  const dates = [
    { day: "Sun", date: "3 May" },
    { day: "Mon", date: "4 May" },
    { day: "Tue", date: "5 May" },
    { day: "Wed", date: "6 May" },
    { day: "Thur", date: "7 May" },
  ];

  // Sample conference schedule data for each day
  const schedules = {
    0: [
      {
        time: "00:00 – 23:00",
        title: "Arrival",
        location: "Jomo Kenyatta International Airport",
        description: "Arrival of Delegates",
      },
      {
        time: "16:30 – 19:30",
        title: "Pre-Registration",
        location: "GTC Pan Pacific",
        description: "Pre-registration of event attendees and delegates",
      },
    ],
    1: [
      {
        time: "09:30 – 17:30",
        title: "Conference & Exhibition",
        location: "Sarit Expo Centre",
        description:
          "Day 1 of the event with attendees exhibiting their products",
      },
      {
        time: "20:30 – 00:30",
        title: "Networking Dinner",
        location: "",
        description: "Networking Dinner, and iGaming AFRIKA Awards ceremony",
      },
    ],
    2: [
      {
        time: "09:30 – 17:30",
        title: "Conference & Exhibition",
        location: "Sarit Expo Centre",
        description:
          "Day 2 of the event with attendees exhibiting their products",
      },
      {
        time: "22:00 – 02:30",
        title: "Closing Party",
        location: "",
        description: "iGaming AFRIKA Closing Party",
      },
    ],
    3: [
      {
        time: "5:00 - 15:00",
        title: "Safari Tour",
        location: "",
        description: "A safari tour to see the wildlife in Kenya.",
      },
      {
        time: "16:30 - 19:30",
        title: "Football Tournament",
        location: "",
        description:
          "A football tournament experience to officially close the event in style.",
      },
    ],
    4: [
      {
        time: "Any time",
        title: "Departure",
        location: "",
        description: "Guests leave at thier own pleasure.",
      },
    ],
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const scheduleItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Calculate the maximum number of sessions across all days
  const maxSessions = Math.max(
    ...Object.values(schedules).map((day) => day.length)
  );

  return (
    <div className="bg-gray-100 px-2 sm:px-4 md:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Section Header with animation */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Schedule
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Get a detailed view of the event's activities and when they will be
            happening
          </p>
        </motion.div>

        {/* Date Tabs with animation - Improved for small screens */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap sm:flex-nowrap border-b border-gray-200 overflow-x-auto hide-scrollbar"
        >
          {dates.map((item, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              className={`px-2 sm:px-4 py-2 text-center focus:outline-none flex-1 min-w-max sm:min-w-0 hover:cursor-pointer transition-colors duration-300 ${
                activeTab === index
                  ? "border-b-3 border-green-600 text-green-600 font-bold"
                  : "text-gray-500 hover:text-green-600"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="text-xs sm:text-sm md:text-md">{item.day}</div>
              <div className="text-xs sm:text-sm md:text-md">{item.date}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Schedule Content with animations */}
        <motion.div
          className="py-4 sm:py-6 transition-all duration-300 ease-in-out"
          style={{
            minHeight: `${maxSessions * 120 + 80}px`,
            height: "auto",
            overflow: "hidden",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {dates[activeTab].day}, {dates[activeTab].date} Schedule
          </motion.h2>

          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={activeTab}
          >
            {schedules[activeTab].length > 0 ? (
              schedules[activeTab].map((session, index) => (
                <motion.div
                  key={index}
                  variants={scheduleItem}
                  className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-4 md:gap-6">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0">
                      <p className="text-xs sm:text-sm font-semibold text-green-600">
                        {session.time}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-md mt-1">
                        {session.location}
                      </p>
                    </div>
                    <div className="w-full md:w-3/4">
                      <h3 className="text-sm sm:text-md font-bold mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">
                        {session.description}
                      </p>

                      {session.speaker && (
                        <motion.p
                          className="text-xs sm:text-sm text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="font-medium">Speaker:</span>{" "}
                          {session.speaker}
                        </motion.p>
                      )}

                      {session.speakers && (
                        <motion.div
                          className="mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-xs sm:text-sm text-gray-600 font-medium">
                            Speakers:
                          </p>
                          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 ml-1">
                            {session.speakers.map((speaker, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                              >
                                {speaker}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-gray-500 text-center py-6 sm:py-8"
                style={{
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No sessions scheduled for this day
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* Additional CSS for hiding scrollbars but enabling scroll functionality */
const style = document.createElement("style");
style.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;
document.head.appendChild(style);
