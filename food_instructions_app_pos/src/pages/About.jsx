import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography style={{
          
          backgroundImage: 'url("https://eventusproduction.com/wp-content/uploads/2016/12/freshbox-3-768x512.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
         
        }}
      
      variant="h4" color="text.primary" align="center" sx={{ mb: 3,color:"white" }}>
      
        Welcome to Travel to Food
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Our Journey
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Travel to Food is your passport to the world of delightful culinary adventures. Born out
              of a shared passion for exploring global flavors, we founded this platform to guide
              fellow food enthusiasts on a journey of creating delicious dishes from around the globe.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Meet the Creators
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Say hello to [Founder 1's Name] and [Founder 2's Name], the culinary dreamers behind
              Travel to Food. Fueled by a love for diverse cuisines and a desire to share their
              gastronomic discoveries, they embarked on this journey to make the art of cooking
              accessible and enjoyable for everyone, regardless of their skill level.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
