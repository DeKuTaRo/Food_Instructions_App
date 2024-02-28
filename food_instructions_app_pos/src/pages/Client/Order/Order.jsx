import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";


function OrderPage() {
  const location = useLocation();
  const { orderData } = location.state || {};
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // State for order details
  const [quantity, setQuantity] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const status = "Ordered";
 
  const [detailAccount, setDetailAccount] = useState({});
  const token = localStorage.getItem("token");
  // Calculate total price
  const navigate = useNavigate();

  useEffect(() => {
    const getAccountDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/account/profile`,
          {
            headers: {
              Authorization: `Bearer ${orderData.token}`,
            },
          }
        );
        setDetailAccount(response.data);
        setAccountName(response.data.username);
        setPhoneNumber(response.data.phone);
        setAddress(response.data.address);
        setCustomerId(response.data._id);
        setCustomerName(response.data.username);
        setEmail(response.data.email);
        setTotalAmount(orderData.calories);
       
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getAccountDetail();
  }, [orderData.token]);
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

  
  // Chuẩn bị thông tin cần chuyển đi
  // const [quantity, setQuantity] = useState(1);

  const handleConfirmPayment = async () => {
    // Đóng dialog

    const paymentInfo = {
      productName: orderData.recipeName,
      userName: detailAccount.username,
      accountName: accountName,
      phone: phoneNumber,
      address: address || detailAccount.address,
      productLink: orderData.link, // Đây là link của trang thông tin sản phẩm
      quantity,
      totalPrice,
    };
    setConfirmDialogOpen(false);
    
    if (paymentMethod === "momo") {
      try {
        const data = new FormData();
        data.append("paymentMethod",paymentMethod)
        data.append("customerId", customerId);
        data.append("accountName", accountName);
        data.append("customerName", customerName);
        data.append("email", email);
        data.append("phoneNumber", phoneNumber);
        data.append("quantity", quantity);
        data.append("totalAmount", totalAmount);
        data.append("status", status);
        data.append("productName", orderData.recipeName);
        data.append("productImage", orderData.recipeImage);
        data.append("productLink", orderData.link);
        const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/create`, data,{
           headers: {
            Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
          },
        });
        console.log(response)
         navigate("/momo", { state: { paymentInfo } });
        if (response.data.statusCode === 200) {
          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          
          
        } else {
          toast.error(response.data.msg, {
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
      } catch (err) {
        toast.error("Có lỗi xảy ra", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      // }yển hướng đến trang thanh toán Momo và truyền thông tin qua URL
    
    
    } if (paymentMethod === "bank") {
      // Gọi API thanh toán Internet Banking và truyền thông tin qua body của request
      navigate("/banking", { state: { paymentInfo } });
    }
  };
}

  const handleCancelPayment = () => {
    // Đóng dialog
    setConfirmDialogOpen(false);
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
        <Typography variant="h4" margin={3}>
          Order Details
        </Typography>

        {/* User Information */}
        <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Typography variant="h6">User Information</Typography>
          <TextField
            label="Name"
            value={orderData.name}
            InputProps={{
              readOnly: true,
              style: { background: "lightgray", pointerEvents: "none" },
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={orderData.phone || ""}
            InputProps={{
              readOnly: true,
              style: { background: "lightgray", pointerEvents: "none" },
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={detailAccount.address || ""}
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
                  width: "92%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                {/* Product Image */}
                {orderData && (
                  <img
                    src={orderData.recipeImage}
                    alt="Recipe"
                    style={{
                      width: "98%",
                      height: "98%",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "50%",
                      border: "1px solid smokegray",
                      objectFit: "fill",
                    }}
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
                    justifyContent: "center",
                    textAlign: "left",
                  }}
                >
                  {orderData &&
                    orderData.ingredientLines.map((item, index) => (
                      <li key={index}>
                        {" "}
                        <Typography variant="h6">{`${quantity} x ${item}`}</Typography>
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
                          src={momo}
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
            <Button onClick={handleCancelPayment} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
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
