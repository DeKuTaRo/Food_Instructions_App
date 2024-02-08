import { Stack, Typography } from "@mui/material";

const Cuisine = ({ cuisineType }) => {
  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
      <Typography variant="h5">Cuisine: </Typography>
      <Typography variant="h5">{cuisineType}</Typography>
    </Stack>
  );
};

export default Cuisine;
