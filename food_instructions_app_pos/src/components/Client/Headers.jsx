import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchengin,
  faFacebookSquare,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { RxAvatar } from "react-icons/rx";
import React, { useState } from "react";
import { Input, IconButton, InputAdornment, Link } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Button from "@mui/material/Button";

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
    navigate(`/searched/${searchValue}`);
  };

  const isLoginClient = localStorage.getItem("isLoginClient");

  const showDialogAccount = hoverDialogAccount === "account" ? true : false;

  const handleLogout = () => {
    localStorage.setItem("isLoginClient", "false");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
        mb: 2,
        borderBottom: "1px solid #ccc",
      }}>
      <Box sx={{ display: "flex" }}>
        <Link href={"/about"} underline="none" color="inherit">
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        <Link underline="none" color="inherit">
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        <Link underline="none" color="inherit">
          <Box sx={{ p: 1, fontSize: "1.5rem" }}>About</Box>
        </Link>
        {isLoginClient !== "true" && (
          <Link href={"/login-plus"} underline="none" color="inherit">
            <Box sx={{ p: 1, fontSize: "1.5rem" }}>Login</Box>
          </Link>
        )}
      </Box>

      {/* Search Bar */}
      {/* Search Bar */}

      {/* Accordion */}
      <Box sx={{ display: "flex" }}>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
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
        </Box> */}
        <Tooltip title="Search" placement="bottom">
          <Link href={"/searched"} underline="none" color="inherit">
            <FontAwesomeIcon icon={faSearchengin} style={{ padding: "0.5rem", fontSize: "1.5rem" }} />
            {/* <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{ padding: "0.5rem", fontSize: "1.5rem", color: "#1877F2" }}
            /> */}
          </Link>
        </Tooltip>
        <Tooltip title="Facebook" placement="bottom">
          <Link underline="none" color="inherit">
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{ padding: "0.5rem", fontSize: "1.5rem", color: "#1877F2" }}
            />
          </Link>
        </Tooltip>
        <Tooltip title="Instagram" placement="bottom">
          <Link underline="none" color="inherit">
            <FontAwesomeIcon
              icon={faInstagram}
              style={{
                borderRadius: "1.5rem",
                padding: "0.5rem",
                fontSize: "1.5rem",
                color: "white",
                background: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
              }}
            />
          </Link>
        </Tooltip>
        <Tooltip title="Pinterest" placement="bottom">
          <Link underline="none" color="inherit">
            <FontAwesomeIcon icon={faPinterest} style={{ padding: "0.5rem", fontSize: "1.5rem", color: "#BD081C" }} />
          </Link>
        </Tooltip>
        <Tooltip title="Twitter" placement="bottom">
          <Link underline="none" color="inherit">
            <FontAwesomeIcon icon={faTwitter} style={{ padding: "0.5rem", fontSize: "1.5rem", color: "#1DA1F2" }} />
          </Link>
        </Tooltip>
        <Tooltip title="Youtube" placement="bottom">
          <Link underline="none" color="inherit">
            <FontAwesomeIcon icon={faYoutube} style={{ padding: "0.5rem", fontSize: "1.5rem", color: "#FF0000" }} />
          </Link>
        </Tooltip>
        {isLoginClient === "true" && (
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
              <Link
                href={"/profile"}
                underline="none"
                sx={{
                  padding: "0.5rem 2rem",
                  color: "black",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "black", color: "white" },
                }}>
                Profile
              </Link>
              <Button
                sx={{
                  padding: "0.5rem 2rem",
                  color: "black",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "black", color: "white" },
                }}
                onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Headers;
