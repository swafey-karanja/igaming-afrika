import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

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
                sx={{ mb: 1, lineHeight: 1.4 }}
              >
                {session.description}
              </Typography>

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
                        whiteSpace: "pre-line", // This preserves line breaks from the bio text
                      }}
                    >
                      {session.speakerBio}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Multiple Speakers with Detailed Info */}
              {session.speakersDetailed && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 2 }}
                  >
                    Speakers:
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
                      {speaker.image && (
                        <Box
                          component="img"
                          src={speaker.image}
                          alt={speaker.name}
                          sx={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            mb: 1.5,
                          }}
                        />
                      )}
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "600", mb: 0.5 }}
                      >
                        {speaker.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "green", fontWeight: "500", mb: 1.5 }}
                      >
                        {speaker.role}
                      </Typography>
                      {speaker.bio && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "gray",
                            lineHeight: 1.6,
                            whiteSpace: "pre-line", // This preserves line breaks from the bio text
                          }}
                        >
                          {speaker.bio}
                        </Typography>
                      )}
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
