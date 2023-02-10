import axios from "axios";
// import { fireSwalError, getFromStorage } from "../constants";

const api = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? `${process.env.REACT_APP_TESTURL}`
			: `${process.env.REACT_APP_LIVEURL}`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response.data,
	null
	// (error) => {
	// 	if (
	// 		error.response.status === 401 ||
	// 		error.response.data.message === "401 Unauthorized"
	// 	) {
	// 		localStorage.removeItem("token");
	// 		localStorage.removeItem("user");
	// 		// window.location.reload();
	// 	} else {
	// 		// fireSwalError(error.response.data);
	// 	}
	// }
);

export const getMerchant = (id, page) =>
	api.get(`/product/merchantStore`, {
		params: {
			merchantCode: id,
			page,
		},
	});

export const getProductDetails = (id) =>
	api.get(`/product/getProduct?productID=${id}`);
