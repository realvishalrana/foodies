import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import PlaceHolder from "../img/1.png";
import { Link } from "react-router-dom";
import response from "../utils/FetchInfo";
import { SpinnerRoundOutlined } from "spinners-react";
import "../css/veggie1.css";

const { fetch } = response;

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    // const check = localStorage.getItem("veggie")
    // if (check) {
    //   setVeggie(JSON.parse(check))
    // } else {
    const data = await fetch({ category: "veggie-picks", delayTime: 3000 });
    // if (data) {
    //   localStorage.setItem("veggie", JSON.stringify(data.recipes));
    //   setVeggie(data.recipes);
    // }
    // const api = await fetch(
    //   `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPES_API}&number=9&tags=vegetarian`
    // );
    // const data = await api.json();
    if (data) {
      // localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Veggie Picks</h3>
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
          {!veggie || veggie.length === 0 ? (
            <div>
              <SpinnerRoundOutlined
                size={50}
                thickness={100}
                speed={82}
                color="rgba(57, 172, 87, 1)"
              />
            </div>
          ) : (
            veggie.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Card>
                    <Link to={"/recipe/" + recipe.id}>
                      <p>{recipe.title}</p>
                      <img
                        src={recipe.image ? recipe.image : PlaceHolder}
                        alt={recipe.title}
                      ></img>
                      <Gredients />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })
          )}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  @media screen and (min-width: 380) {
    display: flex;
    flex-direction: column;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0px);
    color: white;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Gredients = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
