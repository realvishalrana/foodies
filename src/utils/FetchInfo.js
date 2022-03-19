import data from "../constants/index";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    case "American":
      response = data.american;
    case "Japanese":
      response = data.japanese;
    default:
      break;
  }
  await delay(delayTime);
  return response;
};

export default fetch;
