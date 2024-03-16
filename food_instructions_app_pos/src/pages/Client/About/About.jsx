import React from "react";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import soup from "../../../images/soup.jpg";
import preserve from "../../../images/preserve.jpg";
import Link from "@mui/material/Link";

import Topics from "../../../components/Client/Topics";

import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Footer from "../../../components/Client/Footer";
import Chatbot from "../../../components/Client/Chatbot/Chatbot";

const About = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}>
      <Headers />
      <NavBar />
      <Container sx={{ mt: 3 }}>
        {/* Header Section */}
        <Box
          style={{
            height: "20rem",
            backgroundImage: 'url("https://eventusproduction.com/wp-content/uploads/2016/12/freshbox-3-768x512.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}>
          <Typography
            variant="h2"
            color="text.primary"
            align="center"
            sx={{ mb: 3, color: "white", marginTop: "6rem" }}>
            Welcome to Travel to Food
          </Typography>
        </Box>

        {/* Our Journey Section */}
        <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Our Journey
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Travel to Food is your passport to the world of delightful culinary adventures. Born out of a shared
                passion for exploring global flavors, we founded this platform to guide fellow food enthusiasts on a
                journey of creating delicious dishes from around the globe.
              </Typography>
            </Paper>
          </Grid>

          {/* Meet the Creators Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Meet the Creators
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Say hello to [Founder 1's Name] and [Founder 2's Name], the culinary dreamers behind Travel to Food.
                Fueled by a love for diverse cuisines and a desire to share their gastronomic discoveries, they embarked
                on this journey to make the art of cooking accessible and enjoyable for everyone, regardless of their
                skill level.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Explore Cuisines Section */}
        <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Explore Cuisines with Us
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Embark on a culinary journey with us as we explore the rich and diverse world of cuisines. From
                mouth-watering street food to sophisticated dishes, we've got it all covered.
              </Typography>
            </Paper>
          </Grid>

          {/* Culinary Adventures Section */}

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                What Our Users Say
              </Typography>
              <Typography variant="body1" color="text.secondary">
                "Travel to Food has revolutionized my cooking experience. The recipes are easy to follow, and the
                cultural insights make it a delightful journey."
              </Typography>
              {/* Add more testimonials as needed */}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Culinary Adventures in Pictures
              </Typography>
              <Grid container spacing={2} alignItems="center">
                {/* Image Gallery */}
                <Grid item xs={6}>
                  <img src={preserve} alt="Preserve Cuisine" style={{ width: "100%", borderRadius: "8px" }} />
                </Grid>
                <Grid item xs={6}>
                  <img src={soup} alt="Soup Cuisine" style={{ width: "100%", borderRadius: "8px" }} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* Testimonials Section */}
        <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
          {/* Call-to-Action Section */}
          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                Join Us on This Culinary Adventure!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Subscribe to our newsletter for the latest recipes, cooking tips, and foodie updates.
              </Typography>
              {/* Add a subscription form or social media buttons */}
              <Link href={"/sign-up"}>
                <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
                  Sign Up Now!!!!
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Topics />
      <Chatbot />
      <Footer />
    </motion.div>
  );
};

export default About;
