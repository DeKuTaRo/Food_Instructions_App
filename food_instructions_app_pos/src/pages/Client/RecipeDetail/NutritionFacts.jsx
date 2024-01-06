import React from "react";

import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Paper,
  TablePagination,
  TableContainer,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const NutritionFacts = ({ ingredients, calories, totalNutrients, totalDaily }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box
      sx={{
        width: 1,
        backgroundColor: "#ccc",
        borderRadius: "1rem",
      }}>
      <Item
        sx={{
          borderTopRightRadius: "1rem",
          borderTopLeftRadius: "1rem",
          backgroundColor: "#ccc",
          marginBottom: "1rem",
        }}>
        <Typography variant="h5" gutterBottom sx={{ padding: "1rem" }}>
          Nutrition each ingredient
        </Typography>
        <React.Fragment>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 800 }}>
              <Table size="small" stickyHeader aria-label="sticky table" sx={{ backgroundColor: "#fff" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Qty</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Food</TableCell>
                    <TableCell>Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{row.quantity + " " + row.measure}</TableCell>
                        <TableCell>{row.foodCategory}</TableCell>
                        <TableCell>{row.food}</TableCell>
                        <TableCell>{Number(row.weight.toFixed(1)) + " g"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={ingredients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </React.Fragment>{" "}
      </Item>
      <Item sx={{ padding: "1rem" }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ borderBottom: "10px solid #ccc" }}>
          Nutrition facts
        </Typography>
        <Typography variant="h5" align="left">
          Amount per serving
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "10px solid #ccc",
          }}>
          <Typography variant="h4">Calories</Typography>
          <Typography variant="h4">{Number(calories.toFixed(1))}</Typography>
        </Box>
        <Typography variant="inherit" align="right" sx={{ borderBottom: "1px solid #ccc" }}>
          %Daily value
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              flexDirection: "column",
            }}>
            {Object.keys(totalNutrients).map((key) => (
              <Typography key={key}>
                {totalNutrients[key].label +
                  " = " +
                  Number(totalNutrients[key].quantity.toFixed(1)) +
                  " " +
                  totalNutrients[key].unit}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}>
            {Object.keys(totalDaily).map((key) => (
              <Typography key={key}>
                {totalDaily[key].label +
                  " = " +
                  Number(totalDaily[key].quantity.toFixed(1)) +
                  " " +
                  totalDaily[key].unit}
              </Typography>
            ))}
          </Box>
        </Box>
      </Item>
    </Box>
  );
};
export default NutritionFacts;
