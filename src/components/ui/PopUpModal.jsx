import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const SessionModal = ({ open, onClose, session }) => {
  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: 1200 },
    maxWidth: "1200px",
    maxHeight: "80vh",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
  };

  return (
    <Modal
      aria-labelledby="session-modal-title"
      aria-describedby="session-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      disableScrollLock
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          {session && (
            <>
              {/* Session Title */}
              <Typography
                id="session-modal-title"
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {session.title}
              </Typography>

              {/* Time and Location */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "green", fontWeight: "600", mb: 0.5 }}
                >
                  {session.time}
                </Typography>
                <Typography variant="body4" sx={{ color: "gray" }}>
                  {session.location}
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                id="session-modal-description"
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.4 }}
              >
                {session.description}
              </Typography>

              {/* Moderators Section */}
              {session.moderators && session.moderators.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "700",
                      mb: 2,
                      fontSize: "1.1rem",
                      color: "#92400e", // Amber-900 color
                    }}
                  >
                    {session.moderators.length > 1 ? "Moderators" : "Moderator"}
                  </Typography>
                  {session.moderators.map((moderator, i) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 3,
                        pb: i < session.moderators.length - 1 ? 3 : 0,
                        borderBottom:
                          i < session.moderators.length - 1
                            ? "2px solid #fbbf24" // Amber-400 border
                            : "none",
                        backgroundColor: "#fffbeb", // Amber-50 background
                        borderRadius: "8px",
                        p: 2,
                        border: "2px solid #fcd34d", // Amber-300 border
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        {moderator.image && (
                          <Box
                            component="img"
                            src={moderator.image}
                            alt={moderator.name}
                            sx={{
                              width: "120px",
                              height: "120px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "3px solid #f59e0b", // Amber-500 border
                              flexShrink: 0,
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "700", fontSize: "1.1rem" }}
                            >
                              {moderator.name}
                            </Typography>
                            <Chip
                              label="MODERATOR"
                              size="small"
                              sx={{
                                backgroundColor: "#f59e0b", // Amber-500
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "0.65rem",
                                height: "20px",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#92400e",
                              fontWeight: "600",
                              mb: 1.5,
                            }}
                          >
                            {moderator.role || ""}
                          </Typography>
                          {moderator.bio && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#78716c", // Stone-500
                                lineHeight: 1.6,
                                whiteSpace: "pre-line",
                              }}
                            >
                              {moderator.bio}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Single Speaker with Image */}
              {session.speaker && !session.speakersDetailed && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 1 }}
                  >
                    Speaker:
                  </Typography>

                  {session.speakerImage && (
                    <Box
                      component="img"
                      src={session.speakerImage}
                      alt={session.speaker}
                      sx={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        mb: 1,
                      }}
                    />
                  )}

                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "600", mb: 1, color: "green" }}
                  >
                    {session.speaker} - {session.speakerRole}
                  </Typography>

                  {session.speakerBio && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: "gray",
                        fontStyle: "italic",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {session.speakerBio}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Multiple Speakers with Detailed Info */}
              {session.speakersDetailed &&
                session.speakersDetailed.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "700", mb: 2, fontSize: "1.1rem" }}
                    >
                      {session.speakersDetailed.length > 1
                        ? "Speakers"
                        : "Speaker"}
                    </Typography>
                    {session.speakersDetailed.map((speaker, i) => (
                      <Box
                        key={i}
                        sx={{
                          mb: 3,
                          pb: i < session.speakersDetailed.length - 1 ? 3 : 0,
                          borderBottom:
                            i < session.speakersDetailed.length - 1
                              ? "1px solid #e0e0e0"
                              : "none",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          {speaker.image && (
                            <Box
                              component="img"
                              src={speaker.image}
                              alt={speaker.name}
                              sx={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid #22c55e", // Green-500 border
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: "700",
                                mb: 0.5,
                                fontSize: "1.05rem",
                              }}
                            >
                              {speaker.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "green",
                                fontWeight: "600",
                                mb: 1.5,
                              }}
                            >
                              {speaker.role || ""}
                            </Typography>
                            {speaker.bio && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "gray",
                                  lineHeight: 1.6,
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {speaker.bio}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

              {/* Multiple Speakers (Simple List - for backward compatibility) */}
              {session.speakers && !session.speakersDetailed && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 1 }}
                  >
                    Speakers:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {session.speakers.map((speaker, i) => (
                      <Typography
                        component="li"
                        key={i}
                        variant="body1"
                        sx={{ mb: 0.5 }}
                      >
                        {speaker}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Close Button */}
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Close
                </button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SessionModal;
