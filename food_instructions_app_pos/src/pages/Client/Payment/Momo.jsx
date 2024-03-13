import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import momoQRCodeImage from "../../../images/QRmomo.png";

function MomoPaymentPage() {
  const location = useLocation();
  const idOrder = location.state || {};
  const momoQRCodeImageSrc = momoQRCodeImage;
  const token = localStorage.getItem("token");
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8004/order/id/${idOrder.idOrder}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", res);
        setOrderData(res.data.data); // Assuming your order data is in the 'data' property of the response
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function here
    getUserData();
  }, []);

  const handlePaymentOrder = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/payment`,
        {
          idOrder: orderData.idOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
        navigate("/history");
      } else if (response.data.statusCode === 500) {
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
      toast.error("An unexpected error occurred. Please try again later.", {
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

  const handlePaymentWithMomo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/paymentMoMo`, {
        priceGlobal: orderData.totalAmount.toFixed(0),
        orderId: idOrder.idOrder,
      });
      console.log("res = ", response);
    } catch (err) {
      console.log("err = ", err);
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

      {/* Title */}
      <Typography variant="h3" style={{ marginTop: "20px", textAlign: "center" }}>
        Payment to Continue Ordering
      </Typography>

      <Grid container spacing={3} style={{ marginTop: "20px", textAlign: "center", height: "100%" }}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <CardContent>
              <Typography variant="h6">Additional Transfer Information</Typography>

              <Typography variant="h6" style={{}}>
                You can choose one of the following methods for the bank transfer
              </Typography>
              <Typography variant="h6" style={{}}>
                You must enter the content below correctly
              </Typography>
              <Typography variant="h6" style={{}}>
                Once you have paid, please follow the order, we will always update as quickly as possible
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        {/* Card QR Code */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ height: "100%" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <Typography variant="h5">QR Code</Typography>
              <img src={momoQRCodeImageSrc} alt="Momo QR Code" style={{ margin: "20px auto", width: "80%" }} />
              <Typography variant="subtitle1">Scan to make the payment</Typography>
            </CardContent>
          </Paper>
        </Grid>

        {/* Card Bank Transfer Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ height: "100%" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <Typography variant="h5" marginBottom={3}>
                Bank Transfer Information
              </Typography>
              <TextField
                label="Account Holder"
                value={`${orderData.customerName}`}
                InputProps={{
                  readOnly: true,
                  style: { marginBottom: "8px", fontSize: "1rem" },
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Account Number"
                value={`${orderData.phoneNumber}`}
                InputProps={{
                  readOnly: true,
                  style: { marginBottom: "8px", fontSize: "1rem" },
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Amount"
                value={`$${orderData.totalAmount && orderData.totalAmount.toFixed(2)}`}
                InputProps={{
                  readOnly: true,
                  style: { marginBottom: "8px", fontSize: "1rem" },
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Contents of the transfer"
                value={`${orderData.customerName}-${orderData.timeCreate}--${orderData._id}`}
                InputProps={{
                  readOnly: true,
                  style: { fontSize: "1rem" },
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" color="primary" size="large" onClick={handlePaymentOrder}>
          Purchase history
        </Button>
        <Button onClick={handlePaymentWithMomo}>Momo</Button>
      </div>

      <Footer />
    </motion.div>
  );
}

export default MomoPaymentPage;
