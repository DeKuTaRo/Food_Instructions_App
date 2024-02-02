import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function OrderPage() {
  const location = useLocation();
  const { orderData } = location.state || {};
  console.log(orderData.calories);

  // State for order details
  const [quantity, setQuantity] = useState(1);

  // Calculate total price
  const totalPrice = orderData ? orderData.calories * quantity : 0;

  // Function to handle quantity changes
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
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
        <Typography variant="h4">Order Details</Typography>

        {/* User Information */}
        <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Typography variant="h6">User Information</Typography>
          <Typography>{`Name: ${
            orderData ? orderData.recipeName : ""
          }`}</Typography>
          <Typography>{`Phone: ${orderData ? "*********" : ""}`}</Typography>
          <Typography>{`Address: ${
            orderData ? "Editable Address" : ""
          }`}</Typography>
        </Paper>

        {/* Product Information */}
        <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Paper
              sx={{
                width:"92%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                borderRadius:"50%",
                
              }}>
                {/* Product Image */}
                {orderData && (
                  <img
                    src={orderData.recipeImage}
                    alt="Recipe"
                    style={{ width: "98%",height:"98%",display:"flex",alignItems:"center",borderRadius:"50%",border:"1px solid smokegray",objectFit:"fill" }}
                  />
                )}
              </Paper>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ marginLeft: "12px" }}>
                <Typography variant="h5">Ingredients</Typography>
                <ul
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent:"center",
                    textAlign:"left"
                  }}
                >
                  {orderData &&
                    orderData.ingredientLines.map((item, index) => (
                      <li
                        key={index}
                       
                      > <Typography variant="h6">  {" "}
                        {`${quantity} x ${item}`}</Typography>
                      
                      </li>
                    ))}
                </ul>
              </Box>
              {/* Product Quantity */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginLeft: "12px",
                }}
              >
                <Typography variant="h6">Số lượng</Typography>
                <IconButton onClick={handleDecrease}>
                  <Remove />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton onClick={handleIncrease}>
                  <Add />
                </IconButton>
              </Box>

              {/* Total Price */}
            </Grid>
          </Grid>
        </Paper>

        {/* Ingredients */}
        <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Box mt={2}>
            <Typography variant="h6">Total Price</Typography>
            <Typography>{`$${totalPrice.toFixed(2)}`}</Typography>
          </Box>
        </Paper>

        {/* Confirm Dialog */}
        <Dialog open={false /* Set to true to show the dialog */}>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogContent>
            <Typography>{`Quantity: ${quantity}`}</Typography>
            <Typography>{`Total Price: $${totalPrice.toFixed(2)}`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary">Cancel</Button>
            <Button color="primary" variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Footer />
    </motion.div>
  );
}

export default OrderPage;
