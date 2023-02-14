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

api.interceptors.response.use((response) => response.data, null);

export const getMerchant = (id, page) =>
	api.get(`/product/merchantStore`, {
		params: {
			merchantCode: id,
			page,
		},
	});

export const getProductDetails = (id) =>
	api.get(`/product/getProduct?productID=${id}`);

export const preCheckout = (data) => api.post("/order/preCheckout", data);

export const getStorePickupAddress = () =>
	api.get("/userAccount/getPickupAddress");
