import React, { useState } from "react";
import useDebounce from "../../../utils/debounce";
import { getCurrentDateTimeInVietnam } from "../../../utils/dateTimeVietNam";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography, Button, TextareaAutosize, Box, TextField, Chip } from "@mui/material";
import { FaStar } from "react-icons/fa";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import Avatar from "@mui/material/Avatar";

const Comments = ({ recipeName, recipeImage, label, username, handleCheckLoginStatus, token }) => {
  const [commentsPost, setCommentsPost] = useState("");
  const debouncedComments = useDebounce(commentsPost, 1000);

  const [ratingComment, setRatingComment] = useState(null);
  const [hoverStarComment, setHoverStarComment] = useState(null);

  const formData = {
    nameRecipe: recipeName,
    imageRecipe: recipeImage,
    linkRecipe: label,
    comments: {
      username: username,
      content: debouncedComments,
      rating: ratingComment,
      liked: 0,
      timeComment: getCurrentDateTimeInVietnam,
      replies: [],
    },
  };

  const handlePostComments = async () => {
    handleCheckLoginStatus();
    if (debouncedComments === "") {
      toast.error("Vui lòng nhập bình luận", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL_RECIPE_SERVICE}/recipe/comments`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.statusText === "OK") {
          toast.success("Bình luận thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Có lỗi xảy ra", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  return (
    <>
      <TextareaAutosize
        aria-label="comments"
        minRows={6}
        placeholder="Leave your comment here"
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "1rem",
        }}
        value={commentsPost}
        onChange={(e) => setCommentsPost(e.target.value)}
      />

      <Typography>Rate this food</Typography>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRatingComment(currentRating)}
              style={{ display: "none" }}
            />
            <FaStar
              color={currentRating <= (hoverStarComment || ratingComment) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHoverStarComment(currentRating)}
              onMouseLeave={() => setHoverStarComment(null)}
            />
          </label>
        );
      })}
      <Button variant="contained" sx={{ textAlign: "center", marginTop: "1rem" }} onClick={handlePostComments}>
        Post comment
      </Button>

      <Box sx={{ marginBottom: "4rem" }}>
        <Box
          sx={{
            borderBottom: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4rem",
            marginBottom: "2rem",
          }}>
          <Typography sx={{ borderBottom: "1px solid red" }}>224 comments</Typography>
          <Typography>
            <BoltIcon sx={{ borderBottom: "1px solid orange" }} />{" "}
            <LocalFireDepartmentIcon sx={{ borderBottom: "1px solid orange" }} />
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
          <TextField placeholder="Search comment" />

          <Box
            aria-label="comments"
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: "12px",
            }}>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}>
              <Avatar
                alt="Remy Sharp"
                src="https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
              />
              <Typography>Karen</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",

                textAlign: "left",
                gap: "8px",
              }}>
              <AccessTimeIcon /> <Typography>3 months ago</Typography>
            </Box>
            <Typography>This food is so delicious</Typography>
            <Typography>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </Typography>
            <Typography
              sx={{
                display: "flex",

                textAlign: "left",
                gap: "8px",
              }}>
              <ThumbUpOffAltIcon /> 0
              <QuickreplyIcon /> Reply
            </Typography>
            <Box
              sx={{
                backgroundColor: "#fafafa",
                padding: "2rem",
                marginLeft: "2rem",
                borderLeft: "3px solid #000000",
              }}>
              <Box>
                Naomi (JOC Community Manager) <Chip label="admin" sx={{ color: "black" }} />
              </Box>
              <Typography
                sx={{
                  display: "flex",

                  textAlign: "left",
                  gap: "8px",
                }}>
                <QuickreplyIcon /> Reply to Karen
                <AccessTimeIcon /> 3 months ago
              </Typography>
              <Typography margin={"12px 4px"}>
                Hi Karen! Aww. We are so happy to hear you enjoyed the recipe! Thank you so much for trying Nami’s
                recipe and for your kind feedback. Happy Cooking!
              </Typography>
              <Typography
                sx={{
                  display: "flex",

                  textAlign: "left",
                  gap: "8px",
                }}>
                <ThumbUpOffAltIcon /> 0
                <QuickreplyIcon /> Reply
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Comments;
