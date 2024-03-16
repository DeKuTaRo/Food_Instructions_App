import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Paper, Avatar, InputAdornment } from "@mui/material";
import { GiKnifeFork } from "react-icons/gi";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import AvatarDefault from "../../../images/avatar.png";
import { Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

const Profile = () => {
  const imageRef = useRef(null);

  const [readOnlyUsername, setReadOnlyUsername] = useState(true);
  const [readOnlyEmail, setReadOnlyEmail] = useState(true);

  const [avatarUser, setAvatarUser] = useState(null);
  const [avatarPost, setAvatarPost] = useState(null);
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvatarUser(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/${res.data.path}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [token]);

  const handleImageUpload = () => {
    imageRef.current.click();
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setAvatarPost(image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUser(reader.result);
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("file", avatarPost);
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/changePassword`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        handleClose();
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
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau", {
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
              src={avatarUser ? avatarUser : AvatarDefault}
              alt="Avatar"
              sx={{ cursor: "pointer", width: 200, height: 200, mb: 2 }}
              onClick={handleImageUpload}
            />
            <Input
              type="file"
              inputRef={imageRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="mainImage"
              accept="image/*"
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
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: "100vh",
                  padding: "1rem",
                }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username *"
                    variant="outlined"
                    value={userData.username}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: readOnlyUsername,
                      style: { color: "gray", cursor: "pointer" },
                      endAdornment: <EditIcon />,
                      onClick: () => setReadOnlyUsername(false),
                    }}
                    sx={{ margin: "1rem 0" }}
                  />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email *"
                    variant="outlined"
                    value={userData.email}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: readOnlyEmail,
                      style: { color: "gray", cursor: "pointer" },
                      endAdornment: <EditIcon />,
                      onClick: () => setReadOnlyEmail(false),
                    }}
                    sx={{ margin: "1rem 0" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "16px",
                      margin: "12px 0px",
                    }}>
                    <Button type="submit" variant="contained" sx={{ width: "100%", padding: "12px" }}>
                      Update Profile
                    </Button>
                    <Button variant="contained" sx={{ width: "100%", padding: "12px" }} onClick={handleClickOpen}>
                      Change password
                    </Button>
                    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
                      <DialogTitle>Change password</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="oldPassword"
                          name="oldPassword"
                          label="Old password"
                          type="password"
                          fullWidth
                          variant="standard"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="newPassword"
                          name="newPassword"
                          label="New Password"
                          type="password"
                          fullWidth
                          variant="standard"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleChangePassword}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <Chatbot />
    </motion.div>
  );
};

export default Profile;
