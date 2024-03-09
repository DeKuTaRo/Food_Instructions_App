import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CssBaseline,
  Toolbar,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";
import { toast } from 'react-toastify';
import { styled } from "@mui/system";




const defaultTheme = createTheme();

function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:8004/order/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.data.data);
    } catch (err) {
      console.error(err);
    }
  };

const StyledTabs = styled(Tabs)(({ theme }) => ({
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.success.main, // Set the indicator color
    },
  }));

  const StyledTab = styled(Tab)(({ theme }) => ({
    "&.Mui-selected": {
      color: theme.palette.success.main, // Set the text color of the selected tab
    },
  }));



  useEffect(() => {
    getUserData();

    const interval = setInterval(() => {
      getUserData(); // Fetch orders every minute
    }, 60000);

    return () => clearInterval(interval);
  }, [token]);

  const handleUpdateSuccessPayment = async (orderId, type) => {
    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8004/order/update/${orderId}`,
        {
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
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
          })}}
         
          );
           getUserData()
      
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = (status) =>
    orders.filter((order) => order.status === status);

  const ManagerNotPayment = () => (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders("NotPayment").map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleUpdateSuccessPayment(
                              order._id,
                              "PaymentSuccess"
                            )
                          }
                          disabled={loading}
                        >
                          Mark as Payment Success
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      </Paper>
    </Container>
  );

  // ... (similarly update other Manager   components)
  const ManagerPaymentSuccess = () => (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders("PaymentSuccess").map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleUpdateSuccessPayment(order._id, "Delivered")
                          }
                          disabled={loading}
                        >
                          Mark as Delivered
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      </Paper>
    </Container>
  );

  const ManagerDelevered = () => (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders("Delivered").map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleUpdateSuccessPayment(order._id, "Completed")
                          }
                          disabled={loading}
                        >
                          Mark as Completed
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      </Paper>
    </Container>
  );

  const ManagerCompleted = () => (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders("Completed").map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleUpdateSuccessPayment(order._id, "Cancelled")
                          }
                          disabled={loading}
                        >
                          Mark as Cancelled
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      </Paper>
    </Container>
  );

  const ManagerCancelled = () => (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <React.Fragment>
          <div style={{ margin: "20px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders("Cancelled").map((order, index) => (
                    <TableRow key={order._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phoneNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      </Paper>
    </Container>
  );

  const tabsContent = [
    <ManagerNotPayment />,
    <ManagerPaymentSuccess />,
    <ManagerDelevered />,
    <ManagerCompleted />,
    <ManagerCancelled />,
  ];

   return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <HeaderWithSidebar title="Order Management" />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <React.Fragment  sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div style={{ textAlign: "center" }}>
                    <StyledTabs
                      value={tabValue}
                      onChange={handleChangeTab}
                      indicatorColor="primary"
                      textColor="primary"
                      centered
                    >
                      <StyledTab sx={{fontWeight:"600" , fontStyle:"1.2rem"}} label="Not Payment" />
                      <StyledTab sx={{fontWeight:"600" , fontStyle:"1.2rem"}} label="Payment Success" />
                      <StyledTab sx={{fontWeight:"600" , fontStyle:"1.2rem"}} label="Delivered" />
                      <StyledTab sx={{fontWeight:"600" , fontStyle:"1.2rem"}} label="Completed" />
                      <StyledTab sx={{fontWeight:"600" , fontStyle:"1.2rem"}} label="Cancelled" />
                    </StyledTabs>
                    {tabsContent[tabValue]}
                  </div>
                </React.Fragment>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </motion.div>
  );
};


export default AdminOrderManagement;
