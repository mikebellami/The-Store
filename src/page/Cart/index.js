import React from "react";
import { useNavigate } from "react-router";
import { ShoppingCartItem } from "../../component";
import { useCartContext } from "../../context/cartContext";
import styles from "./cart.module.css";

const Cart = () => {
	const { state, price } = useCartContext();
	const navigate = useNavigate();

	return (
		<div className="container">
			{!!state.cart.length ? (
				<div className="row ">
					<div className="col-lg-6 ">
						<h3 className={styles.heading}>Shopping cart</h3>
						{state.cart.map((item, index) => (
							<ShoppingCartItem item={item} key={index} />
						))}
					</div>
					<div className="col-lg-1"></div>
					<div className="col-lg-5">
						<h3 className={styles.heading}>Cart Summary</h3>
						<div className={styles.summaryWrapper}>
							<div className={styles.summaryRow}>
								<p>{state?.cart?.length} items in cart</p>
							</div>
							{/* <div className={styles.summaryRow}>
								<p>Escrow Fee</p>
								<p>
									{new Intl.NumberFormat("en-GB", {
										style: "currency",
										currency: "NGN",
									}).format(8500)}
								</p>
							</div> */}
							<div className={styles.summaryRow}>
								<p>Subtotal</p>
								<p>
									{new Intl.NumberFormat("en-GB", {
										style: "currency",
										currency: "NGN",
									}).format(price)}
								</p>
							</div>
							<button
								className={styles.btn}
								onClick={() => navigate("/payment")}
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="col-12 d-flex align-items-center justify-content-center mt-5">
					<h1>Nothing in the cart</h1>
				</div>
			)}
		</div>
	);
};

export default Cart;
