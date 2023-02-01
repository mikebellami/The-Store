import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
	const initialState = {
		store: null,
		cart: [],
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				//? if is not null and the store of the new item isnt the store in state return state
				if (
					state.store &&
					action.payload.product.store._id !== state?.store?._id
				) {
					// fireSwalError(
					// 	"You cant have products from different stores in the cart"
					// );
					return state;
				}

				//? if item is in cart return state
				if (
					state.cart.some(
						(item) => item.product._id === action.payload.product._id
					)
				)
					return state;

				var stateCopy = { ...state };

				stateCopy = { ...stateCopy, cart: [...stateCopy.cart, action.payload] };

				//? if there is nothing in the cart set the store to the store of the item
				if (!state.cart.length) {
					stateCopy = { ...stateCopy, store: action.payload.product.store };
				}

				// fireSwalSuccess("Item added to cart");

				return stateCopy;

			case "REMOVE":
				const newCart = state.cart.filter(
					(item) => item.product._id !== action.payload
				);

				if (!!newCart.length) {
					return {
						store: state.store,
						cart: newCart,
					};
				} else {
					return {
						store: null,
						cart: [],
					};
				}

			case "CHANGE-QUANTITY":
				// if quantity is zero remove item form cart
				if (action.payload.quantity === 0) {
					// if cart is empty clear store
					const newCart = state.cart.filter(
						(item) => item.product._id !== action.payload.id
					);

					if (!!newCart.length) {
						return {
							store: state.store,
							cart: newCart,
						};
					} else {
						return {
							store: null,
							cart: [],
						};
					}
				} else {
					const indexOfObjectToUpdate = state.cart.findIndex(
						({ product }) => product._id === action.payload.id
					);

					state.cart[indexOfObjectToUpdate].quantity = action.payload.quantity;

					return {
						...state,
						cart: state.cart,
					};
				}

			case "CLEAR":
				return {
					store: null,
					cart: [],
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<CartContext.Provider
			value={{
				state,
				dispatch,
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
