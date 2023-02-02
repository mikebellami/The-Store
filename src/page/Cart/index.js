import React from "react";
import { ShoppingCartItem } from "../../component";
import styles from "./cart.module.css";

const Cart = () => {
	return (
		<div>
			<div className="row">
				<div className="col-md-5">
					<h3 className={styles.heading}>Shopping cart</h3>
					{Array(3)
						.fill(" ")
						.map(() => (
							<ShoppingCartItem />
						))}
				</div>
				<div className="col-md-1"></div>
				<div className="col-md-6">
					<h3 className={styles.heading}>Cart Summary</h3>
					<div className={styles.summaryWrapper}>
						<div className={styles.summaryRow}>
							<p>3 Items</p>
						</div>
						<div className={styles.summaryRow}>
							<p>Escrow Fee</p>
							<p>
								{new Intl.NumberFormat("en-GB", {
									style: "currency",
									currency: "NGN",
								}).format(8500)}
							</p>
						</div>
						<div className={styles.summaryRow}>
							<p>Subtotal</p>
							<p>
								{new Intl.NumberFormat("en-GB", {
									style: "currency",
									currency: "NGN",
								}).format(1500)}
							</p>
						</div>
						<button className={styles.btn}>Proceed to Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
