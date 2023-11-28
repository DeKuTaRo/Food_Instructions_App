import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { useState } from "react";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

function IngredientsForm({ selectedRow, onClose }) {
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

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file = ", file);
    if (file) {
      const reader = new FileReader();
      console.log("reader = ", reader);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!selectedRow) {
    return null;
  }

  let imageSrc;
  if (selectedRow != null) {
    imageSrc = selectedRow.imageIngredient;
  } else if (selectedImage != null) {
    imageSrc = selectedImage;
  } else {
    imageSrc = "";
  }

  console.log("imageSrc = ", imageSrc);
  console.log("selectedImage = ", selectedImage);

  return (
    <>
      <div>Ingredients Form</div>
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `
              "image image name name"
              ". . . button"
              `,
        }}>
        <input
          accept="image/*"
          style={{ display: "block" }}
          id="image-input"
          type="file"
          onChange={handleImageChange}
        />
        <Box sx={{ gridArea: "image", display: "flex" }}>
          {/* <label htmlFor="image-input">
            <Button color="secondary" variant="contained" component="span">
              Upload Image
            </Button>
          </label> */}
          {/* {selectedImage && ( */}
          <div style={{ margin: "0 2rem" }}>
            <img
              src={imageSrc}
              alt="Uploaded"
              style={
                window.innerWidth <= 600 // Check window width for mobile screens
                  ? mobileStyles
                  : imageStyles
              }
            />
          </div>
          {/* )} */}
        </Box>
        <Box sx={{ gridArea: "name" }}>
          {/* <InputLabel className={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
            Name Ingredients
          </InputLabel> */}
          <TextareaAutosize
            aria-label="Name Ingredients"
            minRows={2}
            placeholder="Name Ingredients"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
            defaultValue={selectedRow.userName}
          />{" "}
        </Box>
        <Box sx={{ gridArea: "button" }}>
          <Button variant="contained" component="span" sx={{ margin: "0 1rem" }} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" component="span">
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default IngredientsForm;
