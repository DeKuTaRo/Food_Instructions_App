import React from "react";
// import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Admin
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import UserAccount from "./Admin/pages/UserAccount/UserAccount";
import Ingredient from "./Admin/pages/Ingredient/Ingredient";
import ANutrition from "./Admin/pages/Nutrition/Nutrition";
import Food from "./Admin/pages/Food/Food";
import ARecipe from "./Admin/pages/Recipe/Recipe";
import ARecipeDetail from "./Admin/pages/Recipe/RecipeDetail";
import ATopic from "./Admin/pages/Topic/Topic";
import ATopicForm from "./Admin/pages/Topic/TopicForm";
// Client
import Home from "./Client/Home/Home";
import SignUp from "./Client/SignUp/SignUp";
import Nutrition from "./Client/Nutrition";
import LoginClient from "./Client/Login/Login";
import ForgotPassword from "./Client/ForgotPassword/ForgotPassword";
import RecipeDetail from "./Client/RecipeDetail/RecipeDetail";
import Searched from "./Client/Searched/Searched";
import Profile from "./Client/Profile/Profile";
import Cuisine from "./Client/Cuisine";
import Wishlist from "./Client/Wishlist/Wishlist";
import About from "./Client/About/About";
import Contact from "./Client/Contact/Contact";
import TopicDetail from "./Client/TopicDetail/TopicDetail";
import Cart from "./Client/Cart/Cart";
//Order
import Order from "../pages/Client/Order/Order";
import History from "../pages/Client/Order/History";


import NotFound from "./NotFound";
import NotPermission from "./NotPermission";
function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/cuisine/:type" element={<Cuisine />} />
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/history" element={<History />} />
        <Route path="/topic/:label" element={<TopicDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/a-nutrition" element={<ANutrition />} />
        <Route path="/a-food" element={<Food />} />
        <Route path="/a-recipe" element={<ARecipe />} />
        <Route path="/a-recipe/details/:label" element={<ARecipeDetail />} />
        <Route path="/a-topic" element={<ATopic />} />
        <Route path="/a-topic/topics/:id" element={<ATopicForm />} />

 
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
