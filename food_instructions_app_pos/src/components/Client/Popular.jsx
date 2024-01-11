import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
function Popular() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = "b56b11fadefc479ba229888bcf6d063e";
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=Delicious cuisines of the world&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box sx={{ margin: "3rem 0rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.25rem",
            margin: "1rem 0",
          }}
        >
          <Typography
            component="span"
            sx={{
              display: "block",
              width: 40,
              height: 40,
              fill: "#D0021B",
              background: "url('YOUR_ICON_URL') center no-repeat",
              backgroundSize: "contain",
            }}
          ></Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: "700", fontSize: "1.5rem" }}
          >
            Latest Posts
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "0.25rem",
          }}
        >
          <Typography component="span" sx={{ fontWeight: "700" }}>
            VIEW
          </Typography>{" "}
          <Typography component="span" sx={{ fontStyle: "italic" }}>
            all
          </Typography>{" "}
          <Typography component="span" sx={{ fontWeight: "700" }}>
            POST
          </Typography>
          <IoIosArrowDropright />
        </div>
      </div>
      <Grid container spacing={2}>
        {articles.slice(0, 3).map((article, index) => (
          <Grid key={index} item xs={4}>
          <Link
              to={`/detail/${index}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                sx={{
                  boxShadow: "0 0 10px 0 rgba(50, 50, 50, .15)",
                  backgroundColor: "white",
                  height: "30em",
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
                  alt={article.title}
                  image={article.urlToImage}
                  height={"20 rem"}
                  sx={{
                    flex: "1",
                    height: "200px", // Chiều cao mặc định cho hình ảnh
                    objectFit: "cover", // Đảm bảo hình ảnh không bị méo khi được thu nhỏ
                    aspectRatio: "16/9",
                  }}
                />
                <CardContent
                  sx={{
                    color: "black",
                    maxHeight: "200px",
                    overflow: "hidden",
                    flex: "1",

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {article.author}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "700",
                      marginTop: "0.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="div"
                    sx={{
                      margin: "0.5rem 0",
                      maxHeight: "70px", // Chiều cao tối đa cho nội dung quảng cáo
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {article.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Popular;
