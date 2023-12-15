import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { HeaderWithSidebar } from "../../../Admin/components/HeaderWithSidebar";

import Title from "../../Title";
import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Button, Grid, Table, TableHead, TableBody, TableCell, TableRow, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";

const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ARecipeDetail() {
  const { url } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const [totalNutrients, setTotalNutrientations] = useState({});
  const [totalDaily, setTotalDaily] = useState({});

  const [showActiveDetails, setShowActiveDetails] = useState("ingredients");

  useEffect(() => {
    // let isMounted = true;
    const fetchRecipeDetails = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(`${url}`, {
          params: {
            type: "public",
            app_id: `${process.env.REACT_APP_APP_ID_RECIPE}`,
            app_key: `${process.env.REACT_APP_APP_KEY_RECIPE}`,
          },
        });
        // if (isMounted) {
        setRecipeDetail(response.data);
        setTotalNutrientations(response.data.recipe.totalNutrients);
        setTotalDaily(response.data.recipe.totalDaily);
        setLoading(false);
        // }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
    return () => 
    {
      // isMounted = false;
    };
  }, []);

  return (
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
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <React.Fragment>
                <div style={{ textAlign: "center" }}>
                  {loading ? (
                    <>
                      <Typography variant="h6">Fetching Recipe Details...</Typography>
                    </>
                  ) : (
                    <>
                      <Title>
                        <Breadcrumbs aria-label="breadcrumb">
                          <Link underline="hover" color="inherit" href="/a-recipe">
                            Recipe
                          </Link>
                          <Typography color="text.primary">{recipeDetail.recipe.label}</Typography>
                        </Breadcrumbs>
                      </Title>
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
                                boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)",
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
                                  // onChange={handleTextareaChange}
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
                                <Typography
                                  variant="h3"
                                  align="center"
                                  gutterBottom
                                  sx={{ borderBottom: "10px solid #ccc" }}>
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
                                  <Typography variant="h2">
                                    {Number(recipeDetail.recipe.calories.toFixed(1))}
                                  </Typography>
                                </Box>
                                <Typography variant="inherit" align="right" sx={{ borderBottom: "1px solid #ccc" }}>
                                  %Daily value
                                </Typography>
                                {Object.keys(totalNutrients).forEach((key) => {
                                  // console.log(
                                  //   "key = ",
                                  //   Number(totalDaily[key].quantity.toFixed(1)) + " " + totalDaily[key].unit
                                  // );
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>
                                      {totalNutrients[key].label +
                                        " " +
                                        Number(totalNutrients[key].quantity.toFixed(1)) +
                                        " " +
                                        totalNutrients[key].unit}
                                    </Typography>
                                    <Typography>
                                      {/* {Number(totalDaily[key].quantity.toFixed(1)) + " " + totalDaily[key].unit} */}
                                    </Typography>
                                  </Box>;
                                })}
                              </Item>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </div>
              </React.Fragment>{" "}
            </Paper>{" "}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ARecipeDetail;
