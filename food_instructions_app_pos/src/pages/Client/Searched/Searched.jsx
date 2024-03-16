import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Button, TextField, styled, Stack } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { dietSearch, healthSearch, cuisineSearch, mealSearch, dishSearch } from "../../../utils/searchData";
import { toast } from "react-toastify";

import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

const fadeIn = {
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
};

const fadeInAnimation = styled("div")({
  animation: `${fadeIn} 0.5s ease-in-out`,
});

const StyledCardMedia = styled(CardMedia)({
  height: "100px",
  width: "100px",
  objectFit: "cover",
  "@media (max-width: 600px)": {
    height: "80px",
    width: "80px",
  },
});

function SearchedCard({ recipe, link }) {
  const handleAddRecentlySee = () => {
    console.log("add recently sees");
  };
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: "5px 5px lightgray" }}>
      <Link to={`/recipe/${encodeURIComponent(link)}`} onClick={handleAddRecentlySee}>
        <Card>
          <CardActionArea
            component={fadeInAnimation}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <StyledCardMedia component="img" alt={recipe.label} height="140" image={recipe.images.SMALL.url} />
            <CardContent>
              <Typography variant="h6">{recipe.label}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </motion.div>
  );
}

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

function Searched() {
  const [loading, setLoading] = useState(true);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const [linkNextPage, setLinkNextPage] = useState("");
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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
  // setLinkFirstPage(url);
  const [countPage, setCountPage] = useState(0);
  const [arrayLinkPage, setArrayLinkPage] = useState([]);
  const [countRecipe, setCountRecipe] = useState(0);
  const [fromRecipe, setFromRecipe] = useState(0);
  const [toRecipe, setToRecipe] = useState(0);

  const handleSearchDebounce = async (urlSearch) => {
    try {
      const response = await axios.get(urlSearch);
      if (response.data) {
        setSearchResults(response.data);
        setLinkNextPage(response.data._links.next.href);
        setCountRecipe(response.data.count);
        setFromRecipe(response.data.from);
        setToRecipe(response.data.to);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e, type) => {
    if (type === "firstPage") {
      setArrayLinkPage([]);
      setArrayLinkPage((prevArray) => [...prevArray, url]);
      setCountPage(0);
      handleSearchDebounce(url);
    } else if (type === "nextPage") {
      setArrayLinkPage((prevArray) => [...prevArray, linkNextPage]);
      setCountPage(countPage + 1);
      handleSearchDebounce(linkNextPage);
    } else if (type === "prevPage") {
      setCountPage(countPage - 1);
      handleSearchDebounce(arrayLinkPage[countPage - 1]);
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
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                autoFocus
                margin="dense"
                id="nameFood"
                type="text"
                variant="standard"
                fullWidth
                name="name"
                placeholder="Search food here ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button type="button" onClick={(e) => handleSearch(e, "firstPage")}>
                <FaSearch />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
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
              renderInput={(params) => <TextField {...params} variant="standard" label="Diet" placeholder="Diet" />}
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
              renderInput={(params) => <TextField {...params} variant="standard" label="Health" placeholder="Health" />}
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
              renderInput={(params) => <TextField {...params} variant="standard" label="Meal" placeholder="Meal" />}
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
              renderInput={(params) => <TextField {...params} variant="standard" label="Dish" placeholder="Dish" />}
            />
          </Grid>
        </Grid>

        {loading ? (
          <Typography sx={{ margin: "2rem 0rem" }}>Results will show here</Typography>
        ) : (
          <>
            <Grid container spacing={2} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              {searchResults.hits.map((food, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SearchedCard recipe={food.recipe} link={food._links.self.href} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          useFlexGap
          flexWrap="wrap">
          <Stack>
            <Typography>Found {countRecipe} recipes</Typography>
            <Stack spacing={1} direction="row">
              <Typography>Show on page</Typography>
              <Typography>from {fromRecipe}</Typography>
              <Typography>to {toRecipe}</Typography>
            </Stack>
          </Stack>
          <Typography>Page: {countPage + 1}</Typography>
          <Box>
            <Button sx={{ margin: "1rem" }} variant="contained" onClick={(e) => handleSearch(e, "firstPage")}>
              First page
            </Button>
            <Button sx={{ margin: "1rem" }} variant="contained" onClick={(e) => handleSearch(e, "prevPage")}>
              Previous page
            </Button>
            <Button sx={{ margin: "1rem" }} variant="contained" onClick={(e) => handleSearch(e, "nextPage")}>
              Next page
            </Button>
          </Box>
        </Stack>
      </div>
      <Chatbot />

    </motion.div>
  );
}

export default Searched;
