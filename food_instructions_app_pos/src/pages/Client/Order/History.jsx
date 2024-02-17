// Import necessary components and modules
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate  } from "react-router-dom";
import { Typography, Paper, Button, Grid, CardMedia, Tab, Tabs, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, } from '@mui/material';
import { motion } from 'framer-motion';
import Headers from '../../../components/Client/Headers';
import NavBar from '../../../components/Client/Navbar';
import Footer from '../../../components/Client/Footer';
import drink from '../../../images/drink.jpg';
import soup from '../../../images/soup.jpg';

const orders = [
  { id: 1, date: '2024-02-15', status: 'Delivered', total: 25.99, product: { name: 'Product A', image: `${soup}` } },
  { id: 2, date: '2024-02-14', status: 'Pending', total: 32.50, product: { name: 'Product B', image: `${drink}` } },
  { id: 3, date: '2024-02-13', status: 'Cancelled', total: 15.00, product: { name: 'Product C', image: `${drink}` } },
  { id: 4, date: '2024-02-12', status: 'Delivered', total: 50.00, product: { name: 'Product D', image: `${soup}` } },
  { id: 5, date: '2024-02-11', status: 'Pending', total: 40.00, product: { name: 'Product E', image: `${soup}` } },
  { id: 6, date: '2024-02-10', status: 'Cancelled', total: 22.50, product: { name: 'Product F', image: `${drink}` } },
  { id: 7, date: '2024-02-09', status: 'Ordered', total: 18.75, product: { name: 'Product G', image: `${soup}` } },
  { id: 8, date: '2024-02-08', status: 'Ordered', total: 27.50, product: { name: 'Product H', image: `${drink}` } },
  // Add more orders as needed
];

function DeliveryHistoryPage() {
  const [tabValue, setTabValue] = useState(0);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const navigate = useNavigate();
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancelOrder = (orderId) => {
    setCancelOrderId(orderId);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
    setCancelOrderId(null);
  };

  const handleConfirmCancelOrder = () => {
    // Handle cancel order logic here
    // For example, you can update the order status to 'Cancelled'
    // and then reload the orders or update the state accordingly
    setOpenCancelDialog(false);
    setCancelOrderId(null);
  };
   const handleReorder = (orderId) => {
    // Add logic to handle reorder, for example, redirect to the ordering page
   navigate("/recipe/https%3A%2F%2Fapi.edamam.com%2Fapi%2Frecipes%2Fv2%2F8275bb28647abcedef0baaf2dcf34f8b%3Ftype%3Dpublic%26app_id%3D38a85a3c%26app_key%3Da76067e30a5ceab738d9b7cb91a404fe");
    // You can redirect or perform other actions here
  };

  const filteredOrders = (status) => orders.filter((order) => order.status === status);

  const PendingTabContent = () => (
     <div>
      <Typography variant="h5">Pending Orders</Typography>
      {filteredOrders('Pending').map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: '1rem', margin: '1rem 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.product.name}
                height="240"
                image={order.product.image}
                style={{ borderRadius: '8px', width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: '0 1rem' }}>
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
                  Total: ${order.total.toFixed(2)}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  SDT Tài xế: {order.driverPhone}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Tên tài xế: {order.driverName}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Thời gian nhận hàng dự kiến: {order.expectedDeliveryTime}
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
        <DialogContent>
          Are you sure you want to cancel this order?
        </DialogContent>
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

  const DeliveredTabContent = () => (
   <div>
      <Typography variant="h5">Delivered Orders</Typography>
      {filteredOrders('Delivered').map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: '1rem', margin: '1rem 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.product.name}
                height="240"
                image={order.product.image}
                style={{ borderRadius: '8px', width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: '0 1rem' }}>
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
                  Total: ${order.total.toFixed(2)}
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

  const CancelledTabContent = () => (
    <div>
    <Typography variant="h5"> Cancelled Orders</Typography>
     {filteredOrders('Cancelled').map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: '1rem', margin: '1rem 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.product.name}
                height="240"
                image={order.product.image}
                style={{ borderRadius: '8px', width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: '0 1rem' }}>
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
                  Total: ${order.total.toFixed(2)}
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

  const OrderedTabContent = () => (
    <div>
      <Typography variant="h5">Orders Placed</Typography>
      {filteredOrders('Ordered').map((order) => (
        <Paper key={order.id} elevation={3} style={{ padding: '1rem', margin: '1rem 0' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                alt={order.product.name}
                height="240"
                image={order.product.image}
                style={{ borderRadius: '8px', width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ padding: '0 1rem' }}>
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
                  Total: ${order.total.toFixed(2)}
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
        <DialogContent>
          Are you sure you want to cancel this order?
        </DialogContent>
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

  const tabsContent = [
    <OrderedTabContent />,
    <PendingTabContent />,
    <DeliveredTabContent />,
    <CancelledTabContent />,
   
  ];

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ margin: '0% 10%' }}>
      <Headers />
      <NavBar />

      <div style={{ textAlign: 'center', margin: '0% 10%' }}>
        <Typography variant="h4">Delivery History</Typography>

        <Tabs value={tabValue} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" centered>
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