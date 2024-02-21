import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu cập nhật lên server, bạn có thể sử dụng axios.put hoặc endpoint tương ứng
      // Ví dụ: const res = await axios.put('http://localhost:8001/account/profile', userData);

      toast.success("Cập nhật thông tin thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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

  

  const [fileInput, setFileInput] = useState(null);

  const handleAvatarClick = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Handle the selected file as needed (e.g., upload to server, update state, etc.)
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div style={{ margin: "0% 10%" }}>
        <Headers />
        <NavBar />
       <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "1.5rem",
          }}>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "1rem",
              alignItems: "center",
            }}>
            <Avatar
              src={userData.avatar}
              alt="Avatar"
              sx={{ cursor: "pointer", width: 120, height: 120, mb: 2 }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={(input) => setFileInput(input)}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Typography
              sx={{
                color: "black",
                fontSize: "2.8rem",
                fontWeight: 700,
                mb: 2, // Adjust bottom margin
              }}>
              Profile
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component={Paper}
                elevation={3}
                sx={{
                  mt: 8,
                  display: "flex",
                  flexDirection: "column",
                  width: "100vh",
                  margin: "",
                  padding: "1rem",
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
                    <Avatar
                      src={userData.avatar}
                      alt="Avatar"
                      sx={{ cursor: "pointer" }}
                      onClick={handleAvatarClick}
                    />
                    <TextField
                      fullWidth
                      id="fullName"
                      name="fullName"
                      label="Full Name *"
                      variant="outlined"
                      value={userData.fullName}
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
                      id="username"
                      name="username"
                      label="Username *"
                      variant="outlined"
                      value={userData.username}
                      onChange={handleChange}
                      InputProps={{ readOnly: true, style: { color: "gray" } }}
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
                      id="phone"
                      name="phone"
                      label="Phone *"
                      variant="outlined"
                      value={userData.phone}
                      onChange={handleChange}
                      InputProps={{ readOnly: true, style: { color: "gray" } }}
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
                      label="Email *"
                      variant="outlined"
                      value={userData.email}
                      onChange={handleChange}
                      InputProps={{ readOnly: true, style: { color: "gray" } }}
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
                      id="address"
                      name="address"
                      label="Address"
                      variant="outlined"
                      value={userData.address}
                      onChange={handleChange}
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
                      <Button type="submit" variant="contained" style={{ width: "100%", padding: "12px" }}>
                        Update Profile
                      </Button>
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
};

export default Profile;
