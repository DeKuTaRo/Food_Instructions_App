import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
// import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginClient from "./Client/Login";
import ForgotPassword from "./Client/ForgotPassword";

// Admin
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import UserAccount from "./Admin/pages/UserAccount/UserAccount";
import Ingredient from "./Admin/pages/Ingredient/Ingredient";
import ANutrition from "./Admin/pages/Nutrition/Nutrition";
import Food from "./Admin/pages/Food/Food";
import Recipe from "./Admin/pages/Recipe/Recipe";

// Client
import Nutrition from "./Client/Nutrition";
function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        {/* <Route path="/recipe/:name" element={<Recipe />} /> */}

        {/* Client page */}
        <Route path="/login-plus" element={<LoginClient />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/nutrition-facts" element={<Nutrition />} />

        {/* Admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/a-nutrition" element={<ANutrition />} />
        <Route path="/a-food" element={<Food />} />
        <Route path="/a-recipe" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
