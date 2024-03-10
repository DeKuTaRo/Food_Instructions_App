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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,Card
} from "@mui/material";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import axios from "axios";
import { getCurrentDateTimeInVietnam } from "../../../utils/dateTimeVietNam";
import { toast } from "react-toastify";

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

// Parse the given date time string
const compareWithCurrentTimeInVietnam = (timeString) => {
  // Parse the given time string
  const [hour, minute] = timeString.split(":");
  const currentDateTimeVietnam = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const currentHour = currentDateTimeVietnam.getHours();
  const currentMinute = currentDateTimeVietnam.getMinutes();

  // Compare the given time with the current time in Vietnam time zone
  return parseInt(hour) === currentHour && parseInt(minute) === currentMinute;
};

function isMatchPresentTime(deliveryTime) {
  // Get the current time
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  console.log("deliveryTime = ", deliveryTime);
  console.log(
    `now.getHours().toString()`,
    now.getHours().toString() === deliveryTime.split(":")[0]
  );
  console.log(`now.getMinutes().toString() =  `, now.getMinutes().toString());
  console.log(`deliveryTime.split(":")[1] =  `, deliveryTime.split(":")[1]);
  console.log(
    `now.getMinutes().toString() `,
    now.getMinutes().toString() === deliveryTime.split(":")[1]
  );
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
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [idOrder, setOrderIdToContinue] = useState(null);

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

  useEffect(() => {
    // Initial fetch
    getUserData();

    // Set up interval to fetch orders every minute
    const interval = setInterval(() => {
      getUserData(); // Fetch orders every minute
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [token]); // Include 'token' as a dependency to ensure the effect runs when the token changes

  useEffect(() => {
    const updateOrders = async () => {
      const updatedOrders = await Promise.all(
        orderData.map(async (order) => {
          const deliverTime = calculateDeliveryTime(
            order.timeCreate,
            3
          ).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
          console.log("deliverTimeeeeee = ", deliverTime);
          // If the current time matches the delivery time and the status is "PaymentSucces", update the status
          if (
            (isMatchPresentTime(deliverTime) ||
              compareWithCurrentTimeInVietnam(deliverTime)) &&
            order.status === "PaymentSucces"
          ) {
            // const updatedOrder = { ...order, status: "Delivery" };
            const response = await axios.post(
              "/order/updateStatusOrder",
              order
            ); // Example endpoint, replace it with your server endpoint
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

  const handleCancelOrder = async (orderId, type) => {
    try {
      setLoading(true);

      await axios
        .put(
          `http://localhost:8004/order/update/${orderId}`,
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
      getUserData();
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    } finally {
      setLoading(false);
    }
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
  const handleReorder = (orderLink) => {
    // Add logic to handle reorder, for example, redirect to the ordering page
    navigate(
      `/recipe/${orderLink}`
    );
    // You can redirect or perform other actions here
  };

const handleContinueOrder = (idOrder) => {
  setOrderIdToContinue(idOrder);
  setOpenPaymentModal(true);
};


  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleConfirmPayment = () => {
    // Handle the logic for confirming payment method
    // For example, redirect to the selected payment method page
    const redirectPath =
      selectedPaymentMethod === "momo" ? "/momo" : "/banking";
    navigate(redirectPath, { state: { idOrder } });
    setOpenPaymentModal(false);
    setOrderIdToContinue(null);
  };
  console.log(orderData);

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setOrderIdToContinue(null);
  };

  const filteredOrders = (status) =>
    orderData.filter((order) => order.status === status);
 

const NotPaymentTabContent = () => (
  <div>
    <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
      Unpaid Orders
    </Typography>
    {filteredOrders("NotPayment").map((order, index) => (
        <Card key={order.id} elevation={3} style={{ marginBottom: "2rem" }}>
        <Grid container spacing={2}>

          <Grid item xs={4}>
      <Link to={`/order-detail/${order._id}`}>  
            
            <CardMedia
              component="img"
              alt={order.customerName}
              height="100%"
              image={order.productImage}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            </Link>
          </Grid>
          <Grid item xs={8} style={{ padding: "1rem",display:"flex",alignItems:"center", justifyContent:"center" }}>
            <div>
              <Typography variant="h5" component="strong">
                 #{index + 1} {order.productName}
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
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Order Date: {order.timeCreate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {order.status}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                Address: {order.address}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleCancelOrder(order._id, "Cancelled")}
                style={{ marginRight: "8px", marginTop: "8px" }}
              >
                Cancel Order
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleContinueOrder(order._id)}
                style={{ marginTop: "8px" }}
              >
                Complete Order
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      

   
    ))}
    <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
      <DialogTitle>Confirm Order Cancellation</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this order?
      </DialogContent>
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
    <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
      Successful Payments
    </Typography>
    {filteredOrders("PaymentSuccess").map((order, index) => (
                            <Card key={order.id} elevation={3} style={{ marginBottom: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
                          <Link to={`/order-detail/${order._id}`}> 

            <CardMedia
              component="img"
              alt={order.productName}
              height="100%"
              image={order.productImage}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            </Link>
          </Grid>
          <Grid item xs={8} style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                Phone: {order.productName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Order Date: {order.timeCreate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {order.status}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                Address: {order.address}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card> 

   
    ))}
    <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
      <DialogTitle>Confirm Order Cancellation</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this order?
      </DialogContent>
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

    <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
      Delivered Orders
    </Typography>
    {filteredOrders("Delivered").map((order, index) => (
                        <Card key={order.id} elevation={3} style={{ marginBottom: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
                    <Link to={`/order-detail/${order._id}`}>

            <CardMedia
              component="img"
              alt={order.customerName}
              height="100%"
              image={order.productImage}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            </Link>
          </Grid>
          <Grid item xs={8} style={{ padding: "1rem",display:"flex",alignItems:"center", justifyContent:"center" }}>
            <div>
              <Typography variant="h5" component="strong">
                 #{index + 1} {order.productName}
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
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Order Date: {order.timeCreate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {order.status}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                Address: {order.address}
              </Typography>

            </div>
          </Grid>
        </Grid>
      </Card>
       

    
    ))}
    <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
      <DialogTitle>Confirm Order Cancellation</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this order?
      </DialogContent>
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

const CompletedTabContent = () => (
  <div>
    <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
      Completed Orders
    </Typography>
    {filteredOrders("Completed").map((order, index) => (
                      <Card key={order.id} elevation={3} style={{ marginBottom: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
                  <Link to={`/order-detail/${order._id}`}>  

            <CardMedia
              component="img"
              alt={order.customerName}
              height="100%"
              image={order.productImage}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            </Link>
          </Grid>
          <Grid item xs={8} style={{ padding: "1rem",display:"flex",alignItems:"center", justifyContent:"center" }}>

            <div>
              <Typography variant="h5" component="strong">
                 #{index + 1} {order.productName}
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
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Order Date: {order.timeCreate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {order.status}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                Address: {order.address}
              </Typography>
                          <Button
                variant="contained"
                color="success"
                onClick={() => handleReorder(encodeURIComponent(order.productLink))}
                style={{ marginTop: "8px" }}
              >
                Order Again
              </Button>

            </div>
          </Grid>
        </Grid>
      </Card>

    ))}
    <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
      <DialogTitle>Confirm Order Cancellation</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this order?
      </DialogContent>
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



  const CancelledTabContent = () => (
 <div>
    <Typography variant="h4" component="strong" style={{ marginBottom: "3rem" }}>
      Cancelled Orders
    </Typography>
    {filteredOrders("Cancelled").map((order, index) => (
    <Card key={order.id} elevation={3} style={{ marginBottom: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
                        <Link to={`/order-detail/${order._id}`}>  
            
            <CardMedia
              component="img"
              alt={order.customerName}
              height="100%"
              image={order.productImage}
              style={{ borderRadius: "8px", width: "100%" }}
            />
            </Link>
          </Grid>
          <Grid item xs={8} style={{ padding: "1rem",display:"flex",alignItems:"center", justifyContent:"center" }}>
            <div>
              <Typography variant="h5" component="strong">
                 #{index + 1} {order.productName}
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
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Order Date: {order.timeCreate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {order.status}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: "8px" }}>
                Address: {order.address}
              </Typography>
                          <Button
                variant="contained"
                color="success"
                onClick={() => handleReorder(order.link)}
                style={{ marginTop: "8px" }}
              >
                Order Again
              </Button>

            </div>
          </Grid>
        </Grid>
      </Card>

  
    ))}
    <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
      <DialogTitle>Confirm Order Cancellation</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this order?
      </DialogContent>
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
      style={{ margin: "0% 10%" }}
    >
      <Headers />
      <NavBar />

      <div style={{ textAlign: "center", margin: "0% 10%" }}>
        <Typography variant="h4">Delivery History</Typography>

        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Not Payment" />
          <Tab label="Payment Success" />
          <Tab label="Delivered" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>

        {tabsContent[tabValue]}

        <Dialog
          open={openPaymentModal}
          onClose={handleClosePaymentModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose Payment Method
          </DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="paymentMethod"
                name="paymentMethod"
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label="Momo"
                />
                <FormControlLabel
                  value="banking"
                  control={<Radio />}
                  label="Banking"
                />
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
      </div>

      <Footer />
    </motion.div>
  );
}

export default DeliveryHistoryPage;
