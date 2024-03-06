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
import { getCurrentDateTimeInVietnam } from "../../../utils/dateTimeVietNam";

function calculateDeliveryTime(databaseDateTimeString, minute) {
  // Parse the database date time string
  const parts = databaseDateTimeString.split(/[\s/,:]+/); // Split by space, /, and :
  const month = parseInt(parts[0], 10) - 1; // Months are zero based in JavaScript
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);

  // Create a Date object
  const databaseDateTime = new Date(year, month, day, hours, minutes);

  // Calculate delivery time
  const deliveryTime = new Date(databaseDateTime.getTime() + minute * 60000); // 10 minutes in milliseconds

  return deliveryTime;
}

const compareWithCurrentTimeInVietnam = (timeString) => {
  // Parse the given time string
  const [hour, minute] = timeString.split(":");

  // Get the current time in Vietnam time zone
  const currentDateTimeVietnam = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  const currentHour = currentDateTimeVietnam.getHours();
  const currentMinute = currentDateTimeVietnam.getMinutes();

  // Compare the given time with the current time in Vietnam time zone
  return parseInt(hour) === currentHour && parseInt(minute) === currentMinute;
};

function isMatchPresentTime(deliveryTime) {
  // Get the current time
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
  console.log("deliveryTime = ", deliveryTime);
  console.log(`now.getHours().toString()`, now.getHours().toString() === deliveryTime.split(":")[0]);
  console.log(`now.getMinutes().toString() =  `, now.getMinutes().toString());
  console.log(`deliveryTime.split(":")[1] =  `, deliveryTime.split(":")[1]);
  console.log(`now.getMinutes().toString() `, now.getMinutes().toString() === deliveryTime.split(":")[1]);
  return (
    now.getHours().toString() === deliveryTime.split(":")[0] &&
    now.getMinutes().toString() === deliveryTime.split(":")[1]
  );
}

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

    const interval = setInterval(() => {
      getUserData(); // Fetch orders every minute
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateOrders = async () => {
      const updatedOrders = await Promise.all(
        orderData.map(async (order) => {
          const deliverTime = calculateDeliveryTime(order.timeCreate, 3).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
          console.log("deliverTimeeeeee = ", deliverTime);
          // If the current time matches the delivery time and the status is "PaymentSucces", update the status
          if (
            (isMatchPresentTime(deliverTime) || compareWithCurrentTimeInVietnam(deliverTime)) &&
            order.status === "PaymentSucces"
          ) {
            // const updatedOrder = { ...order, status: "Delivery" };
            const response = await axios.post("/order/updateStatusOrder", order); // Example endpoint, replace it with your server endpoint
            console.log("res = ", response);
            // return updatedOrder;
          } else {
            return order;
          }
        })
      );

      setOrderData(updatedOrders);
    };
    const updateInterval = setInterval(() => {
      updateOrders(); // Fetch orders every minute
    }, 5000); // Check every minute
    return () => clearInterval(updateInterval);
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
      <Typography variant="h5">Đơn hàng chưa thanh toán</Typography>
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
                  Tên: {order.productName}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Ngày đặt: {order.timeCreate}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Tổng tiền: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
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
      <Typography variant="h5">Đơn hàng đã đặt</Typography>
      {filteredOrders("PaymentSuccess").map((order, index) => (
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
                  Tên: {order.productName}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Số lượng: {order.quantity}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Ngày đặt: {order.timeCreate}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Đơn hàng đang được chuẩn bị
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
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
                  Số lượng: {order.productName}
                </Typography>
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
