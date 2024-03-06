import React, { useEffect, useState, useRef } from "react";

import { Input, Box, Avatar, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import AvatarDefault from "../../../images/avatar.png";

const ImageUpload = ({ onImageUpload, imageData, titleImage }) => {
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imageData) {
      setSelectedImage(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/${imageData}`);
    }
  }, [imageData]);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    onImageUpload(image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };
  const AvatarDefaulturl = AvatarDefault;

  return (
    <>
      <Input
        type="file"
        inputRef={imageRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        name="mainImage"
        accept="image/*"
      />
      <Stack direction="row" sx={{ position: "relative" }}>
        <Avatar
          alt={titleImage}
          src={selectedImage ? selectedImage : AvatarDefaulturl}
          variant="rounded"
          sx={{ width: "100%", height: "100%" }}
          onClick={handleImageUpload}
        />
        {selectedImage && (
          <IconButton
            onClick={handleClearImage}
            style={{ position: "absolute", top: 0, right: 0, zIndex: 1, backgroundColor: "gray" }}
            size="small">
            <CloseIcon />
          </IconButton>
        )}
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            padding: "0.5rem 1rem",
            width: "100%",
            backgroundColor: "gray",
          }}>
          <FontAwesomeIcon icon={faCameraRetro} />
        </Box>
      </Stack>
    </>
  );
};

export default ImageUpload;
