import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";

import {
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Link,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";

import NameWithImage from "./NameWithImage";
import Ingredients from "./Ingredients";
import Cuisine from "./Cuisine";
import Meal from "./Meal";
import HealthLabel from "./HealthLabel";
import InstructionLines from "./InstructionLines";
import Comments from "./Comments";
import VideoTutorial from "./VideoTutorial";
import NutritionFacts from "./NutritionFacts";

function RecipeDetail() {
  const { label } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalNutrients, setTotalNutrientations] = useState({});
  const [totalDaily, setTotalDaily] = useState({});
  //modal
  const [open, setOpen] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");
  const token = localStorage.getItem("token");

  const handleClose = () => {
    setOpen(false);
  };

  const handleIncrease = () => {
    setNumberOfPeople((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople((prev) => prev - 1);
    }
  };
  const handleBuyIngredients = () => {
    if (isLogin !== "true") {
      toast.error("Bạn phải đăng nhập mới sử dụng được tính năng này", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const orderData = {
        recipeName,
        recipeImage,
        ingredientLines: recipeDetail.recipe.ingredientLines,
        numberOfPeople,
        calories: recipeDetail.recipe.calories,
        token: token,
        link: label,
      };
      // Navigate to the order page with the orderData as state
      navigate("/order", { state: { orderData } });
    }
  };

  const [videoId, setVideoId] = useState("");
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${label}`);
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

  const handleCheckLoginStatus = () => {
    if (isLogin !== "true") {
      toast.error("Bạn phải đăng nhập mới sử dụng được tính năng này", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleAddRecipeToWishlist = async () => {
    handleCheckLoginStatus();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/addToWishList`,
        {
          nameRecipe: recipeName,
          imageRecipe: recipeImage,
          linkRecipe: label,
          check: false,
          totalAmount: recipeDetail.recipe.calories,
          quantity: 1,
          ingredientLines: recipeDetail.recipe.ingredientLines,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (response.data.statusCode === 500) {
        toast.error(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleAddRecipeToCart = async () => {
    handleCheckLoginStatus();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/addToCart`,
        {
          nameRecipe: recipeName,
          imageRecipe: recipeImage,
          linkRecipe: label,
          check: false,
          totalAmount: recipeDetail.recipe.calories,
          quantity: 1,
          ingredientLines: recipeDetail.recipe.ingredientLines,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (response.data.statusCode === 500) {
        toast.error(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />

      <div style={{ textAlign: "center" }}>
        {loading ? (
          <Typography variant="h6">Fetching Recipe Details...</Typography>
        ) : (
          <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/searched">
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

                <Box sx={{ margin: "2rem auto " }}>
                  <Button variant="outlined" onClick={handleBuyIngredients}>
                    Buy
                  </Button>
                  <Button variant="outlined" onClick={handleAddRecipeToWishlist}>
                    Add to wishlist
                  </Button>
                  <Button variant="outlined" onClick={handleAddRecipeToCart}>
                    Add to cart
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{ fontSize: "2.5em", fontWeight: "800" }}>Buy ingredients </DialogTitle>
                    <DialogContent>
                      <Typography style={{ margin: "1rem" }}>
                        <ul style={{ listStyleType: "none" }}>
                          {recipeDetail.recipe.ingredientLines.map((item, index) => (
                            <li key={index}>
                              {numberOfPeople} x{item}
                            </li>
                          ))}
                        </ul>
                      </Typography>
                      <Typography>Số người: {numberOfPeople}</Typography>
                      <Typography>
                        {" "}
                        <IconButton onClick={handleDecrease}>
                          <Remove />
                        </IconButton>
                        <IconButton onClick={handleIncrease}>
                          <Add />
                        </IconButton>
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleBuyIngredients} color="primary" variant="contained">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "0.2 rem",
                    alignItems: "start",
                    justifyContent: "center",
                  }}>
                  <VideoTutorial videoId={videoId} />
                </Box>

                <Box sx={{ marginTop: "2rem" }}>
                  <Comments
                    recipeName={recipeName}
                    recipeImage={recipeImage}
                    label={label}
                    handleCheckLoginStatus={handleCheckLoginStatus}
                    token={token}
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
      <Footer />
    </motion.div>
  );
}

export default RecipeDetail;
