import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import internetBankingImage from "../../../images/QRbank.png"; // Replace with the actual path to your image

const InternetBankingPaymentPage = () => {
  const location = useLocation();
  const { paymentInfo } = location.state || {};
  const internetBankingImageSrc = internetBankingImage;
  const navigate = useNavigate();

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

      {/* Title */}
      <Typography variant="h3" style={{ marginTop: "20px", textAlign: "center" }}>
        Payment to Continue Ordering
      </Typography>

      <Grid
        container
        spacing={3}
        style={{ marginTop: "20px", textAlign: "center", height: "100%" }}
      >
        {/* Information about the available transfer methods */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <CardContent>
              <Typography variant="h6">
                Additional Transfer Information
              </Typography>

              <Typography variant="h6" style={{}}>
                You can choose one of the following methods for the bank
                transfer
              </Typography>
              <Typography variant="h6" style={{}}>
                You must enter the content below correctly
              </Typography>
              <Typography variant="h6" style={{}}>
                Once you have paid, please follow the order, we will always
                update as quickly as possible
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        {/* Card Internet Banking Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ height: "100%" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Internet Banking</Typography>
              <img
                src={internetBankingImageSrc}
                alt="Internet Banking"
                style={{ margin: "20px auto", width: "80%" }}
              />
              <Typography variant="subtitle1">
                Follow the instructions on your Internet Banking platform
              </Typography>
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
              }}
            >
              <Typography variant="h5" marginBottom={3}>
                Bank Transfer Information
              </Typography>
              <TextField
                label="Bank"
                value="Vietcombank"
                InputProps={{
                  readOnly: true,
                  style: { marginBottom: "8px", fontSize: "1rem" },
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Account Holder"
                value="CAO THANH TAI"
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
                value="1014653610"
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
                value={`$${paymentInfo.totalPrice.toFixed(2)}`}
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
                value={`${paymentInfo.productName}-${paymentInfo.userName}-${paymentInfo.phone}-${paymentInfo.quantity}`}
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

        {/* Additional Transfer Information */}
      </Grid>

      {/* Button to Purchase History */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/history")}
        >
          Purchase history
        </Button>
      </div>

      <Footer />
    </motion.div>
  );
};

export default InternetBankingPaymentPage;
