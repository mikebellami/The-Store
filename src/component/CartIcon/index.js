import React from "react";
import styles from "./carticon.module.css";
import { CartSVG } from "../../assets";
import { useCartContext } from "../../context/cartContext";
import { Link, useMatch } from "react-router-dom";

const nonRoutes = ["/confirm", "/account", "/cart", "/payment", "/tracker"];

const CartIcon = () => {
	const {
		state: { cart },
	} = useCartContext();

	const homeMatch = useMatch("/:id");
	const productMatch = useMatch("/product/:id");

	if (!cart.length) return;

	if (!productMatch && homeMatch && nonRoutes.includes(homeMatch.pathname))
		return;

	return (
		<Link to="/cart" className={styles.wrapper}>
			<CartSVG />
		</Link>
	);
};

export default CartIcon;
