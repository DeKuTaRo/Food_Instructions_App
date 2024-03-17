import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
} from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import CottageIcon from "@mui/icons-material/Cottage";
import PaidIcon from "@mui/icons-material/Paid";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";
// Import your header, navbar, and footer components
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import { toast } from "react-toastify";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null); // Khởi tạo orderDetails với giá trị null
  const token = localStorage.getItem("token");
  const [recipeDetail, setRecipeDetail] = useState({});
  const navigate = useNavigate();
  const [idOrder, setOrderIdToContinue] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/id/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(res.data.data);
      } catch (err) {
        toast.error("An error occurred, please try again later", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });      }
    };

    getUserData();
  }, [orderId, token]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `${encodeURI(orderDetails?.productLink)}` // Sử dụng optional chaining để tránh lỗi nếu orderDetails không tồn tại
        );
        setRecipeDetail(response.data.recipe);
      } catch (error) {
        console.error(error);
      }
    };

    if (orderDetails?.productLink) {
      // Sử dụng optional chaining để tránh lỗi nếu orderDetails không tồn tại
      fetchRecipeDetails();
    }
  }, [orderDetails?.productLink]); // Sử dụng optional chaining để tránh lỗi nếu orderDetails không tồn tại

  const handleContinueOrder = (idOrder) => {
    setOrderIdToContinue(idOrder);
    setOpenPaymentModal(true);
  };
  const handleConfirmPayment = () => {
    const redirectPath =
      selectedPaymentMethod === "momo" ? "/momo" : "/banking";
    navigate(redirectPath, { state: { idOrder } });
    setOpenPaymentModal(false);
    setOrderIdToContinue(null);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setOrderIdToContinue(null);
  };
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "NotPayment":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div>
              <PaidIcon style={{ color: "red", fontSize: 30 }} />
              <Typography style={{ color: "red", fontSize: 15 }}>
                {" "}
                NEED PAYMENT
              </Typography>
            </div>

            <div>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleContinueOrder(orderDetails?._id)} // Sử dụng optional chaining để tránh lỗi nếu orderDetails không tồn tại
                style={{ marginTop: "8px" }}
              >
                Complete Order
              </Button>
            </div>
          </div>
        );

      case "PaymentSuccess":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PriceCheckIcon style={{ color: "green", fontSize: 50 }} />
          </div>
        );

      case "Delivered":
        return <LocalShippingIcon style={{ color: "blue", fontSize: 50 }} />;
      case "Completed":
        return <CottageIcon style={{ color: "green", fontSize: 50 }} />;
      case "Cancelled":
        return (
          <>
            <CancelIcon style={{ color: "red", fontSize: 50 }} />
            Order Cancelled
          </>
        );
      default:
        return null;
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
      {/* Header */}
      <Headers />

      {/* Navigation */}
      <NavBar />

      {/* Order Details */}
      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>

        {orderDetails ? (
          <Paper elevation={3} style={{ marginLeft: "0px", width: "100%" }}>
            {/* Status Section */}

            {/* Customer Information Section */}
            <Grid
              container
              spacing={2}
              style={{ marginTop: "20px", padding: "15px" }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" component="strong">
                  #ID: {orderId}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Typography variant="subtitle1" color="textSecondary">
                    Customer Name: {orderDetails.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {orderDetails.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Date: {orderDetails.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Status: {orderDetails.status}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Address: {orderDetails.address}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {/* Order Information Section */}
            {/* Order Information Section */}
            {orderDetails.orders.length === 1 ? (
              <Paper elevation={3} style={{ width: "100%" }}>
                <Grid
                  container
                  spacing={2}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: "15px",
                    width: "100%",
                    margin: "0px",
                    marginLeft: "0px",
                  }}
                >
                  <Grid item xs={12} margin={0}>
                    <Typography variant="h5" component="strong">
                      Order Information
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        alt={orderDetails.orders[0].productName}
                        height="100%"
                        image={orderDetails.orders[0].productImage}
                        style={{ borderRadius: "8px", width: "100%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0px",
                        padding: "15px",
                      }}
                    >
                      <div>
                        <Typography variant="subtitle1" component="strong">
                          Product Name: {orderDetails.orders[0].productName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Quantity: {orderDetails.orders[0].quantity}
                        </Typography>
                        {/* Display Ingredients here */}
                        <Typography variant="h6">Ingredients:</Typography>
                        {orderDetails.orders[0].instructions ? (
                          <Typography variant="subtitle1" color="textSecondary">
                            Ingredients: {orderDetails.orders[0].instructions}
                          </Typography>
                        ) : (
                          <Typography variant="subtitle1" color="textSecondary">
                            No ingredient information available.
                          </Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              <Slider {...sliderSettings}>
                {orderDetails.orders.map((order, index) => (
                  <Paper key={index} elevation={3} style={{ width: "100%" }}>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: "15px",
                        width: "100%",
                        margin: "0px",
                        marginLeft: "0px",
                      }}
                    >
                      <Grid item xs={12} margin={0}>
                        <Typography variant="h5" component="strong">
                          Order Information
                        </Typography>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <CardMedia
                            component="img"
                            alt={order.productName}
                            height="100%"
                            image={order.productImage}
                            style={{ borderRadius: "8px", width: "100%" }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "0px",
                            padding: "15px",
                          }}
                        >
                          <div>
                            <Typography variant="subtitle1" component="strong">
                              Product Name: {order.productName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Quantity: {order.quantity}
                            </Typography>
                            {/* Display Ingredients here */}
                            <Typography variant="h6">Ingredients:</Typography>
                            {order.instructions ? (
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                Ingredients: {order.instructions}
                              </Typography>
                            ) : (
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                              >
                                No ingredient information available.
                              </Typography>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Slider>
            )}

            {/* Payment Method and Total Amount Section */}
            <Grid
              container
              spacing={2}
              style={{
                width: "100%",
                margin: "0px",
                backgroundColor: "#E0E0E0",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#E0E0E0",
                    padding: "15px",
                  }}
                >
                  {getStatusIcon(orderDetails.status)}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="strong">
                  Total Amount <br />
                </Typography>
                <Typography variant="subtitle1" component="strong">
                  Total Amount:{" "}
                  {orderDetails.totalAmount
                    ? orderDetails.totalAmount.toFixed(2)
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Typography variant="subtitle1" color="textSecondary">
            No orders available.
          </Typography>
        )}
      </div>

      <Dialog
        open={openPaymentModal}
        onClose={handleClosePaymentModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose Payment Method</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="paymentMethod"
              name="paymentMethod"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}>
              <FormControlLabel value="momo" control={<Radio />} label="Momo" />
              <FormControlLabel value="banking" control={<Radio />} label="Banking" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Chatbot />
      <Footer />
    </motion.div>
  );
};

export default OrderDetailPage;