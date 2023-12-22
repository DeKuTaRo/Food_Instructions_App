import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Toolbar, List, Divider, IconButton, Typography, Box, Link, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { RxAvatar } from "react-icons/rx";
import { mainListItems, secondaryListItems } from "../../pages/Admin/listItems";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function HeaderContent({ open, toggleDrawer, title }) {
  const [hoverDialogAccount, setHoverDialogAccount] = useState(null);
  const showDialogAccount = hoverDialogAccount === "account" ? true : false;
  const navigate = useNavigate();

  const handleLogout = () => {
    // window.location.reload();
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("token");
    localStorage.setItem("isAdmin", false);
    // window.href = "/login";
    navigate("/login");
  };
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}>
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Sidebar({ open, toggleDrawer }) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
}

export function HeaderWithSidebar({ title }) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <HeaderContent title={title} open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
