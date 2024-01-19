import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import img from "../../../images/sandwiches.jpg";
const TopicDetail = () => {
  const { label } = useParams();
  const [topicDetails, setTopicDetails] = useState({
    title: "Sandwiches",
    description:
      "Sandwiches are a popular and versatile food item that typically consists of one or more layers of bread with various fillings between them. The bread acts as a vessel to hold together the ingredients and provides a convenient way to consume a combination of flavors and textures. Sandwiches can be found in various cuisines around the world, and they come in countless variations, catering to different tastes and preferences.",
    history: `The sandwich has a long history and dates back to ancient times. Here are some key events in the history of the sandwich:

  Ancient Times:The emergence of the sandwich can be linked to the use of bread as a protective layer for food. In the centuries before the Common Era, Jewish people often used unleavened bread, called "matzah," to wrap meat and raw vegetables.
  Medieval Times:In medieval China, there are records of using bread to hold various foods such as meat and raw vegetables.
  During the Crusades (11th-13th centuries), European warriors returning from the Middle East brought Arab culinary styles, including the use of bread as a layer for food.
  The English and John Montagu (1718-1792):The most popular theory about the origin of the term "sandwich" comes from John Montagu, the 18th-century Earl of Sandwich. He was a gambling addict and would often stay at the card table all day. He requested that a meal be brought to him between two slices of bread so that he wouldn't have to leave the gaming table. This practice became popular and was called a "sandwich" after him.
  Development and Popularization:Over the centuries, the sandwich became an integral part of global cuisine. Various types of bread with different fillings and sauces were created.
  During the Industrial Revolution, industrial production of bread and food increased the popularity of the sandwich.
20th Century and Modern Times:With the development of restaurant chains and fast food, the sandwich became a convenient and tasty option for many people worldwide.
Varieties of sandwiches became increasingly diverse, from traditional sandwiches to large bread types such as subs, wraps, and burgers.
From the simple idea of using bread to hold food, the sandwich has become an icon of global cuisine, contributing to meeting the dietary needs of many people around the world.`,
    fills:`Proteins: Common proteins include meats (such as ham, turkey, chicken, or beef), seafood, eggs, or tofu for vegetarian options.
Cheese: Various types of cheese add flavor and texture to sandwiches.
Vegetables: Fresh vegetables like lettuce, tomatoes, cucumbers, onions, and sprouts are often used.
Condiments: Sauces, spreads, and condiments like mayonnaise, mustard, ketchup, and pesto enhance the taste.`,
    type:`Classic Sandwiches: Examples include the club sandwich, BLT (bacon, lettuce, and tomato), and ham and cheese sandwich.
Grilled or Toasted Sandwiches: Paninis, grilled cheese, and tuna melts fall into this category.
Subs and Hoagies: Longer sandwiches often filled with a variety of meats, cheeses, and vegetables.
Wrap or Burrito: Using tortillas instead of traditional bread.`,
    mainImage: `${img}`,
  });

 console.log(label)
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const dishType = "sandwiches"; // Replace with the desired dishType
        const appId = process.env.REACT_APP_APP_ID_RECIPE;
        const appKey = process.env.REACT_APP_APP_KEY_RECIPE;
        const response = await axios.get(
          `https://api.edamam.com/search?q=&dishType=${dishType}&app_id=${appId}&app_key=${appKey}`
        );

        // Assuming the API response has a hits array containing recipe details
        const recipes = response.data.hits.map((hit) => ({
          id: hit.recipe.uri,
          title: hit.recipe.label,
          image: hit.recipe.image,
        }));

        setRelatedRecipes(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%", height: "" }}
    >
      <Headers />
      <NavBar />
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        Sandwiches
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section with Main Image */}
        <Grid item xs={12} md={6}>
         <Card>
  <CardMedia
    component="img"
    alt={topicDetails.title}
    height="500"
    image={topicDetails.mainImage}
    sx={{
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Đường viền mờ
      borderRadius: "8px", // Cong tròn mép
    }}
  />
</Card>
        </Grid>

        {/* Right Section with Title and Description */}
        <Grid item xs={12} md={6} sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Box sx={{ marginLeft: "1rem", }}>
            <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
              Definition
            </Typography>
            <Typography variant="h6" >
              {topicDetails.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography
          variant="h5"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          History
        </Typography>

        <ul>
          {topicDetails.history.split("\n\n").map((paragraph, index) => (
            <li key={index}>
              <Typography variant="h6" component="div">
                {paragraph}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>

       <Box>
        <Typography
          variant="h5"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          Fillings
        </Typography>

        <ul>
          {topicDetails.fills.split("\n\n").map((paragraph, index) => (
            <li key={index}>
              <Typography variant="h6" component="div">
                {paragraph}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>


       <Box>
        <Typography
          variant="h5"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          Types of Sandwiches
        </Typography>

        <ul>
          {topicDetails.type.split("\n\n").map((paragraph, index) => (
            <li key={index}>
              <Typography variant="h6" component="div">
                {paragraph}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>

      {/* Related Recipes Section */}
      <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Related Recipes
      </Typography>
      <Grid container spacing={2}>
        {relatedRecipes.slice(0, 9).map((recipe)  => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id} sx={{height:"20 rem"}}>
            <Link
              to={`/recipes/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit",height:"20rem" }}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt={recipe.title}
                  height={140}
                  image={recipe.image}
                  sx={{objectFit:"cover"}}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{
                    overflow:"hidden",
                    textOverflow:"ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </motion.div>
  );
};

export default TopicDetail;
