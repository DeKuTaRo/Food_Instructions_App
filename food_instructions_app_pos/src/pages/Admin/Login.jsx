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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:5000/account/login", formData)
        .then((res) => {
          if (!res.data.status) {
            toast.error(res.data.msg.vn, {
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
            toast.success(res.data.msg.vn, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          toast.error(err.response.msg.vn, {
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

      // console.log("Form submitted:", response);
      // Handle success or any further action here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error here
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
            < >Browse Just One Cookbook with NO Ads! Learn more about JOC PLUS here.</>
            <p>Enter your username and password below.</p>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p>Username</p>
                <TextField
                  label="username"
                  variant="outlined"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p>Password</p>
                <TextField
                  label="password"
                  variant="outlined"
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
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
          height:"100%",
          bottom:"0"
        }}></Box>
    </div>
  );
}

export default Login;
