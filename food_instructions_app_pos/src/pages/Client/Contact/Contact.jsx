import React from "react";
import { motion } from "framer-motion";
import Headers from "../../../components/Client/Headers";
import NavBar from "../../../components/Client/Navbar";
import Topics from "../../../components/Client/Topics";
import Footer from "../../../components/Client/Footer";
import avatar from "../../../images/avatar.png";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const Contact = () => {
  const infor = [
    {
      name: "Cao Thành Tài",
      age: 24,
      email: "51900428@student.tdtu.edu.vn",
      imageUrl: `${avatar}`, // Thay đổi đường dẫn ảnh của bạn
    },
    {
      name: "Phạm Thanh Tuấn",
      age: 24,
      email: "51900460@student.tdtu.edu.vn",
      imageUrl:  `${avatar}`, // Thay đổi đường dẫn ảnh của bạn
    }
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: "0% 10%" }}
    >
      <Headers />
      <NavBar />
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h2" gutterBottom sx={{textAlign:"center", fontWeight:"700"}}>
          Contact With Us 
        </Typography>
        <Grid container spacing={3} style={{ marginTop: 40 }} >
          {infor.map((person, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <Card style={{ maxWidth: 500, margin: "0 auto" }}>
                <CardMedia
                  component="img"
                  alt={person.name}
                  style={{
                   
                    objectFit: "cover",
                  }}
                  image={person.imageUrl}
                />
                <CardContent
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h3" component="div">
                    {person.name}
                  </Typography>
                  <div style={{ fontSize: "10%" }}>
                    <Typography variant="h5" color="text.secondary">
                      Age: {person.age}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      Email: {person.email}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Topics />
      <Footer />
    </motion.div>
  );
};

export default Contact;
