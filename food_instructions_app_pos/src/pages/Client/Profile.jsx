import { useEffect, useState } from "react";
import bgImage from "../../images/bg1.png";
import { Box, Typography } from "@mui/material";
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

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [detailAccount, setDetailAccount] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getAccountDetail = async () => {
      try {
        axios
          .get(`http://localhost:8001/account/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log("res =", res);
            setDetailAccount(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getAccountDetail();
  }, []);

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
            right: "-9%",
            width: "100vw",
          }}></Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            top: "1.5rem",
            left: "5rem",
          }}>
          <GiKnifeFork style={{ fontSize: "6rem" }} />

          <Box sx={{ pl: 3, width: "80%" }}>
            <Typography
              sx={{
                color: "black",
                fontSize: "2.8rem",
                fontWeight: 700,
                margin: "1.5rem 12px ",
              }}>
              Profile
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", width: "88%" }}>
              <Box
                sx={{
                  mt: 8,
                  display: "flex",
                  flexDirection: "column",
                  width: "100vh",
                  margin: "",
                }}>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "28px",
                      margin: "12px 12px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="Username *"
                      variant="outlined"
                      value={detailAccount.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "100px",
                      margin: "12px 12px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address *"
                      variant="outlined"
                      value={detailAccount.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "100px",
                      margin: "12px 12px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password *"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "100px",
                      margin: "12px 12px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm password *"
                      variant="outlined"
                      //   value={confirmPassword}
                      //   onChange={(e) => setConfirmPassword(e.target.value)}
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
                        marginLeft: "10px",
                      }}>
                      <FormControlLabel
                        color="success"
                        labelPlacement="end"
                        label="Are you sure of the above information
"
                        control={<Checkbox defaultChecked />}
                      />{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "97% ",
                        margin: "12px",
                      }}>
                      <Button type="submit" variant="contained" style={{ width: "100%", padding: "12px" }}>
                        Register
                      </Button>
                    </div>

                    <div style={{ display: "flex", gap: "8px", margin: "12px 12px" }}>
                      <p>Have an account ? </p>
                      <Link href={"/login-plus"}>Login</Link>
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

export default Profile;
