import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;
const contentType = { "Content-Type": "application/json" };
const apiBasePath = `${API_URL}/api`;
export const getData = async (view) => {
	let url = `${apiBasePath}/${view}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (e) {
		console.error(`Unable to fetch from ${url}`, e);
	}
};

export const postData = async (searchTerm) => {
	try {
		console.log("Attempt to post data.");
		const response = await axios.post(
			`${apiBasePath}/search`,
			{ term: searchTerm },
			contentType,
		);
		console.log(response.data);
		return response.data;
	} catch (e) {
		console.error(`Unable to find the search term: ${searchTerm}`, e);
	}
};

export const postContact = async (data) => {
	try {
		const response = await axios.post(
			`${apiBasePath}/contactform`,
			data,
			contentType,
		);
		console.log(response.data);
		return response.data;
	} catch (e) {
		console.error(`Unable to post the form`, e);
	}
};

getData.propTypes = { view: PropTypes.string.isRequired };
