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
  Checkbox,
} from "@mui/material";

import { FaSearch } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
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

function SearchedCard({ recipe, handleRemoveFromCart }) {
  const [count, setCount] = useState(recipe.unit);
  const [openDialog, setOpenDialog] = useState(false);
  const handleIncreaseCount = () => {
    setCount(count + 1);
  };

  const handleDecreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <CardActions disableSpacing>
          <Tooltip title="Remove from cart" arrow disableInteractive>
            <IconButton aria-label="Remove from cart" onClick={() => handleRemoveFromCart(recipe._id)}>
              <FaTrash />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="increase count" onClick={() => handleDecreaseCount()}>
            <FaMinus />
          </IconButton>
          <TextField value={count} sx={{ width: "100px" }} />
          <IconButton aria-label="decrease count" onClick={() => handleIncreaseCount()}>
            <FaPlus />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontSize: "1.5rem" }}>Bạn có chắc muốn bỏ món ăn này khỏi giỏ hàng ?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1.5rem", margin: "1rem 0" }}>{recipe.nameRecipe}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={6}>
              <Button
                onClick={handleCloseDialog}
                color="error"
                variant="contained"
                sx={{ width: "100%", textAlign: "center" }}>
                Có
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleCloseDialog}
                color="primary"
                variant="outlined"
                sx={{ width: "100%", textAlign: "center" }}>
                Không
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
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

function Cart() {
  const [loading, setLoading] = useState(true);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGetCart();
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const token = localStorage.getItem("token");
  useEffect(() => {
    handleGetCart();
  }, []);

  const handleGetCart = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/getCart`, {
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

  const handleRemoveFromCart = async (_id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/removeItemCart`, {
        params: {
          idRecipe: _id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.statusCode === 200) {
        handleGetCart();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToOrders = () => {
    console.log("adđ to carts");
  };

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
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
            <Typography sx={{ display: "flex", alignItems: "center" }}>Cart page</Typography>{" "}
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
                <Button type="button" onClick={handleGetCart}>
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
            <TableContainer component={Paper} sx={{ margin: "2rem 0rem" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                    </TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Manipulate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <img
                          src={item.imageRecipe}
                          alt={item.nameRecipe}
                          style={{ height: "80px", width: "80px", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>{item.nameRecipe}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="increase count">
                          <FaMinus />
                        </IconButton>
                        <TextField value={item.unit} sx={{ width: "100px" }} />
                        <IconButton aria-label="decrease count">
                          <FaPlus />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Remove from cart" arrow disableInteractive>
                          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveFromCart(item._id)}>
                            Delete
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography><Checkbox /> Chọn tất cả (100)</Typography>
          <Typography>Tổng sản phẩm ( 10 )</Typography>
        </Box>
        <Button variant="outlined" onClick={handleAddToOrders()}>
          Mua hàng
        </Button>
      </Box>
    </motion.div>
  );
}

export default Cart;
