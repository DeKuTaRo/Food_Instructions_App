import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, CardMedia, Tab, Tabs, Card } from "@mui/material";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

function calculateDeliveryTime(databaseDateTimeString, minute) {
  const parts = databaseDateTimeString.split(/[\s/,:]+/);
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);
  const databaseDateTime = new Date(year, month, day, hours, minutes);

  const deliveryTime = new Date(databaseDateTime.getTime() + minute * 60000);
  let result = "";
  const delivery = deliveryTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  if (delivery.split(":")[0] === "24") {
    result = "00:" + delivery.split(":")[1];
    return result;
  }
  return delivery;
}

function isMatchPresentTime(deliveryTime) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  currentHour = currentHour < 10 ? "0" + currentHour : currentHour.toString();
  currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute.toString();
  return (
    currentHour >= deliveryTime.split(":")[0] ||
    (currentHour === deliveryTime.split(":")[0] && currentMinute >= deliveryTime.split(":")[1])
  );
}

function DeliveryHistoryPage() {
  const [tabValue, setTabValue] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          setOrderData(res.data.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllOrder();

    const interval = setInterval(() => {
      getAllOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  // tự động cập nhật đơn thành đang giao hàng từ trạng thái thành công sau 3p
  useEffect(() => {
    const updateOrdersDelivered = async () => {
      const updatedOrders = await Promise.all(
        filteredOrders("PaymentSuccess").map(async (order) => {
          const deliverTime = calculateDeliveryTime(order.timeCreate, 3);
          if (isMatchPresentTime(deliverTime)) {
            const response = await axios.post(
              `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/updateStatus`,
              {
                idOrder: order._id,
                type: "Delivered",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data;
          }
        })
      );

      setOrderData(updatedOrders);
    };
    const updateInterval = setInterval(() => {
      updateOrdersDelivered();
    }, 5000);
    return () => clearInterval(updateInterval);
  }, [orderData]);

  // tự động cập nhật đơn thành giao hàng thành công từ trạng thái đang giao hàng sau 3p
  useEffect(() => {
    const updateOrdersComplete = async () => {
      const updatedOrders = await Promise.all(
        filteredOrders("Delivered").map(async (order) => {
          const deliverTime = calculateDeliveryTime(order.timeCreate, 6);
          if (isMatchPresentTime(deliverTime)) {
            const response = await axios.post(
              `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/updateStatus`,
              {
                idOrder: order._id,
                type: "Completed",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data;
          }
        })
      );

      setOrderData(updatedOrders);
    };
    const updateInterval = setInterval(() => {
      updateOrdersComplete();
    }, 5000);
    return () => clearInterval(updateInterval);
  }, [orderData]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancelOrder = async (orderId, type) => {
    try {
      await axios
        .put(
          `${process.env.REACT_APP_URL_ORDER_SERVICE}/order/update/${orderId}`,
          {
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.msg, {
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
        });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau", {
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

  const handleReorder = (orderLink) => {
    // Add logic to handle reorder, for example, redirect to the ordering page
    navigate(`/recipe/${orderLink}`);
    // You can redirect or perform other actions here
  };

  const handleContinueOrder = (idOrder) => {
    navigate("/momo", { state: { idOrder } });
  };

  const filteredOrders = (status) => orderData.filter((order) => order.status === status);

  const NotPaymentTabContent = () => (
    <div>
      <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
        Unpaid Orders
      </Typography>
      {filteredOrders("NotPayment") &&
        filteredOrders("NotPayment").map((order, index) => (
          <Card key={order._id} elevation={3} style={{ marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link to={`/order-detail/${order._id}`}>
                  <CardMedia
                    component="img"
                    alt={order.orders[0].productName}
                    height="100%"
                    image={order.orders[0].productImage}
                    style={{ borderRadius: "8px", width: "100%" }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                  <Typography variant="h5" component="strong">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name: {order.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {order.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Time: {order.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount: {order.totalAmount ? (order.totalAmount / 10).toFixed(3) : "N/A"}đ
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                    Address: {order.address}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelOrder(order._id, "Cancelled")}
                    style={{ marginRight: "8px", marginTop: "8px" }}>
                    Cancel Order
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleContinueOrder(order._id)}
                    style={{ marginTop: "8px" }}>
                    Complete Order
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        ))}
    </div>
  );

  const PaymentSuccessTabContent = () => (
    <div>
      <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
        Successful Payments
      </Typography>
      {filteredOrders("PaymentSuccess") &&
        filteredOrders("PaymentSuccess").map((order, index) => (
          <Card key={order._id} elevation={3} style={{ marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link to={`/order-detail/${order._id}`}>
                  <CardMedia
                    component="img"
                    alt={order.orders[0].productName}
                    height="100%"
                    image={order.orders[0].productImage}
                    style={{ borderRadius: "8px", width: "100%" }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                  <Typography variant="h5" component="strong">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name: {order.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {order.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Time: {order.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Estimate time delivery:{" "}
                    {order.timeCreate.split(" ")[0] + " " + calculateDeliveryTime(order.timeCreate, 3)}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount: {order.totalAmount ? (order.totalAmount / 10).toFixed(3) : "N/A"}đ
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                    Address: {order.address}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
        ))}
    </div>
  );

  const DeliveredTabContent = () => (
    <div>
      <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
        Delivered Orders
      </Typography>
      {filteredOrders("Delivered") &&
        filteredOrders("Delivered").map((order, index) => (
          <Card key={order._id} elevation={3} style={{ marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link to={`/order-detail/${order._id}`}>
                  <CardMedia
                    component="img"
                    alt={order.orders[0].productName}
                    height="100%"
                    image={order.orders[0].productImage}
                    style={{ borderRadius: "8px", width: "100%" }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                  <Typography variant="h5" component="strong">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name: {order.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {order.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Time: {order.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Estimate time complete:{" "}
                    {order.timeCreate.split(" ")[0] + " " + calculateDeliveryTime(order.timeCreate, 3)}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount: {order.totalAmount ? (order.totalAmount / 10).toFixed(3) : "N/A"}đ
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                    Address: {order.address}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
        ))}
    </div>
  );

  const CompletedTabContent = () => (
    <div>
      <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
        Completed Orders
      </Typography>
      {filteredOrders("Completed") &&
        filteredOrders("Completed").map((order, index) => (
          <Card key={order._id} elevation={3} style={{ marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link to={`/order-detail/${order._id}`}>
                  <CardMedia
                    component="img"
                    alt={order.orders[0].productName}
                    height="100%"
                    image={order.orders[0].productImage}
                    style={{ borderRadius: "8px", width: "100%" }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                  <Typography variant="h5" component="strong">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name: {order.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {order.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Time: {order.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Time complete order:{" "}
                    {order.timeCreate.split(" ")[0] + " " + calculateDeliveryTime(order.timeCreate, 6)}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount: {order.totalAmount ? (order.totalAmount / 10).toFixed(3) : "N/A"}đ
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                    Address: {order.address}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleReorder(encodeURIComponent(order.productLink))}
                    style={{ marginTop: "8px" }}>
                    Order Again
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        ))}
    </div>
  );

  const CancelledTabContent = () => (
    <div>
      <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
        Cancelled Orders
      </Typography>
      {filteredOrders("Cancelled") &&
        filteredOrders("Cancelled").map((order, index) => (
          <Card key={order._id} elevation={3} style={{ marginBottom: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link to={`/order-detail/${order._id}`}>
                  <CardMedia
                    component="img"
                    alt={order.orders[0].productName}
                    height="100%"
                    image={order.orders[0].productImage}
                    style={{ borderRadius: "8px", width: "100%" }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                  <Typography variant="h5" component="strong">
                    Order #{index + 1}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Name: {order.customerName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Phone: {order.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Order Time: {order.timeCreate}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Amount: {order.totalAmount ? (order.totalAmount / 10).toFixed(3) : "N/A"}đ
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                    Address: {order.address}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleReorder(order.link)}
                    style={{ marginTop: "8px" }}>
                    Order Again
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
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
          <Tab label="Not Payment" />
          <Tab label="Payment Success" />
          <Tab label="Delivered" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>

        {tabsContent[tabValue]}
      </div>
      <Chatbot />
      <Footer />
    </motion.div>
  );
}

export default DeliveryHistoryPage;
