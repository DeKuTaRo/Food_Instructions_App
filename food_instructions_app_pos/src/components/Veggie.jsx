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

function Veggie() {
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
  }, [cardRef]);
  return (
    <Box sx={{ margin: "3rem 0rem" }}>
      <Grid container spacing={2} ref={cardRef}>
        <Grid item xs={6} md={3}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                "https://www.justonecookbook.com/wp-content/uploads/2019/11/Smoke-Miso-Butter-Turkey-Breast-5496-2-Holiday-II-1-533x800.jpg"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "700" }}>
                Our Best Holiday Recipes for The Unforgettable Feast
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={"https://www.justonecookbook.com/wp-content/uploads/2019/10/Miso-Chicken-2-IV-533x800.jpg"}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "700" }}>
                20 Best Japanese Chicken Recipes for Dinner
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={"https://www.justonecookbook.com/wp-content/uploads/2023/04/Vegetarian-Ramen-7133-IV-533x800.jpg"}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "700" }}>
                Easy and Authentic Ramen Recipes You Can Make at Home{" "}
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)", backgroundColor: "white" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                "https://www.justonecookbook.com/wp-content/uploads/2021/10/Sweet-Potato-Rice-2091-III-533x800.jpg"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "700" }}>
                Japanese Sweet Potato Rice さつまいもご飯{" "}
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Veggie;
