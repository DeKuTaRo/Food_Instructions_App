import { useState } from "react";
import bgImage from "../../../images/bg1.png";
import { Box } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";

function SignUp() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (imageValue) => {
    setAvatar(imageValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password) {
      toast.error("Mật khẩu không khớp nhau", {
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
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("file", avatar);
        const response = await axios.post(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/signup`, data);

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
          navigate("/login-plus");
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
            <Box
              sx={{
                color: "black",
                fontSize: "2.8rem",
                fontWeight: 700,
                margin: "28px 12px ",
              }}>
              Sign Up
            </Box>
            <div style={{ fontSize: "24px", marginLeft: "12px" }}>
              <p>
                You need to fill in the information to <b>register</b>{" "}
              </p>
            </div>

            <Box sx={{ display: "flex", alignItems: "center", width: "88%" }}>
              <Box
                sx={{
                  mt: 2,
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

                      justifyContent: "center",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "28px",
                        margin: "12px 12px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        justifyContent: "center",
                        width: "30%",
                      }}>
                      <ImageUpload
                        onImageUpload={handleImageChange}
                        imageData={avatar}
                        titleImage={formData.username}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>

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
                      value={formData.username}
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
                      value={formData.email}
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
                      type="password"
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
                      type="password"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
      <Footer />
    </motion.div>
  );
}

export default SignUp;
