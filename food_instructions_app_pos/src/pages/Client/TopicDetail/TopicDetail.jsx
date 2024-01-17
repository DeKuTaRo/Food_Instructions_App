import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";

import { motion } from "framer-motion";
const TopicDetail = () => {
  // Assuming you have details for the main topic
  const topicDetails = {
    title: "Delicious Breakfast Ideas",
    description: "Explore a variety of breakfast recipes to kickstart your day.",
    mainImage: "https://example.com/main-image.jpg",
  };

  // Assuming you have an array of related recipes
  const relatedRecipes = [
    {
      id: 1,
      title: "Classic Pancakes",
      image: "https://example.com/pancakes.jpg",
    },
    {
      id: 2,
      title: "Avocado Toast",
      image: "https://example.com/avocado-toast.jpg",
    },
    // Add more recipes as needed
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%", height: "" }}>
      <Headers />
      <NavBar />
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {topicDetails.title}
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section with Main Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={topicDetails.title}
              height="300"
              image={topicDetails.mainImage}
            />
          </Card>
        </Grid>

        {/* Right Section with Title and Description */}
        <Grid item xs={12} md={6}>
          <Box sx={{ marginLeft: "1rem" }}>
            <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
              {topicDetails.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {topicDetails.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Related Recipes Section */}
      <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Related Recipes
      </Typography>
      <Grid container spacing={2}>
        {relatedRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Card>
                <CardMedia component="img" alt={recipe.title} height="140" image={recipe.image} />
                <CardContent>
                  <Typography variant="h6" component="div">
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
