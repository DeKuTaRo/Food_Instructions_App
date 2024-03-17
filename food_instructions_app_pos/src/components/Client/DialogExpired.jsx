import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchengin,
  faFacebookSquare,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { RxAvatar } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import { Link, Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import AvatarDefault from "../../images/avatar.png";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

function DialogExpired({ onClose, open }) {
  
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Account is expired
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>Please log in again to use features.</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogExpired;
