// RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";
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
  Stack,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuickreplyIcon from "@mui/icons-material/Quickreply";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

const obejcttest = {
  Ca: {
    label: "Calcium",
    quantity: 345.332948,
    unit: "mg",
  },
  Fat: {
    label: "Fat",
    quantity: 279.04753875,
    unit: "g",
  },
};

function RecipeDetail() {
  const { label } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalNutrients, setTotalNutrientations] = useState({});
  const [totalDaily, setTotalDaily] = useState({});
  const [showActiveDetails, setShowActiveDetails] = useState("ingredients");

  useEffect(() => {
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
        console.log("response = ", response);
        setRecipeDetail(response.data);
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

  console.log("totalNutrients = ", totalNutrients);
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
            {/* Ingrediens, Nutritions */}
            <Box>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/a-recipe">
                    Recipe
                  </Link>
                  <Typography color="text.primary">{recipeDetail.recipe.label}</Typography>
                </Breadcrumbs>
              </Typography>
              <Button
                sx={{ margin: "1rem" }}
                variant={showActiveDetails === "ingredients" ? "contained" : "outlined"}
                color={showActiveDetails === "ingredients" ? "error" : "primary"}
                onClick={() => setShowActiveDetails("ingredients")}>
                Ingredients
              </Button>
              <Button
                sx={{ margin: "1rem" }}
                variant={showActiveDetails === "nutritions" ? "contained" : "outlined"}
                color={showActiveDetails === "nutritions" ? "error" : "primary"}
                onClick={() => setShowActiveDetails("nutritions")}>
                Nutritions facts
              </Button>

              {/* Ingredients */}
              {showActiveDetails === "ingredients" && (
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4" gutterBottom>
                      {recipeDetail.recipe.label}
                    </Typography>
                    <img
                      src={recipeDetail.recipe.image}
                      alt={recipeDetail.recipe.label}
                      style={{
                        maxWidth: "100%",
                        borderRadius: "1rem",
                        backgroundColor: "white",
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ display: "flex", alignItems: "center", textAlign: "left" }}>
                    <Box component="div" variant="inherit">
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
              )}

              {/* Nutrition facts */}
              {showActiveDetails === "nutritions" && (
                <Box sx={{ width: 1, backgroundColor: "#ccc", padding: "2rem", borderRadius: "1rem" }}>
                  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
                    <Box gridColumn="span 6" sx={{ border: "none" }}>
                      <Item
                        sx={{
                          borderTopRightRadius: "1rem",
                          borderTopLeftRadius: "1rem",
                          backgroundColor: "#ccc",
                        }}>
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={6}
                          placeholder=""
                          style={{
                            width: "100%",
                            padding: "1rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            borderRadius: "1rem",
                          }}
                          readOnly
                          value={recipeDetail.recipe.ingredients.map((item) => item.text + "\n")}
                        />
                        <Typography variant="h4" gutterBottom>
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
                    </Box>
                    <Box gridColumn="span 6">
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
                          <Typography variant="h2">Calories</Typography>
                          <Typography variant="h2">{Number(recipeDetail.recipe.calories.toFixed(1))}</Typography>
                        </Box>
                        <Typography variant="inherit" align="right" sx={{ borderBottom: "1px solid #ccc" }}>
                          %Daily value
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography>123</Typography>
                          <Typography>456</Typography>
                        </Box>

                        {/* {Object.keys(totalNutrients).forEach((key) => {
                          console.log(
                            "totalNutrients =",
                            totalNutrients[key].label +
                              " " +
                              Number(totalNutrients[key].quantity.toFixed(1)) +
                              " " +
                              totalNutrients[key].unit
                          );
                          <Typography>
                            {totalNutrients[key].label +
                              " " +
                              Number(totalNutrients[key].quantity.toFixed(1)) +
                              " " +
                              totalNutrients[key].unit}
                          </Typography>;
                        })} */}
                      </Item>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Instructions line */}
            <Box sx={{ textAlign: "left", marginTop: "2rem" }}>
              <Typography variant="h4" gutterBottom>
                How to make {recipeDetail.recipe.label}
              </Typography>
              {recipeDetail.recipe.instructionLines.map((item, index) => (
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
                  {/* {recipeDetail.recipe.instructionLines.length / 2 === index && (
                    <img src={recipeDetail.recipe.images.LARGE.url} alt={recipeDetail.recipe.label} />
                  )} */}
                </Box>
              ))}
            </Box>

            {/* Comments */}
            <Box sx={{ marginTop: "4rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
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
                  <Typography>Rate this food</Typography>
                  <Typography>
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField placeholder="Name" />
                      <TextField placeholder="Email" />
                      <TextField placeholder="Website" />
                    </Grid>
                    <Grid item xs={6}>
                      <Button>Post comment</Button>
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
                    <TextField placeholder="Search comment" />
                    <Box aria-label="comments" component="div" sx={{ textAlign: "left" }}>
                      <Typography>Karen</Typography>
                      <Typography>
                        <AccessTimeIcon /> 3 months ago
                      </Typography>
                      <Typography>This food is so delicious</Typography>
                      <Typography>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </Typography>
                      <Typography>
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
                        <Typography>
                          Naomi (JOC Community Manager) <Chip label="admin" sx={{ color: "black" }} />
                        </Typography>
                        <Typography>
                          <QuickreplyIcon /> Reply to Karen
                          <AccessTimeIcon /> 3 months ago
                        </Typography>
                        <Typography>
                          Hi Karen! Aww. We are so happy to hear you enjoyed the recipe! Thank you so much for trying
                          Nami’s recipe and for your kind feedback. Happy Cooking!
                        </Typography>
                        <Typography>
                          <ThumbUpOffAltIcon /> 0
                          <QuickreplyIcon /> Reply
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Item></Item>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default RecipeDetail;
