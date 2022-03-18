import { useState, React, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"

function Cuisine() {
  const [cuisine, setCuisine] = useState([])
  let params = useParams()

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPES_API}&cuisine=${name}`
    )
    const recipe = await data.json()
    setCuisine(recipe.results)
  }

  useEffect(() => {
    getCuisine(params.type)
    console.log(params.type)
  }, [params.type])

  return (
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
          )
        })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`

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
`

export default Cuisine
