import Veggie from "../../components/Client/Veggie";
import Popular from "../../components/Client/Popular";

import Topics from "../../components/Client/Topics";

import { motion } from "framer-motion";
import Headers from "../../components/Client/Headers";
import NavBar from "../../components/Client/Navbar";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />
      <Veggie />
      <Popular />
      <Topics />
    </motion.div>
  );
}

export default Home;
