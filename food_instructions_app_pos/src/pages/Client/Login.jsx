import { useState } from "react";
import bgImage from "../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { motion } from "framer-motion";
import Headers from "../../components/Client/Headers";
import NavBar from "../../components/Client/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginClient() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`http://localhost:8001/account/login`, formData).then((res) => {
        if (res.data.status) {
          toast.success("Đăng nhập thành công", {
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
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      });
    } catch (err) {
      toast.error(err, {
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
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
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
            width: "100vw",
          }}></Box>
        <Box sx={{ display: "flex", position: "relative", top: "1.5rem", left: "5rem" }}>
          <GiKnifeFork style={{ fontSize: "6rem" }} />

          <Box sx={{ pl: 3, width: "80%" }}>
            <Box sx={{ color: "black", fontSize: "2.8rem", fontWeight: 700, margin: "28px 0px" }}>Login</Box>
            <div style={{ fontSize: "24px" }}>
              <p>Browse Just One Cookbook with NO Ads! Learn more about JOC PLUS here.</p>
              <p>Enter your username and password below.</p>
            </div>

            <Box sx={{ display: "flex", alignItems: "center", width: "88%" }}>
              <Box sx={{ mt: 8, display: "flex", flexDirection: "column" }}>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "96px",
                      margin: "12px 0px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <p>Username</p>
                    <TextField
                      fullWidth
                      id="username"
                      label="Username"
                      variant="outlined"
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "100px",
                      margin: "12px 0px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <p>Password</p>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      variant="outlined"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      margin: "12px 0px",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "76px ",
                        alignItems: "center",
                        width: "100%",
                        marginLeft: "-16px",
                      }}>
                      <FormControlLabel
                        color="success"
                        labelPlacement="start"
                        label="Remember me"
                        control={<Checkbox defaultChecked />}
                      />{" "}
                      <Button type="submit" variant="outlined">
                        Login
                      </Button>
                    </div>

                    <Link style={{ marginLeft: "214px" }} href={"/forgot-password"}>
                      Forgot password
                    </Link>

                    <div style={{ marginLeft: "214px", display: "flex", gap: "4px" }}>
                      <p>Create an account at </p>
                      <Link href={"/sign-up"}>Sign Up</Link>
                    </div>
                  </div>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </motion.div>
  );
}

export default LoginClient;
