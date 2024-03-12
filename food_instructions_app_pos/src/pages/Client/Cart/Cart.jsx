import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { FaSearch, FaPlus, FaMinus } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";

import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();

  const handleAddToOrders = async () => {
    console.log("adđ to carts");
    try {
      const orders = searchResults.filter((obj) => obj.check === true);
      if (orders.length === 0) {
        toast.error("Vui lòng chọn món ăn", {
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
      const orderDataFromCart = {
        orders,
        token: token,
      };
      // Navigate to the order page with the orderData as state
      navigate("/order", { state: { orderDataFromCart } });
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lai sau", {
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

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    const updatedData = searchResults.map((item) => ({ ...item, check: isChecked }));
    setSearchResults(updatedData);
  };

  const handleSingleCheck = (id) => {
    const updatedData = searchResults.map((item) => (item._id === id ? { ...item, check: !item.check } : item));
    setSearchResults(updatedData);
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
                      <Checkbox
                        checked={searchResults.every((item) => item.check)}
                        onChange={handleCheckAll}
                        name="checkAll"
                        label="Check All"
                      />
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
                        <Checkbox checked={item.check} onChange={() => handleSingleCheck(item._id)} />
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
                        <TextField value={item.quantity} sx={{ width: "100px" }} />
                        <IconButton aria-label="decrease count">
                          <FaPlus />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Remove from cart" arrow disableInteractive>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveFromCart(item._id)}>
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
          <Typography>
            <Checkbox /> Chọn tất cả (100)
          </Typography>
          <Typography>Tổng sản phẩm ( 10 )</Typography>
        </Box>
        <Button variant="outlined" onClick={handleAddToOrders}>
          Mua hàng
        </Button>
      </Box>
    </motion.div>
  );
}

export default Cart;
