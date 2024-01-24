
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { FaRainbow } from "react-icons/fa";
import { Link } from "react-router-dom";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import sandwiches from "../../images/sandwiches.jpg";
import bread from "../../images/bread.jpeg";
import cheese from "../../images/cheese.jpg";
import salad from "../../images/salad.jpg";
import desserts from "../../images/dessert.jpg";
import cereals from "../../images/cereals.jpg";
import drink from "../../images/drink.jpg";
import soup from "../../images/soup.jpg";
import preserve from "../../images/preserve.jpg";

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
                image={sandwiches}
                 height={140}
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
           <Link to={`topic/Bread`}
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
                height={140}
                component="img"
                alt="green iguana"
                image={bread}
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
           <Link to={`topic/Preserve`}
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
                image={preserve}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Preserve
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>



            <Grid item xs={2}>
           <Link to={`topic/Salad`}
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
                image={salad}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Salad
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
            <Grid item xs={2}>
           <Link to={`topic/Desserts`}
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
                image={desserts}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Desserts
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
            <Grid item xs={2}>
           <Link to={`topic/Soup`}
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
                image={soup}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Soup
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>



            <Grid item xs={2}>
           <Link to={`topic/Drinks`}
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
                image={drink}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Drink
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
            <Grid item xs={2}>
           <Link to={`topic/Cereals`}
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
                image={cereals}
                 height={140}
              />
              <CardContent sx={{ color: "black", textAlign: "center" }}>
                <Typography variant="inherit" component="span">
                  Cereals
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
     </Box>
  );
}

export default Topics;
