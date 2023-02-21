import React, { useState } from "react";
import "./confirmation.css";
import { Checked } from "../../assets";
import { ProductInfo } from "../../component";
import { useCartContext } from "../../context/cartContext";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import { getFromStorage } from "../../constants";

const Confirmation = () => {
	const [searchParams] = useSearchParams();
	const { state, price, dispatch } = useCartContext();

	const [info] = useState(JSON.parse(getFromStorage("info")));
	const [token] = useState(getFromStorage("token"));

	// eslint-disable-next-line no-unused-vars
	const { data } = useQuery({
		queryKey: ["verify-token"],
		queryFn: () =>
			verifyToken({ reference: searchParams.get("reference"), token }),
		enabled: !!token && !!searchParams.get("reference"),
		onSuccess: (data) => console.log(data),
	});

	const returnHome = () => {
		dispatch({ action: "CLEAR" });
		localStorage.clear();
	};

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
						{state?.cart?.map((item, index) => (
							<ProductInfo item={item} key={index} />
						))}
					</div>

					<div className="hr"></div>

					<div className="fees-container">
						<div className="fees-description">
							<p>Cart Price</p>
							<p>
								{new Intl.NumberFormat("en-GB", {
									style: "currency",
									currency: "NGN",
								}).format(price)}
							</p>
						</div>
						<div className="fees-description">
							<p>Pepperest Fees</p>
							<p>
								{new Intl.NumberFormat("en-GB", {
									style: "currency",
									currency: "NGN",
								}).format(parseFloat(info?.pepperestfees))}
							</p>
						</div>
						{!!info?.courierprice && (
							<div className="fees-description">
								<p>Shipping</p>
								<p>
									{new Intl.NumberFormat("en-GB", {
										style: "currency",
										currency: "NGN",
									}).format(parseFloat(info?.courierprice || 0))}
								</p>
							</div>
						)}

						<div className="fees-description">
							<p>Subtotal</p>
							<p>
								<strong>
									{new Intl.NumberFormat("en-GB", {
										style: "currency",
										currency: "NGN",
									}).format(
										price +
											parseFloat(info?.pepperestfees || 0) +
											parseFloat(info?.courierprice || 0)
									)}
								</strong>
							</p>
						</div>
					</div>

					{!!info?.address && (
						<>
							<p className="delivery-title">Delivery Address</p>

							<div className="hr"></div>
							<div className="delivery-container">
								<p className="delivery-body">
									{info?.address?.address},<br />
									{info?.address?.city},<br />
									{info?.address?.country},<br />
									<strong>Phone: ({info?.address?.phone})</strong>
								</p>
							</div>
							<span className="hr"></span>
						</>
					)}

					<Link to="/" className="order-button" onClick={returnHome}>
						Return Home
					</Link>
				</div>
			</div>
		</>
	);
};

export default Confirmation;
