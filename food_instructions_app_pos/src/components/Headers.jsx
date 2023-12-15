import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import React, { useState } from "react";
import { Input, IconButton, InputAdornment, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

function Headers() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoverDialogAccount, setHoverDialogAccount] = useState(null);

  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    // Navigate to the searched page with the search value
    navigate(`/searched/${searchValue}`);
  };

  const isLogin = localStorage.getItem("isLogin");
  const showDialogAccount = hoverDialogAccount === "account" ? true : false;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
        mb: 2,
        borderBottom: "1px solid #ccc",
      }}>
      {/* Drawer */}
      <Box sx={{ display: "flex" }}>
        <Link to={"/about"}>
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        <Link>
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        <Link>
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        {!isLogin && (
          <Link to={"/login-plus"}>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>Login</Box>
          </Link>
        )}
      </Box>

      {/* Search Bar */}
      {/* Search Bar */}

      {/* Accordion */}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Search..."
            sx={{
              width: isSearchFocused ? "300px" : "200px",
              height: isSearchFocused ? "35px" : "35px",
              marginRight: 1,
              fontSize: "1rem",
              backgroundColor: "#C0C0C0",
              color: "#000000",
              borderRadius: "0.5rem",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={handleKeyPress}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={handleSearchClick}>
                  <CiSearch />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Tooltip title="Facebook" placement="bottom">
          <Link>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <FaFacebook />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Instagram" placement="bottom">
          <Link>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <FaInstagramSquare />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Pinterest" placement="bottom">
          <Link>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <FaPinterest />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Twitter" placement="bottom">
          <Link>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <AiFillTwitterCircle />
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Youtube" placement="bottom">
          <Link>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <SiYoutubemusic />
            </Box>
          </Link>
        </Tooltip>
        {isLogin && (
          <Box
            component="div"
            sx={{ position: "relative" }}
            onMouseEnter={() => setHoverDialogAccount("account")}
            onMouseLeave={() => setHoverDialogAccount(null)}>
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>
              <RxAvatar />
            </Box>
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "white",
                boxShadow: "0 0 10px 0 rgba(50, 50, 50, 0.25)",
                right: "0.5rem",
                zIndex: 10,
                display: showDialogAccount ? "flex" : "none",
                flexDirection: "column",
                gap: 1,
              }}>
              <Typography
                sx={{
                  padding: "0.5rem 2rem",
                  "&:hover": { backgroundColor: "black", color: "white", cursor: "pointer" },
                }}>
                Profile
              </Typography>
              <Typography
                sx={{
                  padding: "0.5rem 2rem",
                  "&:hover": { backgroundColor: "black", color: "white", cursor: "pointer" },
                }}>
                Logout
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Headers;
