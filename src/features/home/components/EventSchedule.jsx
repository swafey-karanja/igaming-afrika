import { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CalendarDropdown } from "../../../lib/utils";
import { dates, schedules } from "../../../data/data";
import Header from "../../../components/ui/Header";
import SessionModal from "../../../components/ui/PopUpModal";

// ─── Helper ──────────────────────────────────────────────────────────────────
/**
 * Returns all speakers from the API whose `events` array contains a title that
 * matches the given session title (case-insensitive, whitespace-normalised).
 */
const getSpeakersForSession = (sessionTitle, speakers = []) => {
  if (!sessionTitle || !speakers.length) return [];

  const normalise = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, " ") ?? "";
  const needle = normalise(sessionTitle);

  return speakers.filter((speaker) =>
    speaker.events?.some((eventTitle) => normalise(eventTitle) === needle),
  );
};

/**
 * Merges dynamic API speakers with any hardcoded speakersDetailed already on
 * the session. Dynamic speakers are de-duped by name so they don't appear twice
 * if the same speaker happens to be hardcoded as well.
 *
 * Also handles moderator matching based on session.moderatorNames array.
 */
const mergeSessionSpeakers = (session, apiSpeakers) => {
  const dynamic = getSpeakersForSession(session.title, apiSpeakers);

  const hardcoded = session.speakersDetailed ?? [];
  const hardcodedNames = new Set(
    hardcoded.map((s) => s.name?.toLowerCase().trim()),
  );

  // Get moderator names from session data
  const moderatorNames = new Set(
    (session.moderatorNames ?? []).map((name) => name?.toLowerCase().trim()),
  );

  // Separate moderators from regular speakers
  const moderators = [];
  const regularSpeakers = [...hardcoded];

  dynamic.forEach((speaker) => {
    const speakerName = speaker.name?.toLowerCase().trim();

    // Skip if already in hardcoded speakers
    if (hardcodedNames.has(speakerName)) return;

    // Build role string, handling null/empty values
    let roleString = "";
    if (speaker.role && speaker.company) {
      roleString = `${speaker.role}, ${speaker.company}`;
    } else if (speaker.role) {
      roleString = speaker.role;
    } else if (speaker.company) {
      roleString = speaker.company;
    }

    const speakerData = {
      name: speaker.name,
      role: roleString,
      image: speaker.image,
      bio: speaker.bio,
    };

    // Check if this speaker is designated as a moderator
    if (moderatorNames.has(speakerName)) {
      moderators.push(speakerData);
    } else {
      regularSpeakers.push(speakerData);
    }
  });

  return {
    ...session,
    moderators,
    speakersDetailed: regularSpeakers,
  };
};
// ─────────────────────────────────────────────────────────────────────────────

const EventSchedule = ({ speakers = [] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Pre-compute enriched schedules so matching only runs when speakers or
  // schedules change, not on every render.
  const enrichedSchedules = useMemo(() => {
    const result = {};
    Object.entries(schedules).forEach(([day, sessions]) => {
      result[day] = sessions.map((session) =>
        mergeSessionSpeakers(session, speakers),
      );
    });
    return result;
  }, [speakers]);

  const handleSessionClick = (session) => {
    setModalOpen(true);
    setTimeout(() => {
      setSelectedSession(session);
    }, 10);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedSession(null);
    }, 300);
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

  const currentDaySessions = enrichedSchedules[activeTab] ?? [];

  return (
    <section
      id="schedule"
      className="container mx-auto py-8 scroll-mt-60 px-2 lg:px-6"
    >
      <Header
        title="Event Schedule"
        subtitle="Stay updated with the latest schedule for the iGaming Afrika Summit 2026."
      />

      {/* Date Tabs with animation */}
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
        className="py-4 sm:py-6 px-5"
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
          {currentDaySessions.length > 0 ? (
            (() => {
              // Group sessions by time slot
              const groupedSessions = {};
              currentDaySessions.forEach((session) => {
                if (!groupedSessions[session.time]) {
                  groupedSessions[session.time] = [];
                }
                groupedSessions[session.time].push(session);
              });

              return Object.entries(groupedSessions).map(
                ([time, sessions], groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    {/* Time indicator - shown once per time slot */}
                    <div className="text-xs sm:text-sm font-semibold text-green-600 px-2">
                      {time}
                    </div>

                    {/* Sessions grid - side by side if multiple sessions at same time */}
                    <div
                      className={`grid ${sessions.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}
                    >
                      {sessions.map((session, sessionIndex) => (
                        <motion.div
                          key={sessionIndex}
                          variants={scheduleItem}
                          className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
                          onClick={() => handleSessionClick(session)}
                        >
                          <div className="flex flex-col gap-3">
                            {/* Location */}
                            <p className="text-green-400 text-xs sm:text-[13px] font-semibold">
                              {session.location}
                            </p>

                            {/* Title */}
                            <h3 className="text-sm sm:text-lg font-bold uppercase">
                              {session.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 text-xs sm:text-sm line-clamp-2">
                              {session.description}
                            </p>

                            {/* Moderators — shown separately with distinct styling */}
                            {session.moderators?.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-2"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Moderator
                                    {session.moderators.length > 1 ? "s" : ""}:
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {session.moderators.map((moderator, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5"
                                    >
                                      {moderator.image && (
                                        <img
                                          src={moderator.image}
                                          alt={moderator.name}
                                          className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
                                          onError={(e) => {
                                            e.target.style.display = "none";
                                          }}
                                        />
                                      )}
                                      <span className="text-md font-medium text-amber-900">
                                        {moderator.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {/* Regular Speakers — shown when present */}
                            {session.speakersDetailed?.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-2"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Speaker
                                    {session.speakersDetailed.length > 1
                                      ? "s"
                                      : ""}
                                    :
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 justify-items-start gap-2">
                                  {session.speakersDetailed.map(
                                    (speaker, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-1 w-fit"
                                      >
                                        {speaker.image && (
                                          <img
                                            src={speaker.image}
                                            alt={speaker.name}
                                            className="w-12 h-12 rounded-full object-cover border border-green-300"
                                            onError={(e) => {
                                              e.target.style.display = "none";
                                            }}
                                          />
                                        )}
                                        <span className="text-md font-medium text-green-600">
                                          {speaker.name}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ),
              );
            })()
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

      <div className="flex gap-6 mb-2 sm:mb-3 lg:mb-4">
        <div className="">
          <CalendarDropdown iconSize="md" showText={true} />
        </div>
      </div>

      {/* Session Modal - Imported as Child Component */}
      <SessionModal
        open={modalOpen}
        onClose={handleModalClose}
        session={selectedSession}
      />
    </section>
  );
};

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
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

export default EventSchedule;
