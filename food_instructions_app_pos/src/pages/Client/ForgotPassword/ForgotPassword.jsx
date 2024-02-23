import bgImage from "../../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";

import { Typography, Button, TextField } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/forgotPassword`, {
        email,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(response.data.msg, {
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
    } catch (err) {
      toast.success("Có lỗi không xác định xảy ra", {
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
    <div style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
          position: "absolute",
          left: "-10%",
          right: "-10%",
        }}></Box>
      <Box sx={{ display: "flex", position: "relative", top: "1.5rem", left: "10rem" }}>
        <GiKnifeFork style={{ fontSize: "6rem" }} />

        <Box sx={{ pl: 3 }}>
          <Box sx={{ color: "black", fontSize: "2rem", fontWeight: 700 }}>Forgot Password</Box>
          <Box sx={{ mt: 8 }}>
            <Typography>Forgot your password? Enter your email address below to reset:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <Button variant="outlined" onClick={handleSubmitEmail}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ForgotPassword;
