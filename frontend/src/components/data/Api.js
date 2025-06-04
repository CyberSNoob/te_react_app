import axios from "axios";
import PropTypes from "prop-types";

export const getData = async (view) => {
  try {
    const response = await axios.get(`api/${view}`);
    console.log(`This is ${view} data: `, response.data);
    return response.data;
  } catch (e) {
    console.error("Error", e);

    throw e;
  }
};

export const postData = async (searchTerm) => {
  try {
    const response = await axios.post(
      "api/search",
      { term: searchTerm },
      {
        "Content-Type": "application/json ",
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

getData.propTypes = { view: PropTypes.string.isRequired };
