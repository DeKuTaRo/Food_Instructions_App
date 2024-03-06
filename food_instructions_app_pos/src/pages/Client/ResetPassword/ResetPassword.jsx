import bgImage from "../../../images/bg1.png";
import { Box, Link } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";

import { Typography, Button, TextField } from "@mui/material";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if ((password === "") | (confirmPassword === "")) {
      toast.error("Mật khẩu không được để trống", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu phải giống nhau", {
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
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/resetPassword`, {
          params: {
            password: password,
            confirmPassword: confirmPassword,
            token: token,
          },
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
        } else if (response.data.statusCode === 500) {
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
        console.log("response = ", response);
      } catch (err) {
        toast.error("Có lỗi xảy ra", {
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
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
              <form onSubmit={handleSubmitEmail}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              </form>
              <Typography>
                Return to
                <Link href="/login-plus" underline="hover">
                  login page
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ResetPassword;
