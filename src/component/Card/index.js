import React, { useState } from "react";
import styles from "./Card.module.css";
import { CiCalendar } from "react-icons/ci";

const Card = ({ productImg, setModalOpen }) => {
	const [status] = useState("in-transit");
	const returnStatusColor = (status) => {
		var string;
		switch (status.toLowerCase()) {
			case "in-transit":
				string = "#6941C6";
				break;
			case "delivered":
				string = "#00D222";
				break;
			default:
				break;
		}
		// console.log(`color-${string}`);
		return `color:${string}`;
	};

	return (
		<>
			<div className={styles["productCard-wrapper"]}>
				<div className={styles["productCard-content"]}>
					<div className={styles["productCard-img"]}>
						<img src={productImg} alt="product-image" />
					</div>
					<div className="w-100">
						<p className={`${styles.status} ${returnStatusColor(status)}`}>
							In-Transit
						</p>
						<div className={styles["cardContent-wrapper"]}>
							<p className={styles.orderTitle}>Fancy Dress Inc.</p>
							<p className={styles.orderPrice}>
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(15)}
								<span className="ml-2">total</span>
							</p>
						</div>
						<p className={styles.orderNum}>
							Order Number: <span>43657687</span>
						</p>
						<div className={styles["cardContent-wrapper"]}>
							<div className={styles["cardContent-wrapper2"]}>
								<div className={styles.orderDate}>
									<span>
										<CiCalendar />
									</span>
									Order Date: 23 - 03 - 2022
								</div>
								<div className={styles.orderDate}>
									<span>
										<CiCalendar />
									</span>
									Delivery Date: 25 - 03 - 2022
								</div>
							</div>
							<button
								className={styles["productCard-btn"]}
								onClick={() => {
									console.log("asas");
									setModalOpen = { setModalOpen };
								}}
							>
								{status === "in-transit" ? "See Details" : "Report Dispute"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
