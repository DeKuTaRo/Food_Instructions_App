import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import Topics from "../../../components/Client/Topics";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

import inforTopic from "./TopicData";

const TopicDetail = () => {
  const { label } = useParams();

  const topicDetails = inforTopic[label];

  const [relatedRecipes, setRelatedRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const dishType = label; // Replace with the desired dishType
        const appId = process.env.REACT_APP_APP_ID_RECIPE;
        const appKey = process.env.REACT_APP_APP_KEY_RECIPE;
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&dishType=${dishType}`
        );

        // Assuming the API response has a hits array containing recipe details

        const recipes = response.data.hits.map((hit) => ({
          id: hit.recipe.uri,
          title: hit.recipe.label,
          image: hit.recipe.image,
          link: hit._links.self.href,
        }));

        setRelatedRecipes(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const [detailsTopic, setDetailsTopic] = useState({ topics: [] });
  const getTopicDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/getDetailTopic`, {
        params: {
          label: label.toLowerCase(),
        },
      });
      if (response.data.topics) {
        setDetailsTopic(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopicDetails();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%", height: "" }}>
      <Headers />
      <NavBar />
      <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
        {/* {topicDetails.title} */}
        {detailsTopic.topics.title ? detailsTopic.topics.title : topicDetails.title}
      </Typography>
      <Grid container spacing={2}>
        {/* Left Section with Main Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              // alt={topicDetails.title}
              alt={detailsTopic.topics.title ? detailsTopic.topics.title : topicDetails.title}
              height="500"
              // image={topicDetails.mainImage}
              image={
                detailsTopic.topics.mainImage
                  ? `${process.env.REACT_APP_URL_TOPIC_SERVICE}/${detailsTopic.topics.mainImage}`
                  : topicDetails.mainImage
              }
              sx={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Đường viền mờ
                borderRadius: "8px", // Cong tròn mép
              }}
            />
          </Card>
        </Grid>

        {/* Right Section with Title and Description */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ marginLeft: "1rem" }}>
            <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
              Definition
            </Typography>
            <Typography variant="h6">
              {/* {topicDetails.description} */}
              {detailsTopic.topics.description ? detailsTopic.topics.description : topicDetails.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          History
        </Typography>
        {detailsTopic.topics.history ? (
          detailsTopic.topics.history
        ) : (
          <ul>
            {topicDetails.history.split("\n\n").map((paragraph, index) => (
              <li key={index}>
                <Typography variant="h6" component="div">
                  {paragraph}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box>
        <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Fillings
        </Typography>
        {detailsTopic.topics.fills ? (
          detailsTopic.topics.fills
        ) : (
          <ul>
            {topicDetails.fills.split("\n\n").map((paragraph, index) => (
              <li key={index}>
                <Typography variant="h6" component="div">
                  {paragraph}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box>
        <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Types of Sandwiches
        </Typography>
        {detailsTopic.topics.type ? (
          detailsTopic.topics.type
        ) : (
          <ul>
            {topicDetails.type.split("\n\n").map((paragraph, index) => (
              <li key={index}>
                <Typography variant="h6" component="div">
                  {paragraph}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </Box>

      {/* Related Recipes Section */}
      <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Related Recipes
      </Typography>
      <Grid container spacing={2}>
        {relatedRecipes.slice(0, 8).map((recipe) => (
          <Grid item xs={12} sm={6} md={3} key={recipe.id} sx={{ height: "20 rem" }}>
            <Link
              to={`/recipe/${encodeURIComponent(recipe.link)}`}
              style={{ textDecoration: "none", color: "inherit", height: "20rem" }}>
              <Card sx={{ display: "flex", flexDirection: "column", height: "24rem", width: "18rem" }}>
                <CardMedia component="img" alt={recipe.title} image={recipe.image} sx={{ objectFit: "cover" }} />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
      <Topics />
      <Chatbot />
      <Footer />
    </motion.div>
  );
};

export default TopicDetail;
