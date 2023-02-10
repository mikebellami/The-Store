import React from "react";
import styles from "./carticon.module.css";
import { CartSVG } from "../../assets";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const CartIcon = () => {
	const {
		state: { cart },
	} = useCartContext();

	if (!cart.length) return;

	return (
		<Link to="/cart" className={styles.wrapper}>
			<CartSVG />
		</Link>
	);
};

export default CartIcon;
