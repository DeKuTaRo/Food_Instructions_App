// RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Headers from "../../components/Client/Headers";
import NavBar from "../../components/Client/Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Button,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  Box,
  Paper,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import Avatar from "@mui/material/Avatar";
import { Add, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

function RecipeDetail() {
  const { label } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalNutrients, setTotalNutrientations] = useState({});
  const [totalDaily, setTotalDaily] = useState({});
  const [rating, setRating] = useState([false, false, false, false, false]);

  //modal
  const [open, setOpen] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

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
    const fetchRecipeDetails = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${label}`);
        setRecipeDetail(response.data);
        setRecipeName(response.data.recipe.label);
        setRecipeImage(response.data.recipe.image);
        setTotalNutrientations(response.data.recipe.totalNutrients);
        setTotalDaily(response.data.recipe.totalDaily);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, []);

  const isLoginClient = localStorage.getItem("isLoginClient");

  const handleCheckLoginStatus = () => {
    if (isLoginClient !== "true") {
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

  const id = localStorage.getItem("id");
  console.log("label = ", label);
  const handleAddRecipeToWishlist = () => {
    handleCheckLoginStatus();

    try {
      axios
        .post(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/addToWishList`, {
          _id: id,
          nameRecipe: recipeName,
          imageRecipe: recipeImage,
          linkRecipe: label,
        })
        .then((res) => {
          console.log("res = ", res);
          toast.success("Thêm vào danh sách yêu thích thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } catch (err) {
      console.log(err);
    }
    console.log("add to wish list");
  };

  const handlePostComments = () => {
    handleCheckLoginStatus();

    console.log("add comments");
  };

  const handleAddRecipeToCart = () => {
    handleCheckLoginStatus();

    console.log("add to carts");
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%", height: "3000px" }}>
      <Headers />
      <NavBar />

      <div style={{ textAlign: "center" }}>
        {loading ? (
          <Typography variant="h6">Fetching Recipe Details...</Typography>
        ) : (
          <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/a-recipe">
                  Recipe
                </Link>
                <Typography color="text.primary">{recipeName}</Typography>
              </Breadcrumbs>
            </Typography>
            {/* Ingrediens, Nutritions */}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  {/* Image */}
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4" gutterBottom>
                      {recipeName}
                    </Typography>
                    <img
                      src={recipeImage}
                      alt={recipeName}
                      style={{
                        maxWidth: "100%",
                        borderRadius: "1rem",
                        backgroundColor: "white",
                      }}
                    />
                  </Grid>

                  {/* Ingredients */}
                  <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                    }}>
                    <Box component="div" variant="inherit" sx={{}}>
                      <Typography variant="h4" gutterBottom>
                        Ingredients:
                      </Typography>
                      <ul>
                        {recipeDetail.recipe.ingredientLines.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  </Grid>
                </Grid>

                {/* Button */}
                <Box sx={{ margin: "2rem auto " }}>
                  <Button variant="outlined" onClick={handleOpen}>
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
                      <Button onClick={handleClose} color="primary" variant="contained">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>

                {/* Heal Labels */}
                <Box sx={{ marginTop: "2rem", textAlign: "left" }}>
                  <Typography variant="h4" gutterBottom>
                    Heal labels
                  </Typography>
                  <Box sx={{ border: "1px solid #ccc", padding: "2rem" }}>
                    <Grid container spacing={2}>
                      {recipeDetail.recipe.healthLabels.map((item, index) => (
                        <Grid item xs={3} key={index}>
                          {item}
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>

                {/* Instructions line */}
                <Box sx={{ textAlign: "left", marginTop: "2rem" }}>
                  <Typography variant="h4" gutterBottom>
                    How to make {recipeName}
                  </Typography>
                  {recipeDetail.recipe.instructionLines &&
                    recipeDetail.recipe.instructionLines.map((item, index) => (
                      <Box component="div" key={index}>
                        <Typography
                          sx={{
                            lineHeight: "2rem",
                            backgroundColor: "black",
                            color: "white",
                            position: "absolute",
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "1rem",
                            textAlign: "center",
                          }}>
                          {index + 1}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{ marginLeft: "3rem" }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                </Box>
                {/* Comments */}
                <Box sx={{ marginTop: "4rem" }}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={6}
                    placeholder="Leave your comment here"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      fontSize: "1rem",
                      border: "1px solid #ccc",
                      borderRadius: "1rem",
                    }}
                    readOnly
                    value=""
                  />

                  <Button sx={{ textAlign: "center", width: "100%" }} onClick={handlePostComments}>
                    Post comment
                  </Button>
                  <br></br>
                  <Typography>Rate this food</Typography>
                  {rating.map((isActive, index) => (
                    <span
                      key={index}
                      onMouseEnter={() => handleStarHover(index)}
                      onClick={() => handleStarClick(index)}>
                      {isActive ? <StarIcon /> : <StarOutlineIcon />}
                    </span>
                  ))}
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField placeholder="Name" />
                      <TextField placeholder="Email" />
                      <TextField placeholder="Website" />
                    </Grid>
                  </Grid>
                  <Box sx={{ marginBottom: "4rem" }}>
                    <Box
                      sx={{
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "4rem",
                        marginBottom: "2rem",
                      }}>
                      <Typography sx={{ borderBottom: "1px solid red" }}>224 comments</Typography>
                      <Typography>
                        <BoltIcon sx={{ borderBottom: "1px solid orange" }} />{" "}
                        <LocalFireDepartmentIcon sx={{ borderBottom: "1px solid orange" }} />
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}>
                      <TextField placeholder="Search comment" />

                      <Box
                        aria-label="comments"
                        component="div"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                          gap: "12px",
                        }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                          />
                          <Typography>Karen</Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",

                            textAlign: "left",
                            gap: "8px",
                          }}>
                          <AccessTimeIcon /> <Typography>3 months ago</Typography>
                        </Box>
                        <Typography>This food is so delicious</Typography>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",

                            textAlign: "left",
                            gap: "8px",
                          }}>
                          <ThumbUpOffAltIcon /> 0
                          <QuickreplyIcon /> Reply
                        </Typography>
                        <Box
                          sx={{
                            backgroundColor: "#fafafa",
                            padding: "2rem",
                            marginLeft: "2rem",
                            borderLeft: "3px solid #000000",
                          }}>
                          <Box>
                            Naomi (JOC Community Manager) <Chip label="admin" sx={{ color: "black" }} />
                          </Box>
                          <Typography
                            sx={{
                              display: "flex",

                              textAlign: "left",
                              gap: "8px",
                            }}>
                            <QuickreplyIcon /> Reply to Karen
                            <AccessTimeIcon /> 3 months ago
                          </Typography>
                          <Typography margin={"12px 4px"}>
                            Hi Karen! Aww. We are so happy to hear you enjoyed the recipe! Thank you so much for trying
                            Nami’s recipe and for your kind feedback. Happy Cooking!
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",

                              textAlign: "left",
                              gap: "8px",
                            }}>
                            <ThumbUpOffAltIcon /> 0
                            <QuickreplyIcon /> Reply
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Nutrition facts */}
              <Grid item xs={4}>
                <Box
                  sx={{
                    width: 1,
                    backgroundColor: "#ccc",
                    borderRadius: "1rem",
                  }}>
                  <Item
                    sx={{
                      borderTopRightRadius: "1rem",
                      borderTopLeftRadius: "1rem",
                      backgroundColor: "#ccc",
                      marginBottom: "1rem",
                    }}>
                    <Typography variant="h5" gutterBottom sx={{ padding: "1rem" }}>
                      Nutrition each ingredient
                    </Typography>
                    <React.Fragment>
                      <Table size="small" sx={{ backgroundColor: "#fff" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Qty</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Food</TableCell>
                            <TableCell>Weight</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recipeDetail.recipe.ingredients.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.quantity + " " + row.measure}</TableCell>
                              <TableCell>{row.foodCategory}</TableCell>
                              <TableCell>{row.food}</TableCell>
                              <TableCell>{Number(row.weight.toFixed(1)) + " g"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>{" "}
                  </Item>
                  <Item sx={{ padding: "1rem" }}>
                    <Typography variant="h3" align="center" gutterBottom sx={{ borderBottom: "10px solid #ccc" }}>
                      Nutrition facts
                    </Typography>
                    <Typography variant="h5" align="left">
                      Amount per serving
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "10px solid #ccc",
                      }}>
                      <Typography variant="h4">Calories</Typography>
                      <Typography variant="h4">{Number(recipeDetail.recipe.calories.toFixed(1))}</Typography>
                    </Box>
                    <Typography variant="inherit" align="right" sx={{ borderBottom: "1px solid #ccc" }}>
                      %Daily value
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "30px",
                      }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          flexDirection: "column",
                        }}>
                        {Object.keys(totalNutrients).map((key) => (
                          <Typography key={key}>
                            {totalNutrients[key].label +
                              " = " +
                              Number(totalNutrients[key].quantity.toFixed(1)) +
                              " " +
                              totalNutrients[key].unit}
                          </Typography>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          flexDirection: "column",
                        }}>
                        {Object.keys(totalDaily).map((key) => (
                          <Typography key={key}>
                            {totalDaily[key].label +
                              " = " +
                              Number(totalDaily[key].quantity.toFixed(1)) +
                              " " +
                              totalDaily[key].unit}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Item>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default RecipeDetail;
