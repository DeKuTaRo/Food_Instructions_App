import Veggie from "../../components/Veggie";
import Popular from "../../components/Popular";
import { motion } from "framer-motion";
import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";

import React from "react";

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
    </motion.div>
  );
}

export default Home;
