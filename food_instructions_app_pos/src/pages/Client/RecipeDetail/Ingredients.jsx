import { Box, Typography } from "@mui/material";

const Ingredients = ({ ingredientLines }) => {
  return (
    <Box component="div" variant="inherit" sx={{}}>
      <Typography variant="h4" gutterBottom>
        Ingredients:
      </Typography>
      <ul>
        {ingredientLines.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Ingredients;
