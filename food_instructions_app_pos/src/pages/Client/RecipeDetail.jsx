// RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";

function RecipeDetail() {
  const { label } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
  }, [label]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.edamam.com/api/recipes/v2",
        {
          params: {
            type: "public",
            q: label, // Use the id parameter from the URL
            app_id: "704b3f39",
            app_key: "309bd85138349b57e3e1328673aef406",
          },
        }
      );
      setRecipeDetail(response.data.hits[0].recipe);
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

      <div style={{ textAlign: "center" }}>
        {loading ? (
          <Typography variant="h6">Fetching Recipe Details...</Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              {recipeDetail.label}
            </Typography>
            <img
              src={recipeDetail.image}
              alt={recipeDetail.label}
              style={{ maxWidth: "100%" }}
            />
            <Typography variant="body1" gutterBottom>
              Source: {recipeDetail.source}
            </Typography>
            <Typography variant="body2">
            Ingredients: {recipeDetail.ingredientLines ? recipeDetail.ingredientLines.join(", ") : "N/A"}
            </Typography>
            {/* You can display other details as needed */}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default RecipeDetail;