import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  InputLabel,
  TextareaAutosize,
  Breadcrumbs,
  Link,
  Grid,
  CssBaseline,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";
import withAuthorization from "../../utils/auth";
import ImageUpload from "./ImageUpload";

const defaultTheme = createTheme();

function ATopicForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const handleImageChange = (imageValue) => {
    setMainImage(imageValue);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [fills, setFills] = useState("");
  const [type, setType] = useState("");

  const handleSubmitTopic = async () => {
    try {
      const data = new FormData();
      data.append("file", mainImage);
      data.append("title", title);
      data.append("description", description);
      data.append("history", history);
      data.append("fills", fills);
      data.append("type", type);
      const response = await axios.post(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/addNew`, data);
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
        navigate("/a-topic");
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
  };

  const getDetailTopic = async () => {
    if (id !== "0") {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/getDetail`, {
          params: {
            id: id,
          },
        });
        setTitle(response.data.topics.title);
        setDescription(response.data.topics.description);
        setHistory(response.data.topics.history);
        setFills(response.data.topics.fills);
        setType(response.data.topics.type);
        setMainImage(response.data.topics.mainImage);
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

  useEffect(() => {
    getDetailTopic();
  }, []);

  const handleUpdateTopic = async () => {
    try {
      const data = new FormData();
      data.append("file", mainImage);
      data.append("title", title);
      data.append("description", description);
      data.append("history", history);
      data.append("fills", fills);
      data.append("type", type);
      data.append("id", id);
      const response = await axios.put(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/updateTopic`, data);
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
        navigate("/a-topic");
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
  };
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <HeaderWithSidebar title="Food" />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
              height: "100vh",
              width: "100%",
              marginTop: "4rem",
            }}>
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "2rem" }}>
                <Link underline="hover" color="inherit" href="/a-topic">
                  Topics
                </Link>
                {id !== "0" && <Typography color="text.primary">{title}</Typography>}
              </Breadcrumbs>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <ImageUpload onImageUpload={handleImageChange} imageData={mainImage} titleImage={title} />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="titleTopic"
                    type="text"
                    label="Title"
                    variant="standard"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title topic here ..."
                  />

                  <InputLabel htmlFor="descriptionTopic">Desciption</InputLabel>
                  <TextareaAutosize
                    id="descriptionTopic"
                    placeholder="Description"
                    minRows={4}
                    style={{ width: "100%", padding: "0.5rem" }}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <InputLabel htmlFor="descriptionTopic">History</InputLabel>
                  <TextareaAutosize
                    id="historyTopic"
                    placeholder="History"
                    minRows={4}
                    style={{ width: "100%", padding: "0.5rem" }}
                    name="history"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  />

                  <InputLabel htmlFor="descriptionTopic">Fills</InputLabel>
                  <TextareaAutosize
                    id="fillsTopic"
                    placeholder="Fills"
                    minRows={4}
                    style={{ width: "100%", padding: "0.5rem" }}
                    name="fills"
                    value={fills}
                    onChange={(e) => setFills(e.target.value)}
                  />

                  <InputLabel htmlFor="descriptionTopic">Type</InputLabel>
                  <TextareaAutosize
                    id="typeTopic"
                    placeholder="Type"
                    minRows={4}
                    style={{ width: "100%", padding: "0.5rem" }}
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />

                  <Button>Cancel</Button>
                  {id !== "0" ? (
                    <Button onClick={handleUpdateTopic}>Update</Button>
                  ) : (
                    <Button onClick={handleSubmitTopic}>Save</Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </motion.div>
  );
}

export default withAuthorization(ATopicForm);
