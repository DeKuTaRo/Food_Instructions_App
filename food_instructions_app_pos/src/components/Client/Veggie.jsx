import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, CardMedia, Link } from "@mui/material";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Veggie() {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [hiddenRecipes, setHiddenRecipes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiKey = {
          appId: "38a85a3c",
          appKey: "a76067e30a5ceab738d9b7cb91a404fe",
        };
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=vegetarian&app_id=${apiKey.appId}&app_key=${apiKey.appKey}&limit=10`
        );
        const data = await response.json();

        if (data.hits) {
          const recipeData = data.hits.map((hit) => hit.recipe);
          const shuffledRecipes = shuffleArray(recipeData);
          setRecipes(shuffledRecipes);
          setDisplayedRecipes(shuffledRecipes.slice(0, 4));
          setHiddenRecipes(shuffledRecipes.slice(4));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const autoChangeInterval = setInterval(() => {
      const startIndex = Math.floor(Math.random() * hiddenRecipes.length);
      const newHiddenRecipes = displayedRecipes.concat(hiddenRecipes.slice(startIndex, startIndex + 4));
      const newDisplayedRecipes = hiddenRecipes.slice(0, 4);

      setHiddenRecipes(newHiddenRecipes);
      setDisplayedRecipes(newDisplayedRecipes);
    }, 5000); // Chuyển đổi mỗi 5 giây

    return () => clearInterval(autoChangeInterval);
  }, [hiddenRecipes, displayedRecipes]);
  return (
    <Box sx={{ margin: "3rem 0rem" }}>
      <Grid container spacing={2}>
        {displayedRecipes.map((recipe, index) => (
          <Grid key={index} item xs={3}>
            <Link href={`${recipe.url}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  boxShadow: "0 0 10px 0 rgba(50, 50, 50, .15)",
                  backgroundColor: "white",
                  height: "30em",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  transform: `translateY(${hoveredIndex === index ? "-10px" : "0"})`,
                  "&:hover": {
                    boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)",
                    transform: "scale(1.05)", // Hiệu ứng chuyển động scale khi hover
                  },
                }}>
                <CardMedia
                  component="img"
                  alt={recipe.label}
                  image={recipe.image}
                  height={"20 rem"}
                  sx={{
                    flex: "1",
                    height: "200px",
                    objectFit: "cover",
                    aspectRatio: "16/9",
                  }}
                />
                <CardContent
                  sx={{
                    color: "black",
                    maxHeight: "200px",
                    overflow: "hidden",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <Typography variant="inherit" component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {recipe.source}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "700",
                      marginTop: "0.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {recipe.label}
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="div"
                    sx={{
                      margin: "0.5rem 0",
                      maxHeight: "70px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {recipe.dietLabels.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Veggie;
