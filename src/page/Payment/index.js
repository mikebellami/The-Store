import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import {
	CustomRadio,
	CustomInput,
	ProductInfo,
	PaymentCard,
} from "../../component";
import styles from "./payment.module.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Payment = () => {
	const [currentStep, setCurrentStep] = useState("a");

	const deliveryInformationInitialValues = {
		fullname: "",
		email: "",
		phone: "",
		deliveryMethod: "",
		deliveryCompany: "",
		address: "",
		city: "",
		state: "",
		"zip-code": "",
	};
	const deliveryInformationValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Please provide a valid email")
			.required("Please provide an email"),
		fullname: Yup.string().required("Please provide a fullname"),
		phone: Yup.string()
			.length(11, "Please provide a valid phone number")
			.required("Please provide a phone number"),
		deliveryMethod: Yup.string().required("Please provide a delivery method"),
		deliveryCompany: Yup.string().required("Please provide a delivery comapny"),
		address: Yup.string().required("Please provide your delivery address"),
		city: Yup.string().required("Please provide your city"),
		state: Yup.string().required("Please provide your state"),
		"zip-code": Yup.string().required("Please provide your zip-code"),
	});

	const paymentMethodInitialValues = {
		paymentMethod: "",
	};
	const paymentMethodValidationSchema = Yup.object().shape({
		paymentMethod: Yup.string().required("Please provide an payment method"),
	});

	return (
		<div className="container">
			<div className="row pt-5">
				<div
					className={`${
						currentStep !== "c" ? "col-lg-6" : "col-lg-6 mx-auto"
					} d-flex justify-content-center`}
				>
					<Accordion allowZeroExpanded={false} preExpanded={["a"]}>
						<AccordionItem
							uuid="a"
							dangerouslySetExpanded={currentStep === "a"}
						>
							<AccordionItemHeading>
								<AccordionItemButton>
									1. Delivery Information
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<Formik
									initialValues={deliveryInformationInitialValues}
									validationSchema={deliveryInformationValidationSchema}
									onSubmit={() => {
										setCurrentStep("b");
									}}
								>
									{({ values, handleSubmit, handleChange }) => (
										<form onSubmit={handleSubmit}>
											<div>
												<h4 className={styles.sectionHeader}>Contact</h4>
												<CustomInput
													title="Full Name"
													onChange={handleChange}
													name="fullname"
													value={values.fullname}
												/>
												<CustomInput
													title="Email Address"
													onChange={handleChange}
													name="email"
													value={values.email}
												/>
												<CustomInput
													title="Phone Number"
													onChange={handleChange}
													name="phone"
													value={values.phone}
												/>
											</div>

											<div>
												<h4
													className={styles.sectionHeader}
													style={{ marginTop: 25 }}
												>
													Delivery Method
												</h4>
												<div className="d-flex" style={{ gap: 20 }}>
													<CustomRadio
														title="Home Delivery"
														name="deliveryMethod"
														id="home"
														value="home"
														onChange={handleChange}
													/>
													<CustomRadio
														title="Store Pickup"
														name="deliveryMethod"
														id="store"
														value="store"
														onChange={handleChange}
													/>
												</div>
												<ErrorMessage
													component="div"
													className="text-danger"
													name="deliveryMethod"
												/>

												<h4 className={styles.sectionSubHeader}>
													Select Delivery Company
												</h4>
												<CustomRadio
													title={
														<div className="w-100 d-flex justify-content-between">
															<p className="m-0">GIG Logistics</p>
															<p className="m-0">3 Days</p>
															<p className="m-0">NGN2,000</p>
														</div>
													}
													name="deliveryCompany"
													id="gig"
													value="gig"
													onChange={handleChange}
												/>
												<CustomRadio
													title={
														<div className="w-100 d-flex justify-content-between">
															<p className="m-0">ABC Logistics</p>
															<p className="m-0">3 Days</p>
															<p className="m-0">NGN2,000</p>
														</div>
													}
													name="deliveryCompany"
													id="abc"
													value="abc"
													onChange={handleChange}
												/>
												<CustomRadio
													title={
														<div className="w-100 d-flex justify-content-between">
															<p className="m-0">EFG Logistics</p>
															<p className="m-0">3 Days</p>
															<p className="m-0">NGN2,000</p>
														</div>
													}
													name="deliveryCompany"
													id="efg"
													value="efg"
													onChange={handleChange}
												/>
												<ErrorMessage
													component="div"
													className="text-danger"
													name="deliveryCompany"
												/>
											</div>

											<div>
												<h4
													className={styles.sectionHeader}
													style={{ marginTop: 25 }}
												>
													Delivery Address
												</h4>
												<CustomInput
													title="Address"
													onChange={handleChange}
													name="address"
													value={values.address}
												/>
												<CustomInput
													title="City"
													onChange={handleChange}
													name="city"
													value={values.city}
												/>
												<CustomInput
													title="State"
													onChange={handleChange}
													name="state"
													value={values.state}
												/>
												<CustomInput
													title="Zip Code"
													onChange={handleChange}
													name="zip-code"
													value={values["zip-code"]}
												/>
											</div>

											<button type="submit" className={styles.submit}>
												Next: Payment
											</button>
										</form>
									)}
								</Formik>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem
							uuid="b"
							dangerouslySetExpanded={currentStep === "b"}
						>
							<AccordionItemHeading>
								<AccordionItemButton>2. Payment</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<Formik
									initialValues={paymentMethodInitialValues}
									validationSchema={paymentMethodValidationSchema}
									onSubmit={() => {
										setCurrentStep("c");
									}}
								>
									{({ values, handleSubmit, handleChange }) => (
										<form onSubmit={handleSubmit}>
											<h4 className={styles.sectionHeader}>Payment Method</h4>
											<CustomRadio
												title="Pay with Seerbit"
												name="paymentMethod"
												id="seerbit"
												value="seerbit"
												onChange={handleChange}
											/>
											<ErrorMessage
												component="div"
												className="text-danger"
												name="paymentMethod"
											/>
											<button type="submit" className={styles.submit}>
												Next: Confirmation
											</button>
										</form>
									)}
								</Formik>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem
							uuid="c"
							dangerouslySetExpanded={currentStep === "c"}
						>
							<AccordionItemHeading>
								<AccordionItemButton>3. Confirmation</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<div
									className={`d-flex justify-content-between align-items-center ${styles.bb} pb-4 mb-5`}
								>
									<h4 className={styles.sectionHeader}>Purchase Summary</h4>
									<Link className={`${styles.link}`} to="/cart">
										Edit
									</Link>
								</div>
								<div className={`${styles.bb} pb-4`}>
									{Array(3)
										.fill(" ")
										.map(() => (
											<ProductInfo />
										))}
								</div>
								<div className={styles.feesContainer}>
									<div className={styles.feesDescription}>
										<p>Shipping</p>
										<p>
											{new Intl.NumberFormat("en-US", {
												style: "currency",
												currency: "USD",
											}).format(12)}
										</p>
									</div>
									<div className={styles.feesDescription}>
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

								<div
									className={`d-flex justify-content-between align-items-center ${styles.bb} pt-5 pb-4 mb-5`}
								>
									<h4 className={styles.sectionHeader}>Delivery Address</h4>
									<button
										className={`${styles.link}`}
										onClick={() => {
											setCurrentStep("a");
										}}
									>
										Edit
									</button>
								</div>

								<div className="mb-4">
									<p className={`${styles.deliveryBody} ${styles.bb}`}>
										123 East North Street, South Bend, West Coast,
										<br />
										Main City,
										<br /> Central
										<br />
										<strong>State Phone: (+123-8293-8922-0)</strong>
									</p>
								</div>

								<PaymentCard />

								<button type="submit" className={styles.submit}>
									Confirm and Pay
								</button>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
				{currentStep !== "c" && (
					<div className="col-lg-6">
						<div
							className={`d-flex justify-content-between align-items-center ${styles.bb} pb-4 mb-5`}
						>
							<h4 className={styles.sectionHeader}>Purchase Summary</h4>
							<Link className={`${styles.link}`} to="/cart">
								Edit
							</Link>
						</div>
						<div className={`${styles.bb} pb-4`}>
							{Array(3)
								.fill(" ")
								.map(() => (
									<ProductInfo />
								))}
						</div>
						<div className={styles.feesContainer}>
							<div className={styles.feesDescription}>
								<p>Shipping</p>
								<p>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(12)}
								</p>
							</div>
							<div className={styles.feesDescription}>
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
					</div>
				)}
			</div>
		</div>
	);
};

export default Payment;
