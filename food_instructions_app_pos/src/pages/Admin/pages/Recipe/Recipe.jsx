import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Stack,
} from "@mui/material";

import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";
import AddIcon from "@mui/icons-material/Add";
import { FaSearch, FaArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

import { dietSearch, healthSearch, cuisineSearch, mealSearch, dishSearch } from "../../../../utils/searchData";
import RecipeDialog from "./RecipeDialog";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const defaultTheme = createTheme();

function ARecipe() {
  const commonStyles = {
    height: "auto",
    // Add any other shared styles here
  };

  const imageStyles = {
    ...commonStyles,
    width: "200px", // Default width for larger screens
  };

  const mobileStyles = {
    ...commonStyles,
    width: "60px", // Width for mobile screens
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const [loading, setLoading] = useState(true);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const [diet, setDiet] = useState([]);
  const [health, setHealth] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [meal, setMeal] = useState([]);
  const [dish, setDish] = useState([]);
  const handleSelectDiet = (e, values) => {
    setDiet(values);
  };

  const handleSelectHealth = (e, values) => {
    setHealth(values);
  };

  const handleSelectCuisine = (e, values) => {
    setCuisine(values);
  };

  const handleSelectMeal = (e, values) => {
    setMeal(values);
  };

  const handleSelectDish = (e, values) => {
    setDish(values);
  };

  const queryParams = new URLSearchParams({
    type: "public",
    q: debouncedSearchTerm,
    app_id: process.env.REACT_APP_APP_ID_RECIPE,
    app_key: process.env.REACT_APP_APP_KEY_RECIPE,
  });

  const diets = diet.map((item) => item.title);
  diets.forEach((item) => {
    queryParams.append("diet", item);
  });

  const healths = health.map((item) => item.title);
  healths.forEach((item) => {
    queryParams.append("health", item);
  });

  const cuisines = cuisine.map((item) => item.title);
  cuisines.forEach((item) => {
    queryParams.append("cuisine", item);
  });

  const meals = meal.map((item) => item.title);
  meals.forEach((item) => {
    queryParams.append("meal", item);
  });

  const dishs = dish.map((item) => item.title);
  dishs.forEach((item) => {
    queryParams.append("dish", item);
  });

  const url = `${process.env.REACT_APP_RECIPE_URL}?${queryParams.toString()}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(url);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = React.useState(false);

  const [collapse, setCollapse] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <HeaderWithSidebar title="Recipe" />

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
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Button variant="outlined" onClick={handleClickOpen}>
                        Add new <AddIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={8}>
                      <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="nameFood"
                          type="text"
                          variant="standard"
                          fullWidth
                          name="name"
                          placeholder="Search here ..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                        <Button type="button" onClick={handleSearch}>
                          <FaSearch />
                        </Button>
                        <Button type="button" onClick={() => setCollapse(!collapse)}>
                          <FaArrowAltCircleDown />
                        </Button>
                      </Box>
                    </Grid>
                    {collapse && (
                      <>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="diet_search"
                            options={dietSearch}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSelectDiet}
                            value={diet}
                            defaultValue={[]}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" label="Diet" placeholder="Diet" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="health_search"
                            options={healthSearch}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSelectHealth}
                            value={health}
                            defaultValue={[]}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" label="Health" placeholder="Health" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="cuisine_search"
                            options={cuisineSearch}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSelectCuisine}
                            value={cuisine}
                            defaultValue={[]}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" label="Cuisine" placeholder="Cuisine" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="meal_search"
                            options={mealSearch}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSelectMeal}
                            value={meal}
                            defaultValue={[]}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" label="Meal" placeholder="Meal" />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            multiple
                            limitTags={2}
                            id="dish_search"
                            options={dishSearch}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSelectDish}
                            value={dish}
                            defaultValue={[]}
                            renderInput={(params) => (
                              <TextField {...params} variant="standard" label="Dish" placeholder="Dish" />
                            )}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                  {loading ? (
                    <Typography> Type input to search recipe</Typography>
                  ) : (
                    searchResults.hits.map((row, index) => (
                      <Table size="small" key={index}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Link href={`/a-recipe/details/${encodeURIComponent(row._links.self.href)}`}>
                                <img
                                  src={row.recipe.image}
                                  alt={row.recipe.label}
                                  style={window.innerWidth <= 600 ? mobileStyles : imageStyles}
                                />
                              </Link>
                            </TableCell>
                            <TableCell>{row.recipe.label}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ))
                  )}
                  {loading ? (
                    <></>
                  ) : (
                    <Stack
                      spacing={{ xs: 1, sm: 2 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      useFlexGap
                      flexWrap="wrap">
                      <Stack>
                        <Typography>Found {searchResults.count} recipes</Typography>
                        <Stack spacing={1} direction="row">
                          <Typography>Show on page</Typography>
                          <Typography>from {searchResults.from}</Typography>
                          <Typography>to {searchResults.to}</Typography>
                        </Stack>
                      </Stack>
                      <Button variant="contained" href={searchResults._links.next.href}>
                        {searchResults._links.next.title}
                      </Button>
                    </Stack>
                  )}
                </React.Fragment>{" "}
              </Paper>{" "}
            </Container>
          </Box>
        </Box>
        {open && <RecipeDialog open={open} handleClose={handleClose} />}
      </ThemeProvider>
    </motion.div>
  );
}

export default ARecipe;
