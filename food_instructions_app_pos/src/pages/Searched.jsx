import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Button, styled } from "@mui/material";
import { motion } from "framer-motion";
import Headers from "../components/Headers";
import NavBar from "../components/Navbar";

const fadeIn = {
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
};

const fadeInAnimation = styled("div")({
  animation: `${fadeIn} 0.5s ease-in-out`,
});

const StyledCard = styled(Card)({
  width: "400px",
  height: "400px",
  textAlign: "left",
  margin: "auto",
  "@media (max-width: 600px)": {
    width: "80%",
  },
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

const StyledContentBox = styled(Box)({
  maxHeight: "200px",
  overflow: "auto",
  "@media (max-width: 600px)": {
    maxHeight: "80px",
  },
});

function SearchedCard({ recipe }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      boxShadow="5px 5px lightgray"
    >
      <Link to={`/recipe/${recipe.label}`} >
        <Card >
          <CardActionArea component={fadeInAnimation} style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
            <StyledCardMedia
              component="img"
              alt={recipe.label}
              height="140"
              image={recipe.images.SMALL.url}
              
              
            
              
            />
            <CardContent>
              <Typography variant="h6">{recipe.label}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </motion.div>
  );
}

function Searched() {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useParams();

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.edamam.com/api/recipes/v2",
        {
          params: {
            type: "public", 
            q: search,
            app_id: "704b3f39",
            app_key: "309bd85138349b57e3e1328673aef406",
          },
        }
      );
      setFoodList(response.data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}
    >
      <Headers />
      <NavBar />

      <div style={{ textAlign: "center"  }}>
        <Typography variant="h4" gutterBottom>
          Food List for {search}
        </Typography>
        {loading ? (
          <Button disabled>Fetching...</Button>
        ) : (
          <Grid container spacing={2} >
            {foodList.map((food, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SearchedCard recipe={food.recipe} />
              </Grid>
            ))}
          </Grid>
        )}
        <Button onClick={fetchData}>Fetch Food</Button>
      </div>
    </motion.div>
  );
}

export default Searched;