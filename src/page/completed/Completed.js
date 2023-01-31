import React from "react";
import "./completed.css";
import { Checked } from "../../assets";

const Completed = () => {
	return (
		<>
			<div className="container">
				<div className="order-container solid">
					<Checked />
					<p className="order-placed">Order placed.</p>
					<p className="order-info">
						You can check and track your orders from your account
					</p>
					<div className="fees-container ">
						<div className="fees-description">
							<p>Shipping</p>
							<p>$12.00</p>
						</div>
						<div className="fees-description">
							<p>Subtotal</p>
							<p>
								<strong>$42.00</strong>
							</p>
						</div>
					</div>
					<div className="delivery-container">
						<p>Delivery Address</p>
						<p>
							123 East North Street, South Bend, West Coast,Main City, Central
							State Phone: (+123-8293-8922-0)
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Completed;
