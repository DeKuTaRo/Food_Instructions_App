import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { GiKnifeFork } from "react-icons/gi";
import { List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

const HeaderListItem = (props) => {
  const { isHovered, title, listItems } = props;
  return (
    <div sx={{ display: "flex", flexDirection: "column", p: 0 }}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover li": {
            display: "block",
          },
        }}>
        {title} <ExpandMoreIcon />
      </Typography>{" "}
      <List
        sx={{
          backgroundColor: "white",
          position: "absolute",
          top: "2.5rem",
          zIndex: "9999",
          boxShadow: "0 0 10px 0 rgba(50, 50, 50, 0.25)",
          p: 0,
          width: "10rem",
          transition: "400ms",
          display: isHovered ? "block" : "none",
        }}>
        {listItems.map((item, index) => (
          <ListItem sx={{ p: 0, "&:hover a": { color: "white", backgroundColor: "black" } }} key={index}>
            <Link sx={{ p: "0.5rem 1rem", width: "100%" }} underline="none" color="inherit" href={item.href}>
              {item.content}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

function NavBar() {
  const [hoverMenuHeader, setHoverMenuHeader] = useState(null);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      {/* Logo */}
      <Link
        href={"/"}
        sx={{
          pt: 1,
          pb: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: 400,
          fontFamily: "Lobster Two, cursive;;}",
        }}
        underline="none"
        color="inherit">
        <GiKnifeFork style={{ fontSize: "2rem" }} />
        <Box> Travel to Food </Box>
      </Link>
      <List sx={{ display: "flex" }}>
        <ListItem onMouseEnter={() => setHoverMenuHeader("header1")} onMouseLeave={() => setHoverMenuHeader(null)}>
          <HeaderListItem
            isHovered={hoverMenuHeader === "header1" ? true : false}
            title="Recipes"
            listItems={[
              { content: "Filter", href: "/" },
              { content: "Index", href: "/" },
              { content: "Latest", href: "/" },
              { content: "Popular", href: "/" },
            ]}
          />
        </ListItem>
        <ListItem onMouseEnter={() => setHoverMenuHeader("header2")} onMouseLeave={() => setHoverMenuHeader(null)}>
          <HeaderListItem
            isHovered={hoverMenuHeader === "header2" ? true : false}
            title="Course"
            listItems={[
              { content: "Appetizer", href: "/" },
              { content: "Beverage", href: "/" },
              { content: "Breakfast", href: "/" },
              { content: "Lunch", href: "/" },
              { content: "Dinner", href: "/" },
            ]}
          />
        </ListItem>
        <ListItem onMouseEnter={() => setHoverMenuHeader("header3")} onMouseLeave={() => setHoverMenuHeader(null)}>
          <HeaderListItem
            isHovered={hoverMenuHeader === "header3" ? true : false}
            title="Nutrition"
            listItems={[{ content: "Facts", href: "/nutrition-facts" }]}
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default NavBar;
