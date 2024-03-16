import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { FaRainbow } from "react-icons/fa";
import { Link } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; 
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Topics() {
  const [topics, setTopics] = useState([{ topics: [] }]);

  const getAllTopics = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_TOPIC_SERVICE}/topic/getAllData`);
      setTopics(response.data.topics);
    } catch (err) {
      console.log("err = ", err);
    }
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <Box>
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
        <FaRainbow /> <Typography sx={{ fontWeight: "bold", margin: "1rem 0" }}>BROWSE POPULAR topicS</Typography>
        <Swiper ref={sliderRef} modules={[Autoplay]} spaceBetween={20} slidesPerView={5} loop={true}>
          {topics.map((topic, index) => (
            <>
              <SwiperSlide>
                <Link
                  href={`/topic/${topic.title}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={topic._id}>
                  <Card
                    sx={{
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      transition: "box-shadow 0.3s", // Add transition for smooth effect
                      "&:hover": {
                        boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)", // Adjust the shadow on hover
                      },
                    }}>
                    <CardMedia
                      component="img"
                      alt={topic.title}
                      image={`${process.env.REACT_APP_URL_TOPIC_SERVICE}/${topic.mainImage}`}
                      height={140}
                    />
                    <CardContent sx={{ color: "black", textAlign: "center" }}>
                      <Typography variant="inherit" component="span">
                        {topic.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
        <Button
          sx={{ position: "absolute", left: "-5%", bottom: "50%", top: "50%", padding: "1rem" }}
          onClick={handlePrev}
          variant="contained">
          <ChevronLeftIcon />
        </Button>
        <Button
          sx={{ position: "absolute", right: "-5%", bottom: "50%", top: "50%", padding: "1rem" }}
          onClick={handleNext}
          variant="contained">
          <ChevronRightIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default Topics;
