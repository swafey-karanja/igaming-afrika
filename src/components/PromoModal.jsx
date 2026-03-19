import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BaseModal from "./ui/PopUpModal";
import { XIcon } from "lucide-react";
import { CountdownBanner } from "./ui/CountdownBanner";

/**
 * PromoModalV2 — iGaming Afrika Summit promotional pop-up.
 *
 * Changes from V1:
 *  - Africa pattern as full modal background image
 *  - Logo image at the top (IGA-LIONBETS-Logo.png)
 *  - Skyline image replaces the green footer bar
 *  - Wider modal so all 5 stat boxes sit in one row
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
        borderRadius: "5px",
        width: { xs: "95%", sm: "680px", md: "760px" },
        /* Africa pattern covers the entire modal background */
        backgroundImage: "url('/africa-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        /* Subtle white wash so text stays readable over the pattern */
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
      <Box
        component="button"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          width: 32,
          height: 32,
          borderRadius: "30%",
          border: "none",
          //   backgroundColor: "rgba(0,0,0,0.15)",
          color: "#111",
          fontSize: "1.8rem",
          lineHeight: 1,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.3)",
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
          px: { xs: 3, sm: 5, md: 6 },
          pt: 6,
          pb: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: "900",
            color: "#16a34a",
            fontSize: { xs: "1.8rem" },
            lineHeight: 1.12,
            mb: 1.0,
          }}
        >
          iGaming AFRIKA Summit
        </Typography>

        {/* Date & Location */}
        <Typography
          variant="body2"
          sx={{
            color: "#16a34a",
            fontWeight: "800",
            fontSize: "0.98rem",
            // letterSpacing: "0.09em",
            textTransform: "uppercase",
            mb: 5.5,
          }}
        >
          Nairobi, Kenya &nbsp;|&nbsp; 4–6 May 2026
        </Typography>

        {/* Hero headline */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "900",
            color: "#16a34a",
            lineHeight: 1.12,
            mb: 4.5,
          }}
        >
          <Box
            component="span"
            sx={{ fontSize: { xs: "2.2rem", sm: "3.8rem" }, display: "block" }}
          >
            Registration
          </Box>
          <Box
            component="span"
            sx={{ fontSize: { xs: "1.6rem", sm: "2.0rem" }, display: "block" }}
          >
            is Now Open
          </Box>
        </Typography>

        {/* Stats row — all 5 in one line on md+ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: { xs: 1, sm: 1.5 },
            mb: 3.5,
          }}
        >
          {STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                border: "1.5px solid #16a34a",
                borderRadius: "8px",
                px: { xs: 1.5, sm: 2 },
                py: 2.3,
                minWidth: { xs: "72px", sm: "100px" },
                flex: { sm: 1 },
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize: { xs: "1rem", sm: "1.6rem" },
                  color: "#16a34a",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.80rem",
                  color: "#16a34a",
                  fontWeight: "600",
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

        <CountdownBanner />

        {/* CTA Button */}
        <Box sx={{ mb: 3, mt: 2 }}>
          <button
            onClick={() => {
              onClose();
              document
                .getElementById("eventTickets")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              width: "100%",
              padding: "14px 24px",
              backgroundColor: "#16a34a",
              color: "#ffffff",
              fontWeight: "700",
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

      <Box
        component="img"
        src="/IGA-LIONBETS-Logo.png"
        alt="iGaming Afrika Summit — Powered by LionBets"
        sx={{
          height: { xs: "48px", sm: "120px" },
          width: "auto",
          objectFit: "contain",
          display: "block",
          mx: "auto",
          mb: 2,
        }}
      />

      {/* ── Skyline footer image ── */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "100px", sm: "130px" },
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
