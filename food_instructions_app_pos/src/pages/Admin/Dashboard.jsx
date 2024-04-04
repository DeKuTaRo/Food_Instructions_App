import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "./Chart";
import PieChart from "./PieChart"; // Import your PieChart component
import axios from "axios";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { HeaderWithSidebar } from "../../components/Admin/HeaderWithSidebar";
import withAuthorization from "./utils/auth";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Dashboard() {
  const [orderData, setOrderData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/allOrder`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(res.data.data.data);
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderWithSidebar title="Dashboard" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart orderData={orderData} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits orderData={orderData} />
                </Paper>
              </Grid>
              {/* Pie Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 450,
                    width:1000,
                  }}
                >
                  <PieChart orderData={orderData} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default withAuthorization(Dashboard);
