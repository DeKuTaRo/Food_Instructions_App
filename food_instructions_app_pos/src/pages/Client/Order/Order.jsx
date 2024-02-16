import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import momo from "../../../images/momo.png";
import bank from "../../../images/bank.jpg";
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
  TextField ,
  Radio, RadioGroup, FormControlLabel,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";


function OrderPage() {
  const location = useLocation();
  const { orderData } = location.state || {};
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // State for order details
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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

const [paymentMethod, setPaymentMethod] = useState("momo"); // Thêm state cho phương thức thanh toán

  // Thêm hàm xác nhận mua hàng


   const handleConfirmPurchase = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };
//  const fetchUserDetails = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account`,
//       {
//         params: {
//           _id: orderData.id,
//         },
//         transformResponse: [(data) => {
//           const userData = JSON.parse(data);
//           // Assuming your _id property is stored as a string
//           userData._id = new ObjectId(userData._id);
//           return userData;
//         }],
//       }
//     );
//     const userData = response.data;
//     setName(userData.name);
//     setPhone(userData.phone);
//     setAddress(userData.address);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [orderData.id]);

console.log(name,phone,address)
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
      <TextField
        label="Name"
        defaultValue={name}
        InputProps={{
          readOnly: true,
           style: { background: 'lightgray',
           pointerEvents: 'none', },
          
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        defaultValue={phone}
        InputProps={{
          readOnly: true,
           style: { background: 'lightgray',
           pointerEvents: 'none', },
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        defaultValue={address}
        fullWidth
        margin="normal"
      />
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
                <Typography variant="h6">AMOUNT</Typography>
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box mt={2}>
                <Typography variant="h6">Payment Method</Typography>
                <RadioGroup
                  aria-label="payment-method"
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="momo"
                    control={<Radio />}
                    label={
                      <>
                        <img
                          src= {momo}
                          alt="Momo Icon"
                          style={{ marginRight: "8px", height: "24px" }}
                        />
                        Momo
                      </>
                    }
                  />
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label={
                      <>
                        <img
                          src={bank}
                          alt="Internet Banking Icon"
                          style={{ marginRight: "8px", height: "24px" }}
                        />
                        Internet Banking
                      </>
                    }
                  />
                </RadioGroup>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box mt={2}>
                <Typography variant="h6">Total Price</Typography>
                <Typography>{`$${totalPrice.toFixed(2)}`}</Typography>
              </Box>

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmPurchase}
                >
                  Confirm Purchase
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        {/* Confirm Dialog */}
         <Dialog
          open={confirmDialogOpen}
          onClose={handleCloseConfirmDialog}
          fullWidth
        >
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogContent>
            <Typography>{`Quantity: ${quantity}`}</Typography>
            <Typography>{`Total Price: $${totalPrice.toFixed(2)}`}</Typography>
            {/* Add any other information you want to display in the dialog */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleCloseConfirmDialog();
                // Implement logic for confirming purchase
              }}
              color="primary"
              variant="contained"
            >
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
