import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";
import React from "react";

function Headers() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
        mb: 2,
        borderBottom: "1px solid #ccc",
      }}>
      {/* Drawer */}
      <Box sx={{ display: "flex" }}>
        <Link to={"/about"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/login"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>Login</Box>
        </Link>
      </Box>

      {/* Accordion */}
      <Box sx={{ display: "flex" }}>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaFacebook />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaInstagramSquare />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaPinterest />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <AiFillTwitterCircle />
          </Box>
        </Link>
        <Link>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <SiYoutubemusic />
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default Headers;
