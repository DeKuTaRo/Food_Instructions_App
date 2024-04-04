import React, { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  Button,
  TextField,
  Link,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getCurrentDateTimeInVietnam } from "../../../utils/dateTimeVietNam";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

function OrderPage() {
  const location = useLocation();

  const { orderData } = location.state || {};
  const [quantityOrderData, setQuantityOrderData] = useState(orderData && orderData.numberOfPeople);

  const { orderDataFromCart } = location.state || {};
  const [ordersFromCart, setOrdersFromCart] = useState(orderDataFromCart && orderDataFromCart.orders);
  const [quantity, setQuantity] = useState(orderDataFromCart && orderDataFromCart.orders[0].quantity);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const token = localStorage.getItem("token");
  // Calculate total price
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setCustomerName(value);
    setNameError(value.trim() === ""); // Check if the name is empty
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setPhoneError(value.trim() === ""); // Check if the phone is empty
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    setAddressError(value.trim() === ""); // Check if the address is empty
  };

  const handleDecreaseOrderData = () => {
    if (quantityOrderData > 1) {
      setQuantityOrderData((prev) => prev - 1);
    }
  };

  const handleIncreaseOrderData = () => {
    setQuantityOrderData((prev) => prev + 1);
  };

  // Function to handle quantity changes
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleConfirmPayment = async () => {
    if (orderData) {
      try {
        const data = new FormData();
        data.append("customerName", customerName);
        data.append("phoneNumber", phoneNumber);
        data.append("address", address);
        data.append("status", "NotPayment");
        data.append("productName", orderData.recipeName);
        data.append("productImage", orderData.recipeImage);
        data.append("productLink", orderData.link);
        data.append("instructions", orderData.ingredientLines);
        data.append("totalAmount", orderData.calories * quantityOrderData);
        data.append("timeCreate", getCurrentDateTimeInVietnam);

        const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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
          const idOrder = response.data.idOrder;
          navigate("/momo", { state: { idOrder } });
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
      }
    } else if (ordersFromCart.length === 1) {
      try {
        console.log("ordersFromCart = ", ordersFromCart);
        const data = new FormData();
        data.append("customerName", customerName);
        data.append("phoneNumber", phoneNumber);
        data.append("address", address);
        data.append("status", "NotPayment");
        data.append("productName", ordersFromCart[0].nameRecipe);
        data.append("productImage", ordersFromCart[0].imageRecipe);
        data.append("productLink", ordersFromCart[0].linkRecipe);
        data.append("instructions", ordersFromCart[0].ingredientLines);
        data.append("totalAmount", ordersFromCart[0].totalAmount * quantity);
        data.append("timeCreate", getCurrentDateTimeInVietnam);

        const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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
          const idOrder = response.data.idOrder;
          navigate("/momo", { state: { idOrder } });
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
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
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
    } else if (ordersFromCart.length > 1) {
      try {
        const data = new FormData();
        data.append("customerName", customerName);
        data.append("phoneNumber", phoneNumber);
        data.append("address", address);
        data.append("status", "NotPayment");
        data.append("orders", JSON.stringify(ordersFromCart));
        data.append(
          "totalAmount",
          ordersFromCart
            .reduce((accumulator, currentItem) => {
              return accumulator + currentItem.totalAmount * currentItem.quantity;
            }, 0)
            .toFixed(2)
        );
        data.append("timeCreate", getCurrentDateTimeInVietnam);

        const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/creates`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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
          const idOrder = response.data.idOrder;
          navigate("/momo", { state: { idOrder } });
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
        toast.error("Có lỗi xảy ra,  vui lòng thử lại sau", {
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
    }
  };

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrdersFromCart((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Function to handle increase quantity
  const increaseQuantity = (itemId) => {
    setOrdersFromCart((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Function to handle decrease quantity
  const decreaseQuantity = (itemId) => {
    setOrdersFromCart((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
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
        <Typography variant="h4" margin={3}>
          Order Details
        </Typography>

        {/* User Information */}
        <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
          <Typography variant="h6">User Information</Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            defaultValue=""
            onChange={handleNameChange}
            error={nameError}
            helperText={nameError && "Name cannot be empty"}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            onChange={handlePhoneChange}
            error={phoneError}
            helperText={phoneError && "Phone cannot be empty"}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            onChange={handleAddressChange}
            error={addressError}
            helperText={addressError && "Address cannot be empty"}
          />
        </Paper>

        {orderData || ordersFromCart.length === 1 ? (
          <>
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
                  }}>
                  <Paper
                    sx={{
                      width: "92%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}>
                    {/* Product Image */}
                    <img
                      src={orderData ? orderData.recipeImage : ordersFromCart[0].imageRecipe}
                      alt={orderData ? orderData.recipeName : ordersFromCart[0].nameRecipe}
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
                  }}>
                  {/* Ingredients */}
                  <Box sx={{ marginLeft: "12px" }}>
                    <Typography variant="h4">
                      {orderData ? orderData.recipeName : ordersFromCart[0].nameRecipe}
                    </Typography>
                    <Typography variant="h5">Ingredients</Typography>
                    <ul
                      style={{
                        listStyleType: "none",
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "left",
                      }}>
                      {orderData
                        ? orderData.ingredientLines.map((item, index) => (
                            <li key={index}>
                              <Typography variant="h6">{`${quantityOrderData} x ${item}`}</Typography>
                            </li>
                          ))
                        : ordersFromCart[0].ingredientLines.map((item, index) => (
                            <li key={index}>
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
                    }}>
                    <Typography variant="h6">AMOUNT</Typography>
                    {orderData ? (
                      <>
                        <IconButton onClick={handleDecreaseOrderData}>
                          <Remove />
                        </IconButton>
                        <TextField value={quantityOrderData} />
                        <IconButton onClick={handleIncreaseOrderData}>
                          <Add />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={handleDecrease}>
                          <Remove />
                        </IconButton>
                        <TextField value={quantity} />
                        <IconButton onClick={handleIncrease}>
                          <Add />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              elevation={3}
              style={{
                padding: "1rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="h6">
                Total Price
                {orderData
                  ? ` ${((orderData.calories * quantityOrderData) / 10).toFixed(3)}đ`
                  : ` ${((ordersFromCart[0].totalAmount * quantity) / 10).toFixed(3)}đ`}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmPayment}
                disabled={
                  !customerName || !phoneNumber || !address // Disable if required data is empty
                }>
                Confirm Purchase
              </Button>
            </Paper>
          </>
        ) : (
          <>
            <Box
              sx={{
                padding: "2rem",
                margin: "2rem 0",
                boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)",
                backgroundColor: "white",
                textAlign: "center",
                position: "relative",
              }}>
              <Swiper ref={sliderRef} modules={[Autoplay]} spaceBetween={20} slidesPerView={1} loop={true}>
                {ordersFromCart.map((item, index) => (
                  <>
                    <SwiperSlide key={index}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Link href={item.linkRecipe} style={{ textDecoration: "none", color: "inherit" }}>
                            <Card
                              sx={{
                                backgroundColor: "white",
                                display: "flex",
                                flexDirection: "column",
                                transition: "box-shadow 0.3s", // Add transition for smooth effect
                                "&:hover": {
                                  boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)", // Adjust the shadow on hover
                                },
                              }}>
                              <CardMedia
                                component="img"
                                alt={item.nameRecipe}
                                image={item.imageRecipe}
                                sx={{
                                  width: "98%",
                                  height: "98%",
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: "50%",
                                  border: "1px solid smokegray",
                                  objectFit: "fill",
                                }}
                              />
                              <CardContent sx={{ color: "black", textAlign: "center" }}>
                                <Typography variant="inherit" component="span">
                                  {item.nameRecipe}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Link>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <Typography variant="h4">{item.nameRecipe}</Typography>
                            <Typography variant="h5">Ingredients</Typography>
                            <ul
                              style={{
                                listStyleType: "none",
                                display: "flex",
                                alignItems: "start",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "left",
                              }}>
                              {item.ingredientLines.map((value, index) => (
                                <li key={index}>
                                  <Typography variant="h6">{`${item.quantity} x ${value}`}</Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                              marginLeft: "12px",
                            }}>
                            <Typography variant="h6">AMOUNT</Typography>
                            <IconButton onClick={() => decreaseQuantity(item._id)}>
                              <Remove />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                            />
                            <IconButton onClick={() => increaseQuantity(item._id)}>
                              <Add />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
              <Button
                sx={{ position: "absolute", left: "-5%", bottom: "50%", top: "50%", padding: "1rem" }}
                onClick={handlePrev}
                variant="contained">
                <ChevronLeftIcon />
              </Button>
              <Button
                sx={{ position: "absolute", right: "-5%", bottom: "50%", top: "50%", padding: "1rem" }}
                onClick={handleNext}
                variant="contained">
                <ChevronRightIcon />
              </Button>
            </Box>

            <Paper
              elevation={3}
              style={{
                padding: "1rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography variant="h6">
                Total Price{" "}
                {` ${
                  (ordersFromCart.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.totalAmount * currentItem.quantity;
                  }, 0) / (10)).toFixed(3)
                }đ`}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmPayment}
                disabled={
                  !customerName || !phoneNumber || !address // Disable if required data is empty
                }>
                Confirm Purchase
              </Button>
            </Paper>
          </>
        )}
      </div>
      <Chatbot />
      <Footer />
    </motion.div>
  );
}

export default OrderPage;
