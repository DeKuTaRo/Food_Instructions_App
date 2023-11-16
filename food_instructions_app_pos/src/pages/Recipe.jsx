import { useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
  // let params = useParams();
  // const [details, setDetails] = useState({});
  // const [activeTab, setActiveTab] = useState("instructions");

  // const fetchDetails = async () => {
  //   const data = await fetch(
  //     `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
  //   );
  //   const detailData = await data.json();

  //   setDetails(detailData);
  //   console.log(detailData);
  // };

  // useEffect(() => {
  //   fetchDetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params.name]);

  return (
    <div>
      <div>
        <h2>Mushroom Spinach Soup</h2>
        <img src="https://spoonacular.com/recipeImages/652696-556x370.jpg" alt="Mushroom Spinach Soup" />
      </div>
      <div>
        <div>
          {/* <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instruction
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredient
          </Button> */}
        </div>

        {/* {activeTab === "instructions" && ( */}
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: "Mushroom Spinach Soup" }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: "Mushroom Spinach Soup" }}></h3>
        </div>
        {/* )} */}

        {/* {activeTab === "ingredients" && ( */}
        <ul>
          <li>Egg</li>
          <li>Tomato</li>
          {/* {details.extendedIngredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          })} */}
        </ul>
        {/* <ul>
          {details.extendedIngredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          })}
        </ul> */}
        {/* )} */}
      </div>
    </div>
  );
}

// const DetailWrapper = styled.div`
//   margin-top: 5rem;
//   margin-bottom: 5rem;
//   display: flex;
//   flex-wrap: wrap;

//   .active {
//     background: linear-gradient(35deg, #494949, #313131);
//     color: white;
//   }

//   img {
//     border-radius: 2rem;
//   }

//   h2 {
//     margin-bottom: 2rem;
//   }

//   li {
//     font-size: 1.2rem;
//     line-height: 1.8rem;
//     margin-top: 0.5rem;
//   }

//   ul {
//     margin-top: 2rem;
//   }

//   @media only screen and (max-width: 768px) {
//     padding: 0 2rem;

//     img {
//       width: 100%;
//     }
//   }
// `;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   color: #313131;
//   background: white;
//   border: 2px solid black;
//   margin-right: 2rem;
//   font-weight: 600;
//   border-radius: 2rem;
//   cursor: pointer;

//   @media only screen and (max-width: 768px) {
//     margin: auto;
//   }
// `;

// const Info = styled.div`
//   margin-left: 4rem;

//   h3 {
//     font-size: 1rem;
//     line-height: 1.5rem;
//   }

//   @media only screen and (max-width: 768px) {
//     margin: 2rem 0;

//     div {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//   }
// `;

export default Recipe;
