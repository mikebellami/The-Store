import React from "react";
import "./confirmation.css";
import { Checked } from "../../assets";
import { ProductInfo } from "../../component";

const Confirmation = () => {
	return (
		<>
			<div className="container solid d-flex align-item-center justify-content-center">
				<div className="order-container solid">
					<Checked />
					<p className="order-placed">Order placed.</p>
					<p className="order-info">
						You can check and track your orders
						<br /> from your account
					</p>

					<div>
						{Array(3)
							.fill(" ")
							.map(() => (
								<ProductInfo />
							))}
					</div>

					<div className="hr"></div>

					<div className="fees-container ">
						<div className="fees-description">
							<p>Shipping</p>
							<p>
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(12)}
							</p>
						</div>
						<div className="fees-description">
							<p>Subtotal</p>
							<p>
								<strong>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(15)}
								</strong>
							</p>
						</div>
					</div>

					<p className="delivery-title">Delivery Address</p>

					<div className="hr"></div>
					<div className="delivery-container">
						<p className="delivery-body">
							123 East North Street, South Bend, West Coast,
							<br />
							Main City,
							<br /> Central
							<br />
							<strong>State Phone: (+123-8293-8922-0)</strong>
						</p>
					</div>
					<span className="hr"></span>
					<button type="button" className="order-button">
						Return Home
					</button>
				</div>
			</div>
		</>
	);
};

export default Confirmation;
