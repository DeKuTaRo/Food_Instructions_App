import Veggie from "../../../components/Client/Veggie";
import Popular from "../../../components/Client/Popular";

import Topics from "../../../components/Client/Topics";

import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import FoodTypes from "../../../components/Client/TypeOfFood"
import Footer from "../../../components/Client/Footer";
import React from "react";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

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
      <FoodTypes/>
      <Topics />
      <Chatbot />
      <Footer />  
    </motion.div>
  );
}

export default Home;
