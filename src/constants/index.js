import Swal from "sweetalert2";

export const fireSwalError = (message) => {
	return Promise.resolve(
		Swal.fire({
			icon: "error",
			toast: true,
			position: "top-end",
			title: message,
			showConfirmButton: false,
			timer: 2000,
		})
	);
};

export const fireSwalSuccess = (message) => {
	return Promise.resolve(
		Swal.fire({
			icon: "success",
			toast: true,
			position: "top-end",
			title: message,
			showConfirmButton: false,
			timer: 2000,
		})
	);
};

export const setToStorage = (key, value) => {
	let storedValue = JSON.stringify(value);
	localStorage.setItem(key, storedValue);
};

export const getFromStorage = (key) => {
	let value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};
