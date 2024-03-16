import React, { useState, useEffect } from "react";
import { CardContent, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

function MomoPaymentPage() {
  const location = useLocation();
  const idOrder = location.state || {};
  const token = localStorage.getItem("token");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/id/${idOrder.idOrder}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(res.data.data);
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
    };

    // Call the function here
    getUserData();
  }, []);

  const handlePaymentWithMomo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/paymentMoMo`, {
        priceGlobal: orderData.totalAmount.toFixed(0),
        orderId: idOrder.idOrder,
        orderInfo: `${orderData.customerName}-${orderData.timeCreate}--${orderData._id}`,
      });
      window.location.href = response.data.payUrl;
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
        <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ height: "100%" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              <Typography variant="h5" marginBottom={3}>
                Filling bill information
              </Typography>
              <TextField
                label="Customer name"
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
                label="Customer number"
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
        <Button variant="contained" color="primary" size="large" onClick={handlePaymentWithMomo}>
          Complete order
        </Button>
      </div>
      <Chatbot />
      <Footer />
    </motion.div>
  );
}

export default MomoPaymentPage;
