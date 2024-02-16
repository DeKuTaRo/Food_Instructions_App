// DeliveryHistoryPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Paper, Button, Grid, CardMedia } from '@mui/material';
import Headers from '../../../components/Client/Headers';
import NavBar from '../../../components/Client/Navbar';
import Footer from '../../../components/Client/Footer';
import { motion } from "framer-motion";
import drink from "../../../images/drink.jpg";
import soup from "../../../images/soup.jpg";
const orders = [
  // Mock data for orders, replace with actual data from your backend
  { id: 1, date: '2024-02-15', status: 'Delivered', total: 25.99, product: { name: 'Product A', image: `${soup}` } },
  { id: 2, date: '2024-02-14', status: 'Pending', total: 32.50, product: { name: 'Product B', image: `${drink}` } },
  // Add more orders as needed
];

function DeliveryHistoryPage() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />

      <div style={{ textAlign: 'center', margin: '0% 10%' }}>
        <Typography variant="h4">Delivery History</Typography>

        {orders.map(order => (
          <Paper key={order.id} elevation={3} style={{ padding: '1rem', margin: '1rem 0' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* Card Media (Left Side) */}
                <CardMedia
                  component="img"
                  alt={order.product.name}
                  height="240"
                  image={order.product.image}
                  style={{ borderRadius: '8px', width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                {/* Information (Right Side) */}
                <div style={{ padding: '0 1rem' }}>
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Date: {order.date}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status: {order.status}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total: ${order.total.toFixed(2)}
                  </Typography>
                  <Link to={`/delivery-history/${order.id}`}>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>

      <Footer />
    </motion.div>
  );
}

export default DeliveryHistoryPage;
