import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { Grid, Breadcrumbs, Box, Paper, Link } from "@mui/material";

import { styled } from "@mui/material/styles";

import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import withAuthorization from "../../utils/auth";

import NameWithImage from "./NameWithImage";
import Ingredients from "./Ingredients";
import Cuisine from "./Cuisine";
import Meal from "./Meal";
import HealthLabel from "./HealthLabel";
import InstructionLines from "./InstructionLines";
import Comments from "./Comments";
import VideoTutorial from "./VideoTutorial";
import NutritionFacts from "./NutritionFacts";

const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ARecipeDetail() {
  const { label } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [videoId, setVideoId] = useState("");

  const [totalNutrients, setTotalNutrientations] = useState({});
  const [totalDaily, setTotalDaily] = useState({});
  const [rating, setRating] = useState([false, false, false, false, false]);
  const username = localStorage.getItem("username");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const i = 1;
  const handleStarHover = (index) => {
    const newRating = [...rating];
    for (let i = 0; i <= index; i++) {
      newRating[i] = true;
    }
    for (let i = index + 1; i < newRating.length; i++) {
      newRating[i] = false;
    }
    setRating(newRating);
  };

  const handleStarClick = (index) => {
    // Toggle the active state of the clicked star
    const newRating = [...rating];
    newRating[index] = !newRating[index];
    setRating(newRating);
  };

  useEffect(() => {
    // let isMounted = true;
    const fetchRecipeDetails = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${label}`, {
          params: {
            type: "public",
            app_id: `${process.env.REACT_APP_APP_ID_RECIPE}`,
            app_key: `${process.env.REACT_APP_APP_KEY_RECIPE}`,
          },
        });
        setRecipeDetail(response.data);
        setRecipeName(response.data.recipe.label);
        setRecipeImage(response.data.recipe.image);

        setTotalNutrientations(response.data.recipe.totalNutrients);
        setTotalDaily(response.data.recipe.totalDaily);
        const query = `How to cook ${response.data.recipe.label}`;

        const api =
          process.env.REACT_APP_YOUTUBE_VIDEO_URL +
          "?key=" +
          process.env.REACT_APP_KEY_ID_YOUTUBE +
          "&q=" +
          query +
          "&type=video&maxResults=1";
        const videoSearchResponse = await axios.get(api);
        const firstVideoId = videoSearchResponse.data.items[0].id.videoId;

        setVideoId(firstVideoId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, []);

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <HeaderWithSidebar title="Recipe Detail" />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,

              overflow: "scroll",
              display: "flex",
              justifyContent: "center",
              marginTop: "68px",
            }}>
            <div style={{ textAlign: "center", width: "100vw", padding: "16px 60px" }}>
              {loading ? (
                <Typography variant="h6">Fetching Recipe Details...</Typography>
              ) : (
                <>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    <Breadcrumbs aria-label="breadcrumb">
                      <Link underline="none" color="inherit" href="/a-recipe">
                        Recipe
                      </Link>
                      <Typography color="text.primary">{recipeName}</Typography>
                    </Breadcrumbs>
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                          <NameWithImage recipeName={recipeName} recipeImage={recipeImage} />
                        </Grid>

                        <Grid
                          item
                          md={6}
                          xs={12}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "left",
                          }}>
                          <Ingredients ingredientLines={recipeDetail.recipe.ingredientLines} />
                        </Grid>
                      </Grid>

                      <Box sx={{ margin: "2rem auto " }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Cuisine cuisineType={recipeDetail.recipe.cuisineType} />
                          </Grid>

                          <Grid item xs={6}>
                            <Meal mealType={recipeDetail.recipe.mealType} />
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ marginTop: "2rem", textAlign: "left" }}>
                        <HealthLabel healthLabels={recipeDetail.recipe.healthLabels} />
                      </Box>

                      <Box sx={{ textAlign: "left", marginTop: "2rem" }}>
                        <InstructionLines
                          recipeName={recipeName}
                          ingredientLines={recipeDetail.recipe.ingredientLines}
                          url={recipeDetail.recipe.url}
                        />
                      </Box>

                      {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "0.2 rem",
                          alignItems: "start",
                          justifyContent: "center",
                        }}>
                        <VideoTutorial videoId={videoId} />
                      </Box> */}

                      <Box sx={{ marginTop: "2rem" }}>
                        <Comments
                          recipeName={recipeName}
                          recipeImage={recipeImage}
                          label={label}
                          username={username}
                          tokenAdmin={tokenAdmin}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={4}>
                      <NutritionFacts
                        ingredients={recipeDetail.recipe.ingredients}
                        calories={recipeDetail.recipe.calories}
                        totalNutrients={totalNutrients}
                        totalDaily={totalDaily}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </motion.div>
  );
}

export default withAuthorization(ARecipeDetail);
