// Import necessary components and modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Button,
  Grid,
  CardMedia,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import drink from "../../../images/drink.jpg";
import soup from "../../../images/soup.jpg";
import axios from "axios";

function DeliveryHistoryPage() {
  const [tabValue, setTabValue] = useState(0);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8004/order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(res.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [token]);

  useEffect(() => {
  }, [orderData]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancelOrder = async (orderId) => {
    // setCancelOrderId(orderId);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/getDetailOrder`,
        {
          idOrder: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response = ", response);
    } catch (err) {
      console.log("err = ", err);
    }
    // setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
    setCancelOrderId(null);
  };

  const handleContinueToCompleteOrder = () => {};

  const handleConfirmCancelOrder = () => {
    // Handle cancel order logic here
    // For example, you can update the order status to 'Cancelled'
    // and then reload the orders or update the state accordingly
    setOpenCancelDialog(false);
    setCancelOrderId(null);
  };
  const handleReorder = (orderId) => {
    // Add logic to handle reorder, for example, redirect to the ordering page
    navigate(
      "/recipe/https%3A%2F%2Fapi.edamam.com%2Fapi%2Frecipes%2Fv2%2F8275bb28647abcedef0baaf2dcf34f8b%3Ftype%3Dpublic%26app_id%3D38a85a3c%26app_key%3Da76067e30a5ceab738d9b7cb91a404fe"
    );
    // You can redirect or perform other actions here
  };

  const filteredOrders = (status) => orderData.filter((order) => order.status === status);

  const NotPaymentTabContent = () => (
    <div>
      <Typography variant="h5">Not Payment Orders</Typography>
      {filteredOrders("NotPayment").map((order, index) => (
        <Paper key={order.id} elevation={3} style={{ padding: "1rem", margin: "1rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.productName}
                height="240"
                image={order.productImage}
                style={{ borderRadius: "8px", width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: "0 1rem" }}>
                <Typography variant="h6">Order #{index + 1}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date: {order.createdAt}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Phone: {order.phoneNumber}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => handleCancelOrder(order.id)}>
                  Continue to complete order?
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Confirm Order Cancellation</DialogTitle>
        <DialogContent>Are you sure you want to cancel this order?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleContinueToCompleteOrder} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const PaymentSuccessTabContent = () => (
    <div>
      <Typography variant="h5">Not Payment Orders</Typography>
      {filteredOrders("NotPayment").map((order, index) => (
        <Paper key={order.id} elevation={3} style={{ padding: "1rem", margin: "1rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.productName}
                height="240"
                image={order.productImage}
                style={{ borderRadius: "8px", width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: "0 1rem" }}>
                <Typography variant="h6">Order #{index + 1}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date: {order.createdAt}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Phone: {order.phoneNumber}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => handleCancelOrder(order.id)}>
                  Continue to complete order?
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Confirm Order Cancellation</DialogTitle>
        <DialogContent>Are you sure you want to cancel this order?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleContinueToCompleteOrder} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const DeliveredTabContent = () => (
    <div>
      <Typography variant="h5">Delivered Orders</Typography>
      {filteredOrders("Delivered").map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: "1rem", margin: "1rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.product.name}
                height="240"
                image={order.product.image}
                style={{ borderRadius: "8px", width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: "0 1rem" }}>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.date}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date: {order.date}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Ngày giờ nhận hàng: {order.deliveryTime}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleReorder(order.id)}>
                  Order Again
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );

  const CompletedTabContent = () => (
    <div>
      <Typography variant="h5">Orders Placed</Typography>
      {filteredOrders("Completed").map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: "1rem", margin: "1rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.productName}
                height="240"
                image={order.productImage}
                style={{ borderRadius: "8px", width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: "0 1rem" }}>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date: {order.createdAt}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => handleCancelOrder(order.id)}>
                  Cancel Order
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Confirm Order Cancellation</DialogTitle>
        <DialogContent>Are you sure you want to cancel this order?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCancelOrder} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const CancelledTabContent = () => (
    <div>
      <Typography variant="h5"> Cancelled Orders</Typography>
      {filteredOrders("Cancelled").map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: "1rem", margin: "1rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt=" "
                height="240"
                image={order.productLink}
                style={{ borderRadius: "8px", width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: "0 1rem" }}>
                <Typography variant="h6">Order #{order.id}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date: {order.date}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleReorder(order.id)}>
                  Order Again
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );

  const tabsContent = [
    <NotPaymentTabContent />,
    <PaymentSuccessTabContent />,
    <DeliveredTabContent />,
    <CompletedTabContent />,
    <CancelledTabContent />,
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />

      <div style={{ textAlign: "center", margin: "0% 10%" }}>
        <Typography variant="h4">Delivery History</Typography>

        <Tabs value={tabValue} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Đợi thanh toán" />
          <Tab label="Đã đặt hàng" />
          <Tab label="Đang vận chuyển" />
          <Tab label="Giao hàng thành công" />
          <Tab label="Đã huỷ" />
        </Tabs>

        {tabsContent[tabValue]}
      </div>

      <Footer />
    </motion.div>
  );
}

export default DeliveryHistoryPage;
