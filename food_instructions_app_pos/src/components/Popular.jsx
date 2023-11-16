import { useEffect, useRef } from "react";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import IconDango from "../assets/icons/icon-dango.svg";
import { IoIosArrowDropright } from "react-icons/io";
function Popular() {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      const maxHeight = Math.max(
        ...Array.from(cardRef.current.children).map((child) => {
          return child.children[0].offsetHeight;
        })
      );

      Array.from(cardRef.current.children).forEach((child) => {
        child.children[0].style.height = `${maxHeight}px`;
      });
    }
  }, []);
  return (
    <Box sx={{ margin: "3rem 0rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", columnGap: "0.25rem", margin: "1rem 0" }}>
          <Typography
            component="span"
            sx={{
              backgroundImage: `url('${IconDango}')`,
              display: "block",
              width: 40,
              height: 40,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              fill: "#D0021B",
            }}></Typography>
          <Typography ariant="h6" component="span" sx={{ fontWeight: "700", fontSize: "1.5rem" }}>
            Latest Posts
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", columnGap: "0.25rem" }}>
          <Typography component="span" sx={{ fontWeight: "700" }}>
            VIEW
          </Typography>{" "}
          <Typography component="span" sx={{ fontStyle: "italic" }}>
            all
          </Typography>{" "}
          <Typography component="span" sx={{ fontWeight: "700" }}>
            POST
          </Typography>
          <IoIosArrowDropright />
        </div>
      </div>
      <Grid container spacing={2} ref={cardRef}>
        <Grid item xs={6} md={4}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                "https://www.justonecookbook.com/wp-content/uploads/2023/11/Akan-Mashu-National-Park-Lake-Kussharo-Travel-Guide-72-IMG_4602-400x267.jpg"
              }
            />
            <CardContent sx={{ color: "black" }}>
              <Typography variant="inherit" component="span">
                Travel
              </Typography>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", marginTop: "0.5rem" }}>
                Akan Mashu National Park – Lake Kussharo Travel Guide{" "}
              </Typography>
              <Typography variant="inherit" component="div" sx={{ margin: "0.5rem 0" }}>
                Explore Akan Mashu National Park and Japan’s largest caldera lake – Lake Kussharo in…{" "}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", columnGap: "0.25rem", color: "red" }}>
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  VIEW
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontStyle: "italic" }}>
                  the
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  POST
                </Typography>
                <IoIosArrowDropright />
              </div>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                "https://www.justonecookbook.com/wp-content/uploads/2023/10/Japanese-Onion-Dressing-4004-I-400x267.jpg"
              }
            />
            <CardContent sx={{ color: "black" }}>
              <Typography variant="inherit" component="span">
                Salad
              </Typography>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", marginTop: "0.5rem" }}>
                A Million-Dollar Japanese Onion Dressing 玉ねぎドレッシング 0 (0){" "}
              </Typography>
              <Typography variant="inherit" component="div" sx={{ margin: "0.5rem 0" }}>
                Sweet and simple Japanese Onion Dressing has an incredible depth of flavor from mild…{" "}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", columnGap: "0.25rem", color: "red" }}>
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  VIEW
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontStyle: "italic" }}>
                  the
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  POST
                </Typography>
                <IoIosArrowDropright />
              </div>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                "https://www.justonecookbook.com/wp-content/uploads/2023/09/Mille-Feuille-Nabe-2919-I-1-400x267.jpg"
              }
            />
            <CardContent sx={{ color: "black" }}>
              <Typography variant="inherit" component="span">
                Soup + Stew
              </Typography>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", marginTop: "0.5rem" }}>
                Mille-Feuille Nabe ミルフィーユ鍋{" "}
              </Typography>
              <Typography variant="inherit" component="div" sx={{ margin: "0.5rem 0" }}>
                Enjoy my recipe for Japanese Mille-Feuille Nabe with “a thousand layers“ of napa cabbage…{" "}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", columnGap: "0.25rem", color: "red" }}>
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  VIEW
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontStyle: "italic" }}>
                  the
                </Typography>{" "}
                <Typography variant="overline" component="span" sx={{ fontWeight: "700" }}>
                  POST
                </Typography>
                <IoIosArrowDropright />
              </div>
            </CardContent>
          </Card>{" "}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Popular;
