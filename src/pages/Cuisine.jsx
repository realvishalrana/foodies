import { useState, React, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import fetchCuisine from "../utils/FetchInfo";
import { SpinnerRoundOutlined } from "spinners-react";
import veggie1 from "../css/veggie1.css";
import { Splide } from "@splidejs/react-splide";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  let paramsValue = params.type;

  useEffect(() => {
    getCuisine(paramsValue);
    // console.log(params.type);
  }, [paramsValue]);

  const getCuisine = async () => {
    const data = await fetchCuisine({ category: paramsValue });
    if (data) {
      localStorage.setItem("cuisine", JSON.stringify(data));
      setCuisine(data.results);
    }
  };

  // const getCuisine = async (name) => {
  //   const data = await fetchCuisine(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPES_API}&cuisine=${name}`
  //   );
  //   const recipe = await data.json();
  //   setCuisine(recipe.results);
  // };

  return (
    <div>
      <Splide
        className="loader"
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
        }}
      >
        {!cuisine || cuisine.length === 0 ? (
          <div>
            <SpinnerRoundOutlined
              size={50}
              thickness={100}
              speed={82}
              color="rgba(57, 172, 87, 1)"
            />
          </div>
        ) : (
          <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cuisine &&
              cuisine.map((item) => {
                return (
                  <Card key={item.id}>
                    <Link to={"/recipe/" + item.id}></Link>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                  </Card>
                );
              })}
          </Grid>
        )}
      </Splide>
    </div>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
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
