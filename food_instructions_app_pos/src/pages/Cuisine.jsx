import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  // const [cuisine, setCuisine] = useState([]);
  // let params = useParams();

  // useEffect(() => {
  //   getCuisine(params.type);
  // }, [params.type]);

  // const getCuisine = async (name) => {
  //   const data = await fetch(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
  //   );
  //   const recipes = await data.json();

  //   setCuisine(recipes.results);
  // };

  return (
    <Grid animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 } } >
      <Card>
        <Link to={"/recipe/123"}>
          <img src="https://spoonacular.com/recipeImages/652696-556x370.jpg" alt="Mushroom Spinach Soup" />
          <h4>Mushroom Spinach Soup</h4>
        </Link>
      </Card>
      {/* {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })} */}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3em;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
