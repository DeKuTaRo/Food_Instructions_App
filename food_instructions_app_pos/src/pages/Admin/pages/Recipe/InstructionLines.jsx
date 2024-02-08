import { Typography, Box, Link } from "@mui/material";

const InstructionLines = ({ recipeName, ingredientLines, url }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        How to make {recipeName}
      </Typography>
      {ingredientLines.map((item, index) => (
        <Box component="div" key={index}>
          <Typography
            sx={{
              lineHeight: "2rem",
              backgroundColor: "black",
              color: "white",
              position: "absolute",
              width: "2rem",
              height: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}>
            {index + 1}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginLeft: "3rem" }}>
            {item}
          </Typography>
        </Box>
      ))}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "2rem" }}>
        More details about recipe{" "}
        <Link href={url} underline="hover">
          here
        </Link>{" "}
      </Typography>
    </>
  );
};

export default InstructionLines;
