import { motion } from "framer-motion";
import Headers from "../../components/Headers";
import NavBar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextareaAutosize, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Generate Order Data
function createData(id, qty, unit, food, calories, weight) {
  return { id, qty, unit, food, calories, weight };
}

const rows = [
  createData(0, "1", "cup", "rice", "702kcal", "195g"),
  createData(1, "1", "whole", "fried chicken", "49.1 kcal", "16g"),
];

function Nutrition() {
  const [details, setDetails] = useState({});

  //   const fetchDetails = async () => {
  //     const data = await fetch(
  //       `https://api.edamam.com/api/nutrition-data?app_id=${process.env.REACT_APP_APP_ID_NUTRITION}&app_key=${process.env.REACT_APP_APP_KEY_NUTRITION}&nutrition-type=cooking&ingr=%5B%221%20cup%20rice%2C%22%2C%20%221%20fried%20chicken%2C%22%2C%20%22%22%5D`
  //     );
  //     const detailData = await data.json();

  //     setDetails(detailData);
  //     console.log(detailData);
  //   };

  //   useEffect(() => {
  //     fetchDetails();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const [textValue, setTextValue] = useState("");
  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleSearchNutritionFacts = (e) => {
    console.log("textValue = ", textValue);
  };

  const handleResetNutritionFacts = (e) => {};
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />

      <Box sx={{ width: 1, backgroundColor: "#ccc", padding: "4rem", borderRadius: "1rem" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={6}>
          <Box gridColumn="span 6" sx={{ border: "none" }}>
            <Item
              sx={{
                borderTopRightRadius: "1rem",
                borderTopLeftRadius: "1rem",
                backgroundColor: "#ccc",
              }}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={6}
                placeholder=""
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "1rem",
                }}
                value={textValue}
                onChange={handleTextareaChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "2rem" }}>
                <Button
                  variant="contained"
                  color="success"
                  style={{ padding: "0.5rem 2rem", margin: "1rem", borderRadius: "1rem" }}
                  onClick={() => handleResetNutritionFacts()}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  style={{ padding: "0.5rem 2rem", margin: "1rem", borderRadius: "1rem" }}
                  onClick={() => handleSearchNutritionFacts()}>
                  Save
                </Button>{" "}
              </Box>
              <React.Fragment>
                <Table size="small" sx={{ backgroundColor: "#fff" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Qty</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>Food</TableCell>
                      <TableCell>Calories</TableCell>
                      <TableCell>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.qty}</TableCell>
                        <TableCell>{row.unit}</TableCell>
                        <TableCell>{row.food}</TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>{" "}
            </Item>
          </Box>
          <Box gridColumn="span 6">
            <Item sx={{ padding: "1rem" }}>
              <Typography variant="h3" align="center" gutterBottom sx={{ borderBottom: "10px solid #ccc" }}>
                Nutrition facts
              </Typography>
              <Typography variant="h5" align="left">
                Amount per serving
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "10px solid #ccc" }}>
                <Typography variant="h2">Calories</Typography>
                <Typography variant="h2">751</Typography>
              </Box>
              <Typography variant="inherit" align="right" sx={{ borderBottom: "1px solid #ccc" }}>
                %Daily value
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total fat 4.4g</Typography>
                <Typography>7%</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  borderTop: "1px solid #ccc",
                }}>
                <Typography> Saturated Fat 0.9 g</Typography>
                <Typography>4%</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  borderTop: "1px solid #ccc",
                }}>
                <Typography> Trans Fat 0 g</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Cholesterol 8.8 mg</Typography>
                <Typography>3%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Sodium 97 mg</Typography>
                <Typography>4%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Total Carbohydrate 157 g </Typography>
                <Typography>52%</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  borderTop: "1px solid #ccc",
                }}>
                <Typography> Dietary Fiber 0.1 g</Typography>
                <Typography> Dietary Fiber 1%</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  borderTop: "1px solid #ccc",
                }}>
                <Typography> Total Sugars 0 g</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  borderTop: "1px solid #ccc",
                }}>
                <Typography> Includes - Added Sugars </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Protein 15.4 g </Typography>
                <Typography>31%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Vitamin D 0 µg</Typography>
                <Typography>0%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Calcium 19.3 mg</Typography>
                <Typography>2%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Iron 1.7 mg</Typography>
                <Typography>9%</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ccc" }}>
                <Typography>Potassium 207.9 mg</Typography>
                <Typography>4%</Typography>
              </Box>

              <Typography align="center">*Percent Daily Values are based on a 2000 calorie diet</Typography>
            </Item>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Nutrition;
