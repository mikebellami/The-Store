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

export const getMerchant = ({
	id,
	page = 1,
	sortBy = "id",
	direction = "ASC",
	keyword = "",
}) =>
	api.get(`/product/merchantStore`, {
		params: {
			merchantCode: id,
			page,
			sortBy,
			direction,
			keyword,
		},
	});

export const getProductDetails = (id) =>
	api.get(`/product/getProduct?productID=${id}`);

export const preCheckout = (data) => api.post("/order/preCheckout", data);

export const placeOrder = ({ data, token }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return api.post("/order/placeOrder", data, config);
};

export const getStorePickupAddress = ({ token, merchantID }) => {
	return api.get("/precheckout/getMerchantPickupAddress", {
		params: {
			merchantID,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const verifyToken = ({ reference, token }) =>
	api.get("/order/payment/callback", {
		params: {
			reference,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
