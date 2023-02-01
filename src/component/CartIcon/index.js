import React from "react";
import styles from "./carticon.module.css";
import { ReactComponent as CartSVG } from "../../assets/img/shopping-bag.svg";
import { useCartContext } from "../../context/cartContext";

const CartIcon = () => {
	const {
		state: { cart },
	} = useCartContext();

	if (!cart.length) return;

	return (
		<div className={styles.wrapper}>
			<CartSVG />
		</div>
	);
};

export default CartIcon;
