import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BaseModal from "./ui/PopUpModal";
import { CountdownBanner } from "./ui/CountdownBanner";

/**
 * PromoModal — iGaming Afrika Summit promotional pop-up.
 *
 * Fully responsive across:
 *   xs  — phones (< 600px)
 *   sm  — large phones / small tablets (600–899px)
 *   md  — tablets / small laptops (900–1199px)
 *   lg  — desktops (1200px+)
 */

const STATS = [
  { value: "3500", label: "Delegates" },
  { value: "100+", label: "Speakers" },
  { value: "350", label: "Affiliates" },
  { value: "500+", label: "Operators" },
  { value: "100+", label: "Exhibitors" },
];

const PromoModal = ({ open, onClose }) => {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      maxWidth="780px"
      sx={{
        p: 0,
        overflow: "hidden",
        borderRadius: { xs: "8px", sm: "10px", md: "12px" },
        width: { xs: "95%", sm: "92%", md: "760px", lg: "780px" },
        backgroundImage: "url('/africa-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.82)",
          zIndex: 0,
        },
        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      {/* ── Close button ── */}
      <Box
        component="button"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: { xs: 8, sm: 12 },
          right: { xs: 8, sm: 12 },
          zIndex: 10,
          width: { xs: 28, sm: 32 },
          height: { xs: 28, sm: 32 },
          borderRadius: "30%",
          border: "none",
          backgroundColor: "transparent",
          color: "#111",
          fontSize: { xs: "1.4rem", sm: "1.8rem" },
          lineHeight: 1,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.12)",
          },
        }}
        aria-label="Close"
      >
        ✕
      </Box>

      {/* ── Main content ── */}
      <Box
        sx={{
          textAlign: "center",
          px: { xs: 2.5, sm: 4, md: 6 },
          pt: { xs: 4, sm: 5, md: 6 },
          pb: 0,
        }}
      >
        {/* Event name */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 900,
            color: "#16a34a",
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
            lineHeight: 1.15,
            mb: { xs: 0.5, sm: 0.8, md: 1 },
          }}
        >
          iGaming AFRIKA Summit
        </Typography>

        {/* Date & Location */}
        <Typography
          variant="body2"
          sx={{
            color: "#16a34a",
            fontWeight: 800,
            fontSize: { xs: "0.72rem", sm: "0.85rem", md: "0.98rem" },
            textTransform: "uppercase",
            mb: { xs: 2.5, sm: 4, md: 5.5 },
          }}
        >
          Nairobi, Kenya &nbsp;|&nbsp; 4–6 May 2026
        </Typography>

        {/* Hero headline */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 900,
            color: "#16a34a",
            lineHeight: 1.12,
            mb: { xs: 2.5, sm: 3.5, md: 4.5 },
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: { xs: "1.9rem", sm: "2.8rem", md: "3.8rem" },
              display: "block",
            }}
          >
            Registration
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.6rem", md: "2.0rem" },
              display: "block",
            }}
          >
            is Now Open
          </Box>
        </Typography>

        {/* Stats row — wraps on xs (2–3 per row), single row from sm up */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: { xs: 0.8, sm: 1, md: 1.5 },
            mb: { xs: 2, sm: 3, md: 3.5 },
          }}
        >
          {STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                border: "1.5px solid #16a34a",
                borderRadius: { xs: "6px", sm: "8px" },
                px: { xs: 1, sm: 1.5, md: 2 },
                py: { xs: 1.2, sm: 1.8, md: 2.3 },
                width: { xs: "calc(33% - 8px)", sm: "auto" },
                flex: { sm: 1 },
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.6rem" },
                  color: "#16a34a",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.62rem", sm: "0.70rem", md: "0.80rem" },
                  color: "#16a34a",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  mt: 0.3,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Countdown */}
        <CountdownBanner />

        {/* CTA Button */}
        <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 }, mt: { xs: 1.5, sm: 2 } }}>
          <button
            onClick={() => {
              onClose();
              document
                .getElementById("eventTickets")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              width: "100%",
              padding: "12px 24px",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
          >
            Register Now
          </button>
        </Box>
      </Box>

      {/* ── Logo ── */}
      <Box
        component="img"
        src="/IGA-LIONBETS-Logo.png"
        alt="iGaming Afrika Summit — Powered by LionBets"
        sx={{
          height: { xs: "40px", sm: "70px", md: "100px" },
          width: "auto",
          objectFit: "contain",
          display: "block",
          mx: "auto",
          mb: { xs: 1, sm: 1.5, md: 2 },
        }}
      />

      {/* ── Skyline footer ── */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "70px", sm: "100px", md: "130px" },
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <Box
          component="img"
          src="/skyline-for-website.png"
          alt="City skyline"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center bottom",
            display: "block",
          }}
        />
      </Box>
    </BaseModal>
  );
};

export default PromoModal;
