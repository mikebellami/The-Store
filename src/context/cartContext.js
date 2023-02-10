import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import {
	fireSwalError,
	fireSwalSuccess,
	getFromStorage,
	setToStorage,
} from "../constants";

const CartContext = createContext();

const CartProvider = ({ children }) => {
	const initialState = getFromStorage("state") || {
		merchant_email: null,
		cart: [],
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				//? if is not null and the merchant of the new item isnt the merchant in state return state
				if (
					state.merchant_email &&
					action.payload.product.merchant_email !== state?.merchant_email
				) {
					fireSwalError(
						"You cant have products from different stores in the cart"
					);
					return state;
				}

				//? if item is in cart return state
				if (
					state.cart.some(
						(item) => item.product.id === action.payload.product.id
					)
				) {
					fireSwalSuccess("Item already in cart");
					return state;
				}

				var stateCopy = { ...state };

				stateCopy = { ...stateCopy, cart: [...stateCopy.cart, action.payload] };

				//? if there is nothing in the cart set the merchant to the merchant of the item
				if (!state.cart.length) {
					stateCopy = {
						...stateCopy,
						merchant_email: action.payload.product.merchant_email,
					};
				}

				fireSwalSuccess("Item added to cart");

				return stateCopy;

			case "REMOVE":
				const newCart = state.cart.filter(
					(item) => item.product.id !== action.payload
				);

				if (!!newCart.length) {
					return {
						merchant: state.merchant,
						cart: newCart,
					};
				} else {
					return {
						merchant: null,
						cart: [],
					};
				}

			case "CHANGE-QUANTITY":
				// if quantity is zero remove item form cart
				if (action.payload.quantity === 0) {
					// if cart is empty clear merchant
					const newCart = state.cart.filter(
						(item) => item.product.id !== action.payload.id
					);

					if (!!newCart.length) {
						return {
							merchant: state.merchant,
							cart: newCart,
						};
					} else {
						return {
							merchant: null,
							cart: [],
						};
					}
				} else {
					const indexOfObjectToUpdate = state.cart.findIndex(
						({ product }) => product.id === action.payload.id
					);

					state.cart[indexOfObjectToUpdate].quantity = action.payload.quantity;

					return {
						...state,
						cart: state.cart,
					};
				}

			case "CLEAR":
				return {
					merchant: null,
					cart: [],
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const price = useMemo(
		() =>
			state.cart.reduce((accumulator, { product, quantity }) => {
				return accumulator + parseInt(product.amount) * quantity;
			}, 0),
		[state]
	);

	useEffect(() => {
		setToStorage("state", state);
	}, [state]);

	return (
		<CartContext.Provider
			value={{
				state,
				dispatch,
				price,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};

export default CartProvider;
