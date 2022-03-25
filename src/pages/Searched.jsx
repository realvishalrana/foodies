import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import fetch from "../utils/FetchInfo";
import { SpinnerRoundOutlined } from "spinners-react";
import veggie1 from "../css/veggie1.css";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();
  let found = params.search;

  const getSearched = async () => {
    const data = await fetch({ category: found });
    if (data) {
      // localStorage.setItem("searchedRecipes", JSON.stringify(data.recipes));
      setSearchedRecipes(data.recipes);
    }
  };

  // const getSearched = async (name) => {
  //   const data = await fetch();

  // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPES_API}&query =${name}`
  //   const recipe = await data.json();
  //   setSearchedRecipes(recipe.results);
  // };

  useEffect(() => {
    getSearched(found);
  }, [found]);

  return (
    <Grid>
      {searchedRecipes &&
        searchedRecipes.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src="{item.image}" alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
    </Grid>
  );
};
const Grid = styled.div`
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

export default Searched;
