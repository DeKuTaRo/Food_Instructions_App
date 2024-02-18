import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
  styled,
  IconButton,
} from "@mui/material";

import { FaSearch } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import { toast } from "react-toastify";

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

function SearchedCard({ recipe, token, handleRemoveFromWishlist }) {
  const handleAddToCart = async (name, image, link) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/addToCart`,
        {
          nameRecipe: name,
          imageRecipe: image,
          linkRecipe: link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: "5px 5px lightgray" }}>
      <Card>
        <CardActionArea
          component={fadeInAnimation}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Link to={`/recipe/${encodeURIComponent(recipe.linkRecipe)}`}>
            <StyledCardMedia component="img" alt={recipe.nameRecipe} height="140" image={recipe.imageRecipe} />
            <CardContent>
              <Typography variant="h6">{recipe.nameRecipe}</Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions>
          <Tooltip title="Add to cart" arrow disableInteractive sx={{ textAlign: "right" }}>
            <IconButton onClick={() => handleAddToCart(recipe.nameRecipe, recipe.imageRecipe, recipe.linkRecipe)}>
              <FaCartPlus />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove from wishlist" arrow disableInteractive>
            <IconButton onClick={() => handleRemoveFromWishlist(recipe._id)}>
              <FaTrash />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
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

function Wishlist() {
  const [loading, setLoading] = useState(true);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGetWishlist();
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const token = localStorage.getItem("token");
  useEffect(() => {
    handleGetWishlist();
  }, []);

  const handleGetWishlist = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/getWishlist`, {
        params: {
          search: debouncedSearchTerm,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (_id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/removeItemWishlist`, {
        params: {
          idRecipe: _id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.statusCode === 200) {
        handleGetWishlist();
      }
    } catch (err) {
      console.log(err);
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
          <Grid item xs={4}>
            <Typography sx={{ display: "flex", alignItems: "center" }}>Wishlist page</Typography>{" "}
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
                placeholder="Search food here ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Tooltip title="Reset" arrow disableInteractive>
                <Button type="button" onClick={() => setSearchTerm("")}>
                  <MdClearAll />
                </Button>
              </Tooltip>
              <Tooltip title="Search" arrow disableInteractive>
                <Button type="button" onClick={handleGetWishlist}>
                  <FaSearch />
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>

        {loading ? (
          <Typography sx={{ margin: "2rem 0rem" }}>Results will show here</Typography>
        ) : (
          <>
            <Grid container spacing={2} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              {searchResults.map((food, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SearchedCard recipe={food} token={token} handleRemoveFromWishlist={handleRemoveFromWishlist} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Wishlist;
