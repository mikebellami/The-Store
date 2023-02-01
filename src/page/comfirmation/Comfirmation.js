import React from "react";
import "./comfirmation.css";
import { Checked } from "../../assets";

const Comfirmation = () => {
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
						<div className=""></div>
					</div>

					<span className="hr"></span>

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
						<p className="delivery-title">Delivery Address</p>
                        <span className="hr"></span>
						<p className="delivery-body">
							123 East North Street, South Bend,
						 West Coast,<br/>Main City,<br/> Central<br/>
						 <strong>State Phone: (+123-8293-8922-0)</strong>
						</p>
					</div>
					<span className="hr"></span>
					<button type="button" className="order-button">Return Home</button>
				</div>
			</div>
		</>
	);
};

export default Comfirmation;
