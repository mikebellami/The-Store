import React from "react";
import styles from "./Tracker.module.css";
import { SlArrowRight } from "react-icons/sl";
import { FiBox, FiCheckSquare, FiShoppingCart, FiTruck } from "react-icons/fi";
import { SecondProductInfo } from "../../component";

const Tracker = () => {
	return (
		<>
			<div className="container">
				<div className={styles.trackerContainer}>
					<h1>My Account</h1>
					<div className={styles.hr}></div>
					<div className={styles.breadcrumb}>
						<div className={styles.breadcrumbTitle}>My Account </div>
						<div>
							<SlArrowRight fontSize="1rem" />
						</div>
						<div className={styles.breadcrumbActive}>Orders</div>
					</div>

					<div className="row">
						<div className="col-lg-7 mb-5">
							<div className={styles.trackerWrapper}>
								<div className={styles.process}>
									<ul>
										<li>
											<div className={styles.icon}>
												<FiShoppingCart />
											</div>
											<div className={styles.title}>Payments</div>
										</li>
										<li>
											<div className={styles.icon}>
												<FiBox />
											</div>
											<div className={styles.title}>Processing</div>
										</li>
										<li className={styles.active}>
											<div className={styles.icon}>
												<FiTruck />
											</div>
											<div className={styles.title}>In Transit</div>
										</li>

										<li>
											<div className={styles.icon}>
												<FiCheckSquare />
											</div>
											<div className={styles.title}>Delivered</div>
										</li>
										<li>
											<div className={styles.icon}>
												<FiCheckSquare />
											</div>
											<div className={styles.title}>Review</div>
										</li>
									</ul>
								</div>

								<div className={styles.timelineContainer}>
									<div className={styles.timelineTitle}>Track Details</div>
									{Array(6)
										.fill(" ")
										.map((_, index) => (
											<div className={styles.timelineWrapper}>
												<div className={styles.timestamp}>
													Jan <br />
													23
												</div>
												<div className={styles.timelineDivider}></div>
												<div className={styles.timelineDetails}>
													<p>Order Confirmed</p>
													<span>Order has been placed</span>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>

						<div className="col-lg-5 mb-5 ">
							<div className={styles.summaryWrapper}>
								<p className={styles.orderNum}>Order 43657687 </p>

								<div className="my-5">
									{Array(3)
										.fill(" ")
										.map((_, index) => (
											<div key={index}>
												<SecondProductInfo />
											</div>
										))}
								</div>

								<div className={styles.hr}></div>

								<div className={styles.feesContainer}>
									<div className={styles.feesDescription}>
										<p>Shipping</p>
										<p>
											{new Intl.NumberFormat("en-US", {
												style: "currency",
												currency: "NGN",
											}).format(12)}
										</p>
									</div>
									<div className={styles.feesDescription}>
										<p>Escrow Fee</p>
										<p>
											{new Intl.NumberFormat("en-US", {
												style: "currency",
												currency: "NGN",
											}).format(15)}
										</p>
									</div>
									<div className={styles.feesDescription}>
										<p>Shipping Fee</p>
										<p>
											{new Intl.NumberFormat("en-US", {
												style: "currency",
												currency: "NGN",
											}).format(15)}
										</p>
									</div>
									<div className={styles.feesDescriptionTotal}>
										<p>Total</p>
										<p>
											<strong>
												{new Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "NGN",
												}).format(15)}
											</strong>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tracker;
