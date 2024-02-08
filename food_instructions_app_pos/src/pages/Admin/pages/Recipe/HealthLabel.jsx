import { Typography, Box, Grid } from "@mui/material";

const HealthLabel = ({ healthLabels }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Heal labels
      </Typography>
      <Box sx={{ border: "1px solid #ccc", padding: "2rem" }}>
        <Grid container spacing={2}>
          {healthLabels.map((item, index) => (
            <Grid item xs={3} key={index}>
              {item}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HealthLabel;
