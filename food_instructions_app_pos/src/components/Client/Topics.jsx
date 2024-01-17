
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { FaRainbow } from "react-icons/fa";
import { Link } from "react-router-dom";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function Topics() {
  return (
    <Box>
      <Box 
      sx={{ backgroundColor: "gray", position: "absolute", left: "-10%", right: "-10%", width: "100vw" }}></Box>
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
            <Link to={`topic/Sandwiches`}
             style={{ textDecoration: "none", color: "inherit" }}>
             <Card
              sx={{
                 
                  backgroundColor: "white",
                  
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s", // Add transition for smooth effect
                  "&:hover": {
                    boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)", // Adjust the shadow on hover
                  },
                }}
             >
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/07/Gyoza-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Sandwiches
                </Typography>
              </CardContent>
            </Card>
            </Link>
           
          </Grid>
          <Grid item xs={2}>
           <Link to={`detail/Sandwiches`}
             style={{ textDecoration: "none", color: "inherit" }}>
             <Card
              sx={{
                 
                  backgroundColor: "white",
                  
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s", // Add transition for smooth effect
                  "&:hover": {
                    boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)", // Adjust the shadow on hover
                  },
                }}
             >
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/07/Gyoza-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Bread
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
          <Grid item xs={2}>
           <Link to={`detail/Sandwiches`}
             style={{ textDecoration: "none", color: "inherit" }}>
             <Card
              sx={{
                 
                  backgroundColor: "white",
                  
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s", // Add transition for smooth effect
                  "&:hover": {
                    boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)", // Adjust the shadow on hover
                  },
                }}
             >
              <CardMedia
                component="img"
                alt="green iguana"
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/07/Gyoza-II-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Cear
                </Typography>
              </CardContent>
            </Card>
            </Link>
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
                image={"https://www.justonecookbook.com/wp-content/uploads/2017/09/Chicekn-Teriyaki-III-182x182.jpg"}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Desserts
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
                  Drink
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
                  Side dish
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
     </Box>
  );
}

export default Topics;
