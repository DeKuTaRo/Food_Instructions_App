import React, { useEffect, useState } from "react";
import useDebounce from "../../../utils/debounce";
import { getCurrentDateTimeInVietnam } from "../../../utils/dateTimeVietNam";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography, Button, TextareaAutosize, Box, TextField, Chip, Tooltip, IconButton } from "@mui/material";
import { FaStar } from "react-icons/fa";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import Avatar from "@mui/material/Avatar";
import CommentIcon from "@mui/icons-material/Comment";
import AvatarDefault from "../../../images/avatar.png";

const Comments = ({ recipeName, recipeImage, label, username, handleCheckLoginStatus, token }) => {
  const [avatarUser, setAvatarUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/account/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvatarUser(`${process.env.REACT_APP_URL_ACCOUNT_SERVICE}/${res.data.path}`);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [token]);

  const [commentsPost, setCommentsPost] = useState("");
  const debouncedComments = useDebounce(commentsPost, 1000);

  const [listComments, setListComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [ratingComment, setRatingComment] = useState(null);
  const [hoverStarComment, setHoverStarComment] = useState(null);
  const [replyVisible, setReplyVisible] = useState({});
  const [likeEachComment, setLikeEachComment] = useState({});
  const [idRecipe, setIdRecipe] = useState("");
  const [isLiked, setIsLiked] = useState(true);

  const isAdmin = localStorage.getItem("isAdmin");

  const formData = {
    pathAvatar: avatarUser,
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
        if (response.data.statusCode === 200) {
          getComments();
          toast.success(response.data.msg, {
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
          toast.error(response.data.msg, {
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
        toast.error("An error occurred, please try again later", {
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

  const getComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_RECIPE_SERVICE}/recipe/getComments`, {
        params: {
          recipeName: recipeName,
        },
      });
      if (response.data.recipes !== null) {
        setListComments(response.data.recipes.comments);
        setTotalComments(response.data.recipes.totalComments);
        setIdRecipe(response.data.recipes._id);
      }
    } catch (err) {
      toast.error("An error occurred, please try again later", {
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
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleSetLikeComment = async (_idComment) => {
    handleCheckLoginStatus();
    setIsLiked(!isLiked);
    setLikeEachComment((prevLike) => ({
      ...prevLike,
      [_idComment]: !prevLike[_idComment],
    }));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_RECIPE_SERVICE}/recipe/liked`,
        {
          _idComment: _idComment,
          isLiked: isLiked,
          idRecipe: idRecipe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.recipes !== undefined) {
        getComments();
      }
    } catch (err) {
      toast.error("An error occurred, please try again later", {
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
  };

  const handleReplyComment = (_id) => {
    handleCheckLoginStatus();
    setReplyVisible((prevVisibility) => ({
      ...prevVisibility,
      [_id]: !prevVisibility[_id],
    }));
  };

  const handlePostReplyComments = async (_idComment) => {
    handleCheckLoginStatus();
    const reply = replyInputs[_idComment];

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_RECIPE_SERVICE}/recipe/replyComments`,
        {
          pathAvatar: avatarUser,
          timeComment: getCurrentDateTimeInVietnam,
          content: reply,
          liked: 0,
          rating: 0,
          _idComment: _idComment,
          idRecipe: idRecipe,
          nameRecipe: recipeName,
          imageRecipe: recipeImage,
          linkRecipe: label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode === 200) {
        getComments();
      }
      const newInputs = [...replyInputs];
      newInputs[_idComment] = "";
      setReplyInputs(newInputs);
      handleReplyComment(_idComment);
    } catch (err) {
      toast.error("An error occurred, please try again later", {
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
  };
  const [replyInputs, setReplyInputs] = useState([]);

  const handleChangeCommentReply = (id, value) => {
    const newInputs = [...replyInputs];
    newInputs[id] = value;
    setReplyInputs(newInputs);
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
          <label key={index}>
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Button variant="contained" sx={{ textAlign: "center", marginTop: "1rem" }} onClick={handlePostComments}>
          Post comment
        </Button>
      </Box>
      <Box sx={{ marginBottom: "4rem" }}>
        <Box
          sx={{
            borderBottom: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4rem",
            marginBottom: "2rem",
          }}>
          <Typography sx={{ borderBottom: "1px solid red" }}>
            {totalComments === 1 ? `${totalComments} comment` : `${totalComments} comments`}
          </Typography>
          <Typography>
            <Tooltip title="Most reacted comment" placement="top">
              <IconButton sx={{ color: "#ffa600", borderBottomColor: "#ffa600" }}>
                <BoltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Hottest comment thread" placement="top">
              <IconButton sx={{ color: "#fc5844", borderBottomColor: "#fc5844" }}>
                <LocalFireDepartmentIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>

          {listComments &&
            listComments.map((item) => (
              <Box
                aria-label="comments"
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  gap: "12px",
                }}
                key={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}>
                  <Avatar alt={username} src={item.pathAvatar ? item.pathAvatar : AvatarDefault} />
                  <Typography variant="h6">{item.username}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    textAlign: "left",
                    gap: "8px",
                  }}>
                  <AccessTimeIcon /> <Typography>{item.timeComment}</Typography>
                </Box>
                <Typography>{item.content}</Typography>
                <Box sx={{ display: "flex" }}>
                  {[...Array(5)].map((start, index) => {
                    const currentRating = index + 1;

                    return (
                      <label key={index}>
                        <input type="radio" name="rating" value={currentRating} style={{ display: "none" }} />
                        <FaStar color={currentRating <= item.rating ? "#ffc107" : "#e4e5e9"} />
                      </label>
                    );
                  })}
                </Box>
                <Typography
                  sx={{
                    display: "flex",
                    textAlign: "left",
                    gap: "8px",
                  }}>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUpOffAltIcon />}
                    onClick={() => {
                      handleSetLikeComment(item._id);
                    }}>
                    {likeEachComment[item._id] ? item.liked + 1 : item.liked}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<QuickreplyIcon />}
                    onClick={() => handleReplyComment(item._id, isLiked)}>
                    Reply
                  </Button>
                </Typography>

                {replyVisible[item._id] && (
                  <>
                    <TextareaAutosize
                      aria-label="comments"
                      minRows={3}
                      placeholder="Leave your reply here"
                      style={{
                        width: "100%",
                        padding: "1rem",
                        fontSize: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "1rem",
                      }}
                      value={replyInputs[item._id] || ""}
                      onChange={(e) => handleChangeCommentReply(item._id, e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                      <Button
                        variant="contained"
                        sx={{ textAlign: "center", marginTop: "1rem" }}
                        onClick={() => handlePostReplyComments(item._id)}>
                        Post reply
                      </Button>
                    </Box>
                  </>
                )}

                {item.replies.map((reply) => (
                  <Box
                    key={reply._id}
                    sx={{
                      backgroundColor: "#fafafa",
                      padding: "1rem",
                      marginLeft: "2rem",
                      borderLeft: "3px solid #000000",
                    }}>
                    <Box sx={{ fontSize: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <Avatar alt={username} src={avatarUser ? avatarUser : AvatarDefault} />
                      {reply.username} {isAdmin === "true" && <Chip label="admin" sx={{ color: "black" }} />}
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        textAlign: "left",
                        gap: "0.5rem",
                        marginTop: "1rem",
                      }}>
                      <CommentIcon /> Reply to {item.username}
                      <AccessTimeIcon /> {reply.timeComment}
                    </Typography>
                    <Typography margin={"1rem"}>{reply.content}</Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        textAlign: "left",
                        gap: "0.5rem",
                      }}>
                      <Button variant="outlined" startIcon={<ThumbUpOffAltIcon />}>
                        {reply.liked}
                      </Button>{" "}
                      <Button
                        variant="contained"
                        startIcon={<QuickreplyIcon />}
                        onClick={() => handleReplyComment(item._id, isLiked)}>
                        Reply
                      </Button>{" "}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Comments;
