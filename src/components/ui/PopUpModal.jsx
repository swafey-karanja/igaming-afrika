import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

/**
 * BaseModal — a generic, reusable modal shell.
 *
 * Props:
 *  - open        {boolean}   Whether the modal is visible.
 *  - onClose     {function}  Called when the modal requests to close.
 *  - children    {node}      Content rendered inside the modal box.
 *  - maxWidth    {string}    CSS max-width of the modal box. Default: "1200px".
 *  - sx          {object}    Extra MUI sx overrides merged into the modal box.
 */
const BaseModal = ({
  open,
  onClose,
  children,
  maxWidth = "1200px",
  sx = {},
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: 1200 },
    maxWidth,
    maxHeight: "80vh",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
    ...sx,
  };

  return (
    <Modal
      aria-labelledby="base-modal-title"
      aria-describedby="base-modal-description"
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
        <Box sx={modalStyle}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
