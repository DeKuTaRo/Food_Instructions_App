import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsernam] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/login`, formData)
        .then((res) => {
          console.log("res = ", res);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          if (res.data.isAdmin === true) {
            toast.success("Login  successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLogin", "true");

            navigate("/dashboard");
          } else {
            toast.error("Username or password is incorrect", {
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
        })
        .catch((err) => {
          toast.error("An error occurred, please try again later", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } catch (error) {
      toast.error("An error occurred, please try again later", {
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
    <div>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
        }}></Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <GiKnifeFork style={{ fontSize: "6rem" }} />

        <Box sx={{ pl: 3 }}>
          <Box sx={{ color: "black", fontSize: "2rem", fontWeight: 700 }}>Login ADMIN</Box>
          <Box sx={{ mt: 8 }}>
            <>Browse Just One Cookbook with NO Ads! Learn more about JOC PLUS here.</>
            <p>Enter your username and password below.</p>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p>Username</p>
                <TextField
                  label="username"
                  variant="outlined"
                  value={username}
                  name="username"
                  onChange={(e) => setUsernam(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p>Password</p>
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />{" "}
                <Button variant="outlined" type="submit">
                  Login
                </Button>
                <Link href={"/forgot-password"}>Forgot password</Link>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          padding: "3rem 0",
          margin: "0 auto 1.25rem",
          height: "100%",
          bottom: "0",
        }}></Box>
    </div>
  );
}

export default Login;
