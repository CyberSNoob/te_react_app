import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

export const getData = async (view) => {
  try {
    const response = await axios.get(`${API_URL}/api/${view}`);
    return response.data;
  } catch (e) {
    console.error("Error", e);
  }
};

export const postData = async (searchTerm) => {
  try {
    console.log("Attempt to post data.");
    const response = await axios.post(
      `${API_URL}/api/search`,
      { term: searchTerm },
      {
        "Content-Type": "application/json",
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postContact = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/contactform`, data, {
      "Content-Type": "application/json",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

getData.propTypes = { view: PropTypes.string.isRequired };
