import React from 'react';
import { Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Container component="footer" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} >
          <Typography variant="h6" color="text.primary" gutterBottom>
            Travel to Food
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your source for everyday home cooking recipes.
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6} sx={{ display:"flex",flexDirection:"column",alignItems:"end"}} >
          <Typography variant="h6" color="text.primary" gutterBottom>
            Quick Links
          </Typography>
          <nav>
            <Link href={"/"} variant="body2" color="text.secondary">
              Home
            </Link>
            {' | '}
            <Link href={"/searched"} variant="body2" color="text.secondary">
              Recipes
            </Link>
            {' | '}
            <Link href={"/about"} variant="body2" color="text.secondary">
              About
            </Link>
            {' | '}
            <Link href="#" variant="body2" color="text.secondary">
              Contact
            </Link>
          </nav>
        </Grid>
      </Grid>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
        © {new Date().getFullYear()}   Travel to Food. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
