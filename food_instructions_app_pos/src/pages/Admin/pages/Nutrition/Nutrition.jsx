import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { HeaderWithSidebar } from "../../../../components/Admin/HeaderWithSidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const defaultTheme = createTheme();

// Generate Order Data
function createData(id, imageNutrition, userName) {
  return { id, imageNutrition, userName };
}

const rows = [
  createData(0, "https://th.bing.com/th/id/OIP.1ua_uJ3VTX9pIm4ZRIZQnAHaHa?rs=1&pid=ImgDetMain", "Cà chua"),
  createData(1, "https://th.bing.com/th/id/OIP.1ua_uJ3VTX9pIm4ZRIZQnAHaHa?rs=1&pid=ImgDetMain", "Khoai tây"),
  createData(2, "https://th.bing.com/th/id/OIP.1ua_uJ3VTX9pIm4ZRIZQnAHaHa?rs=1&pid=ImgDetMain", "Cà rốt"),
  createData(3, "https://th.bing.com/th/id/OIP.1ua_uJ3VTX9pIm4ZRIZQnAHaHa?rs=1&pid=ImgDetMain", "Củ cải"),
  createData(4, "https://th.bing.com/th/id/OIP.1ua_uJ3VTX9pIm4ZRIZQnAHaHa?rs=1&pid=ImgDetMain", "Chanh"),
];

function ANutrition() {
  const commonStyles = {
    height: "auto",
    // Add any other shared styles here
  };

  const imageStyles = {
    ...commonStyles,
    width: "200px", // Default width for larger screens
  };

  const mobileStyles = {
    ...commonStyles,
    width: "60px", // Width for mobile screens
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID_NUTRITION}&app_key=${process.env.APP_KEY_NUTRITION}&nutrition-type=cooking&ingr=%5B%221%20cup%20rice%2C%22%2C%20%221%20fried%20chicken%2C%22%2C%20%22%22%5D`
    );
    const detailData = await data.json();

    setDetails(detailData);
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderWithSidebar title="Nutrition" />

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
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <img
                            src={row.imageIngredient}
                            alt=""
                            style={
                              window.innerWidth <= 600 // Check window width for mobile screens
                                ? mobileStyles
                                : imageStyles
                            }
                          />
                        </TableCell>
                        <TableCell>{row.userName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Link color="primary" href="#" sx={{ mt: 3 }}>
                  See more orders
                </Link>

                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
                  <DialogTitle>Ingredient form</DialogTitle>
                  <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="nameIngredient"
                      label="Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>{" "}
            </Paper>{" "}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ANutrition;
