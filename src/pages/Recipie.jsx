import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import response from "../utils/FetchInfo";

const { gereralDetailsById } = response;
function Recipie() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await gereralDetailsById(params.name);
      if (data) {
        // localStorage.setItem("details", JSON.stringify(data));
        setDetails(data);
      }
    };
    if (params.name) {
      fetchDetails();
    }
  }, [params.name]);

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     const data = await fetch(
  //       `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_RECIPES_API}`
  //     );
  //     const detailsData = await data.json();
  //     setDetails(detailsData);
  // console.log(detailsData);
  //   };
  //ingredients not work
  //   if (params.name) {
  //     fetchDetails();
  //   }
  // }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.data}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <div>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {/* {details.extendedIngredients.map((ingredient) => {
              <li key={ingredient.id}>{ingredient.original}</li>;
            })} */}
            {/* {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}*/}
            {details.extendedIngredients.map((ingredient) => {
              if (ingredient.id)
                return <li key={ingredient.id}>{ingredient.original}</li>;
              else return null;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    .img {
      height: 161px;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    margin-top: 3rem;
    ${"" /* float: left; */}
  }
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipie;
