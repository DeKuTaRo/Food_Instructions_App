import Veggie from "../../components/Client/Veggie";
import Popular from "../../components/Client/Popular";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { FaRainbow } from "react-icons/fa";

import { motion } from "framer-motion";
import Headers from "../../components/Client/Headers";
import NavBar from "../../components/Client/Navbar";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />
      <Veggie />
      <Popular />
      <Box sx={{ backgroundColor: "gray", position: "absolute", left: "-10%", right: "-10%", width: "100vw" }}></Box>
      <Box
        sx={{
          padding: "2rem",
          margin: "2rem 0",
          boxShadow: " 0 0 10px 0 rgba(50, 50, 50, .15)",
          backgroundColor: "white",
          textAlign: "center",
          position: "relative",
        }}>
        <FaRainbow /> <Typography sx={{ fontWeight: "bold", margin: "1rem 0" }}>BROWSE POPULAR TOPICS</Typography>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/07/Gyoza-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Appertizer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={
                  "https://www.justonecookbook.com/wp-content/uploads/2015/10/Iced-Green-Tea-Latte-III-182x182.jpg"
                }
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Beverage
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2018/05/Souffle-Pancake-III-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Breakfast
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2016/12/Japanese-Cheesecake-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Dessert
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/09/Chicekn-Teriyaki-III-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Entre
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2018/01/Harusame-Salad-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Salad
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2018/04/Sansai-Gohan-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Side
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/04/Miso-Soup-New-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Soup
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default Home;
