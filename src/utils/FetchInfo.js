/* eslint-disable no-fallthrough */
import data from "../constants/index";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fetch = async ({ category, delayTime = 1000 }) => {
  let response = {};
  switch (category) {
    case "veggie-picks":
      response = data.veggiePicks;
      break;
    case "popular-picks":
      response = data.popularPicks;
      break;

    case "Thai":
      response = data.thai;
      break;

    case "American":
      response = data.american;
      break;

    case "Japanese":
      response = data.japanese;
      break;

    case "infomation":
      response = data.infomation;
      break;

    default:
      break;
  }
  return response;
};

const fetchById = async (idProp) => {
  const { extendedIngredients } = data.infomation;
  for (let i = 0; i < extendedIngredients.length; i++) {
    if (extendedIngredients[i].id === idProp) {
      return extendedIngredients[i];
    }
  }
};

const gereralDetailsById = async (idProp) => {
  const mergedArray = [
    ...data.american,
    ...data.japanese,
    ...data.thai,
    ...data.gereralDetails,
  ];
  let x;

  for (let i = 0; i < mergedArray.length; i++) {
    if (mergedArray[i].id === parseInt(idProp)) {
      x = mergedArray[i];
      console.log(x);
    }
  }
  return x.value;
};

const response = { fetch, fetchById, gereralDetailsById };

export default response;
