import * as React from "react";
import { useState, useEffect } from "react";
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

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Skeleton } from "@mui/material";

const defaultTheme = createTheme();

function ARecipe() {
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

  const [input, setInput] = useState("chocolate");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  const [loading, setLoading] = useState(true);
  const [recipeDetail, setRecipeDetail] = useState([]);
  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      // setLoading(true);
      const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
        params: {
          type: "public",
          q: input, // Use the id parameter from the URL
          app_id: `${process.env.REACT_APP_APP_ID_RECIPE}`,
          app_key: `${process.env.REACT_APP_APP_KEY_RECIPE}`,
        },
      });
      // setLoading(true);
      setInput("");
      setRecipeDetail(response.data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderWithSidebar title="Recipe" />

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
                  <Button variant="outlined">
                    Add new <AddIcon />
                  </Button>
                  <form onSubmit={submitHandler}>
                    <div>
                      <FaSearch />
                      <input onChange={(e) => setInput(e.target.value)} type="text" value={input} />
                    </div>
                  </form>
                </Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading
                      ? // <p>... is loading</p>
                        Array.from({ length: 11 }, (_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton
                                rectangular="text"
                                height={200}
                                width={window.innerWidth <= 600 ? mobileStyles : imageStyles}
                              />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" />
                            </TableCell>
                          </TableRow>
                        ))
                      : recipeDetail.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Link href={`/a-recipe/details/${encodeURIComponent(row._links.self.href)}`}>
                                <img
                                  src={row.recipe.image}
                                  alt=""
                                  style={window.innerWidth <= 600 ? mobileStyles : imageStyles}
                                />
                              </Link>
                            </TableCell>
                            <TableCell>{row.recipe.label}</TableCell>
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
    </ThemeProvider>
  );
}

export default ARecipe;
