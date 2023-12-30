import React from "react";
// import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NotPermission from "./NotPermission";

// Admin
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import UserAccount from "./Admin/pages/UserAccount/UserAccount";
import Ingredient from "./Admin/pages/Ingredient/Ingredient";
import ANutrition from "./Admin/pages/Nutrition/Nutrition";
import Food from "./Admin/pages/Food/Food";
import ARecipe from "./Admin/pages/Recipe/Recipe";
import ARecipeDetail from "./Admin/pages/Recipe/RecipeDetail";
// Client
import Home from "./Client/Home";
import SignUp from "./Client/SignUp";
import Nutrition from "./Client/Nutrition";
import LoginClient from "./Client/Login";
import ForgotPassword from "./Client/ForgotPassword";
import RecipeDetail from "./Client/RecipeDetail";
import Searched from "./Client/Searched";
import Profile from "./Client/Profile";
import Cuisine from "./Client/Cuisine";
import Wishlist from "./Client/Wishlist";
import NotFound from "./NotFound";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/searched/" element={<Searched />} />
        {/* <Route path="/recipe/:name" element={<Recipe />} /> */}

        <Route path="*" element={<NotFound />} />
        <Route path="/not_permission" element={<NotPermission />} />

        {/* Client page */}
        <Route path="/" element={<Home />} />
        <Route path="/login-plus" element={<LoginClient />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/nutrition-facts" element={<Nutrition />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recipe/:label" element={<RecipeDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/a-nutrition" element={<ANutrition />} />
        <Route path="/a-food" element={<Food />} />
        <Route path="/a-recipe" element={<ARecipe />} />
        <Route path="/a-recipe/details/:url" element={<ARecipeDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
