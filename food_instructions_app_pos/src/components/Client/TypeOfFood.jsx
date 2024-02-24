import { Box, Typography, Card, CardContent, CardMedia, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Dữ liệu cứng cho loại thức ăn
import breakfastImage from "../../images/breakfast.jpg";
import lunchImage from "../../images/lunch.jpg";
import dinnerImage from "../../images/dinner.jpg";
import snackImage from "../../images/snack.webp";
import teatimeImage from "../../images/teatime.jpg";

import {
  FaCoffee,
  FaUtensils,
  FaWineBottle,
  FaMugHot,
  FaCookie, // Replace FaTea with another available icon, in this case FaMugHot
} from "react-icons/fa";

const foodTypesData = [
  { title: "Breakfast", image: `${breakfastImage}` },
  { title: "Lunch", image:`${lunchImage}` },
  { title: "Dinner", image: `${dinnerImage}` },
  { title: "Snack", image: `${snackImage}`},
  { title: "Teatime", image: `${teatimeImage}` },
];

function FoodTypes() {
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
        }}
      >
        <Typography sx={{ fontWeight: "bold", margin: "1rem 0" }}>BROWSE POPULAR FOOD TYPES</Typography>
        <Swiper modules={[Autoplay]} slidesPerView={3} loop={true} autoplay={{ delay: 2000 }}>
          {foodTypesData.map((foodType, index) => (
            <SwiperSlide key={index}>
              <Link href={`/topic2/${foodType.title}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.3s",
                    margin: "0.5rem", // Khoảng trống giữa các card
                    "&:hover": {
                      boxShadow: "0 0 20px 0 rgba(50, 50, 50, .3)",
                    },
                  }}
                >
                  <CardMedia component="img" alt={foodType.title} height={140} image={foodType.image} />
                  <CardContent sx={{ color: "black", textAlign: "center" }}>
                    {foodType.title === "Breakfast" && <FaCoffee />} {/* Icon cho mỗi loại thức ăn */}
                    {foodType.title === "Lunch" && <FaUtensils />}
                    {foodType.title === "Dinner" && <FaWineBottle />}
                    {foodType.title === "Snack" && <FaCookie />}
                    {foodType.title === "Teatime" && <FaMugHot />}
                    <Typography variant="inherit" component="span">
                      {foodType.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
export default FoodTypes;
