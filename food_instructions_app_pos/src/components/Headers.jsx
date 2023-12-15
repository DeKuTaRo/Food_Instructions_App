import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";
import React , {useState } from "react";
import {  Input, Button,IconButton,InputAdornment  } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
function Headers() {

  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    // Navigate to the searched page with the search value
    navigate(`/searched/${searchValue}`);
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
      {/* Drawer */}
      <Box sx={{ display: "flex" }}>
        <Link to={"/about"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>About</Box>
        </Link>
        <Link to={"/login-plus"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>Login</Box>
        </Link>
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
            width: "300px", // Đặt giá trị mặc định cho width
            height: "35px",
            marginRight: 1,
            fontSize: "0.8rem",
            backgroundColor: "#C0C0C0",
            color: "#000000",
            borderRadius: "5px",
            transition: "width 0.3s", // Thêm hiệu ứng chuyển động
            "&:focus": {
              width: "300px", // Kích thước tối đa có thể đạt được
            },
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
                onClick={handleSearchClick}
              >
                <CiSearch />
              </IconButton>
            </InputAdornment>
          }
        />

      </Box>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaFacebook />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaInstagramSquare />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <FaPinterest />
          </Box>
        </Link>
        <Link to={"/cuisine/Italian"}>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <AiFillTwitterCircle />
          </Box>
        </Link>
        <Link>
          <Box sx={{ p: 1, fontSize: "0.8rem" }}>
            <SiYoutubemusic />
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default Headers;
