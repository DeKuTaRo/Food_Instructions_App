import { Typography } from "@mui/material";

const NameWithImage = ({ recipeName, recipeImage }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {recipeName}
      </Typography>
      <img
        src={recipeImage}
        alt={recipeName}
        style={{
          maxWidth: "100%",
          borderRadius: "1rem",
          backgroundColor: "white",
        }}
      />
    </>
  );
};

export default NameWithImage;
