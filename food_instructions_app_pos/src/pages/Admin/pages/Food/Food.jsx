import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { HeaderWithSidebar } from "../../../Admin/components/HeaderWithSidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useRef, useEffect } from "react";
import { Input } from "@mui/material";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resizer from "react-image-file-resizer";

const defaultTheme = createTheme();

const VideoUpload = ({ onVideoUpload, videoData }) => {
  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  console.log("videoData= ", videoData);

  // Handle initial setting of selected video when the component receives new data
  // useEffect(() => {
  //   if (videoData && videoData.name) {
  //     const blob = new Blob([videoData], { type: videoData.type });
  //     setSelectedVideo(URL.createObjectURL(blob));
  //   }
  // }, [videoData]);

  const handleVideoUpload = () => {
    videoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedVideo(reader.result);
      onVideoUpload(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  // const handleVideoChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     const reader = new FileReader();

  //     reader.onload = async () => {
  //       const videoData = {
  //         name: selectedFile.name,
  //         size: selectedFile.size,
  //         type: selectedFile.type,
  //       };

  //       onVideoUpload(videoData);
  //     };

  //     reader.readAsDataURL(selectedFile);
  //     setSelectedVideo(URL.createObjectURL(selectedFile));
  //   }
  // };

  const handleClearVideo = () => {
    setSelectedVideo(null);
  };
  return (
    <>
      <Input
        type="file"
        inputRef={videoRef}
        style={{ display: "none" }}
        onChange={handleVideoChange}
        accept="video/*"
      />
      <Button variant="contained" onClick={handleVideoUpload}>
        Upload Video
      </Button>
      {selectedVideo && (
        <Paper elevation={3} style={{ marginTop: "1rem", padding: "0.5rem", position: "relative" }}>
          <IconButton
            onClick={handleClearVideo}
            style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
            size="small">
            <CloseIcon />
          </IconButton>
          <video width="320" height="240" controls>
            <source src={selectedVideo} type={"video/mp4"} />
            Your browser does not support the video tag.
          </video>
        </Paper>
      )}
    </>
  );
};

const ImageUpload = ({ onImageUpload, imageData }) => {
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imageData) {
      setSelectedImage(imageData);
    }
  }, [imageData]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      onImageUpload(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <Input
        type="file"
        inputRef={imageRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <Button variant="contained" onClick={handleImageUpload}>
        Upload Image
      </Button>
      {selectedImage && (
        <Paper elevation={3} style={{ marginTop: "1rem", padding: "0.5rem", position: "relative" }}>
          <IconButton
            onClick={handleClearImage}
            style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
            size="small">
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: "320px", maxHeight: "240px" }} />
        </Paper>
      )}
    </>
  );
};

const FoodDialog = ({
  open,
  handleClose,
  formData,
  handleChange,
  handleVideoChange,
  handleImageChange,
  valueDetail,
}) => {
  console.log("formData = ", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData = ", formData);
    try {
      axios
        .post(`${process.env.REACT_APP_URL_API}/food/register`, formData)
        .then((res) => {
          console.log("res = ", res);
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
            handleClose();
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    } catch (error) {
      toast.error(error.response.msg.vn, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }); // Handle error here
    }
  };

  console.log("valueDetail = ", valueDetail);

  // Handle the case when valueDetail is undefined or null before it's loaded
  const getValueDetail = (key) => {
    return valueDetail?.result?.data?.[key] || formData[key] || "";
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Food form</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            <Box gridColumn="span 6">
              {" "}
              <TextField
                autoFocus
                margin="dense"
                id="nameFood"
                label="Name"
                type="text"
                variant="standard"
                fullWidth
                name="name"
                value={getValueDetail("name")}
                onChange={handleChange}
              />
            </Box>
            <Box gridColumn="span 6">
              <TextField
                autoFocus
                margin="dense"
                id="originalFood"
                label="Original"
                type="text"
                variant="standard"
                fullWidth
                name="original"
                value={getValueDetail("original")}
                onChange={handleChange}
              />
            </Box>
            <Box gridColumn="span 6">
              <InputLabel htmlFor="descFood">Description</InputLabel>
              <TextareaAutosize
                id="descFood"
                placeholder="Description"
                minRows={4}
                style={{ width: "100%", padding: "0.5rem" }}
                value={getValueDetail("description")}
                name="description"
                onChange={handleChange}
              />
            </Box>
            <Box gridColumn="span 6">
              <InputLabel htmlFor="instrucFood">Instructions</InputLabel>
              <TextareaAutosize
                id="instrucFood"
                placeholder="Instructions"
                minRows={4}
                style={{ width: "100%", padding: "0.5rem" }}
                value={getValueDetail("instructions")}
                name="instructions"
                onChange={handleChange}
              />
            </Box>
            <Box gridColumn="span 6">
              <VideoUpload
                onVideoUpload={handleVideoChange}
                // videoData={getValueDetail("video")}
                // videoData={valueDetail != null ? valueDetail.result.data.video : ""}
              />
            </Box>
            <Box gridColumn="span 6">
              <ImageUpload onImageUpload={handleImageChange} imageData={getValueDetail("image")} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

function Food() {
  const [allFoodData, setAllFoodData] = useState({});
  const [allFoodDataTable, setAllFoodDataTable] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/food/getAll`);
        setAllFoodData(data);
        setAllFoodDataTable(data.data.result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [formData, setFormData] = useState({
    name: "",
    original: "",
    description: "",
    instructions: "",
    video: "",
    image: "",
  });

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      original: "",
      description: "",
      instructions: "",
      video: "",
      image: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVideoChange = (videoValue) => {
    setFormData((prevData) => ({
      ...prevData,
      video: videoValue,
    }));
  };

  const handleImageChange = (imageValue) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageValue,
    }));
  };

  const [valueDetail, setValueDetail] = useState({});

  const handleGetDetailFood = async (id) => {
    setOpen(true);
    try {
      const response = await axios.get(`http://localhost:5000/food/getDetail/${id}`);
      setValueDetail(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderWithSidebar title="Food" />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <React.Fragment>
                <Title>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add new <AddIcon />
                  </Button>
                </Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Original</TableCell>
                      <TableCell>Manipulation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allFoodDataTable &&
                      allFoodDataTable.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.original}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => handleGetDetailFood(row._id)}>
                              <EditIcon />
                            </Button>
                            <Button variant="outlined">
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <Link color="primary" href="#" sx={{ mt: 3 }}>
                  See more orders
                </Link>
              </React.Fragment>{" "}
            </Paper>{" "}
          </Container>
        </Box>
      </Box>
      {open && (
        <FoodDialog
          open={open}
          handleClose={handleClose}
          formData={formData}
          handleChange={handleChange}
          handleVideoChange={handleVideoChange}
          handleImageChange={handleImageChange}
          valueDetail={valueDetail}
        />
      )}
    </ThemeProvider>
  );
}

export default Food;
