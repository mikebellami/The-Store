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
import { useCartContext } from "../../context/cartContext";
import { getStorePickupAddress, preCheckout } from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";

const Payment = () => {
	const { state, price } = useCartContext();
	const [currentStep, setCurrentStep] = useState("c");
	const [deliveryMethod, setDeliveryMethod] = useState("");
	const [preCheckoutResponse, setPreCheckoutResponse] = useState(null);
	const [deliveryFee, setDeliveryFee] = useState(0);

	const { isLoading, mutate } = useMutation(preCheckout, {
		onSuccess: (data) => {
			console.log(data);
			setPreCheckoutResponse(data);
			setCurrentStep("b");
		},
	});

	const { data } = useQuery({
		queryKey: ["pickupAddress"],
		queryFn: getStorePickupAddress,
		enabled: !!deliveryMethod && deliveryMethod === "Pickup",
		onSuccess: (data) => console.log(data),
	});

	const deliveryInformationInitialValues = {
		name: "",
		email: "",
		phone: "",
		delivery_type: "",
		// deliveryCompany: "",
		street: "",
		city: "",
		state: "",
		postal_code: "",
		cart: state.cart.map(({ product, quantity }) => ({
			productID: product.id,
			quantity,
		})),
	};
	const deliveryInformationValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Please provide a valid email")
			.required("Please provide an email"),
		name: Yup.string().required("Please provide a name"),
		phone: Yup.string()
			.length(11, "Please provide a valid phone number")
			.required("Please provide a phone number"),
		delivery_type: Yup.string()
			.required("Please provide a delivery method")
			.oneOf(["Pickup", "Delivery"]),
		// deliveryCompany: Yup.string().required("Please provide a delivery comapny"),
		street: Yup.string().when("delivery_type", {
			is: "Delivery",
			then: Yup.string().required("Please provide your delivery street"),
		}),
		city: Yup.string().when("delivery_type", {
			is: "Delivery",
			then: Yup.string().required("Please provide your city"),
		}),
		state: Yup.string().when("delivery_type", {
			is: "Delivery",
			then: Yup.string().required("Please provide your state"),
		}),
		postal_code: Yup.string().when("delivery_type", {
			is: "Delivery",
			then: Yup.string().required("Please provide your postal_code"),
		}),
	});

	const deliveryTypeInitialValues = {
		courier: "",
	};
	const deliveryTypeValidationSchema = Yup.object().shape({
		courier: Yup.string().required("Please select a courier for your delivery"),
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
									onSubmit={(values) => {
										const data = { ...values };
										if (data.delivery_type === "Pickup") {
											const { street, city, state, postal_code, ...data } =
												values;
											setDeliveryMethod("Pickup");
											return mutate(JSON.stringify(data));
										}
										setDeliveryMethod("Delivery");
										mutate(JSON.stringify(data));
									}}
								>
									{({ values, handleSubmit, handleChange }) => (
										<form onSubmit={handleSubmit}>
											<div>
												<h4 className={styles.sectionHeader}>Contact</h4>
												<CustomInput
													title="Full Name"
													onChange={handleChange}
													name="name"
													value={values.name}
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

											<h4
												className={styles.sectionHeader}
												style={{ marginTop: 25 }}
											>
												Delivery Method
											</h4>
											<div className="d-flex" style={{ gap: 20 }}>
												<CustomRadio
													title="Home Delivery"
													name="delivery_type"
													id="Delivery"
													value="Delivery"
													onChange={handleChange}
												/>
												<CustomRadio
													title="Store Pickup"
													name="delivery_type"
													id="Pickup"
													value="Pickup"
													onChange={handleChange}
												/>
											</div>
											<ErrorMessage
												component="div"
												className="text-danger"
												name="delivery_type"
											/>

											{values.delivery_type &&
												values.delivery_type === "Delivery" && (
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
															name="street"
															value={values.street}
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
															name="postal_code"
															value={values["postal_code"]}
														/>
													</div>
												)}

											<button
												type="submit"
												className={styles.submit}
												disabled={isLoading}
											>
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
								<AccordionItemButton>
									2. Pickup Address / Delivery Company
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<Formik
									initialValues={deliveryTypeInitialValues}
									validationSchema={deliveryTypeValidationSchema}
									onSubmit={() => {
										setCurrentStep("c");
									}}
								>
									{({ handleSubmit, handleChange }) => (
										<form onSubmit={handleSubmit}>
											<div>
												<h4 className={styles.sectionHeader}>
													Select Delivery Company
												</h4>

												{preCheckoutResponse?.shipmentRates?.ratesDetails?.couriers?.map(
													(courier, index) => (
														<CustomRadio
															key={index}
															title={
																<div className="w-100">
																	<p className="m-0">{courier.courier_name}</p>
																	<p className="m-0">{courier.delivery_eta}</p>
																	<p className="m-0">
																		{new Intl.NumberFormat("en-GB", {
																			style: "currency",
																			currency: courier.currency,
																		}).format(parseInt(courier.total))}
																	</p>
																</div>
															}
															name="courier"
															id={courier.courier_id}
															value={courier.courier_id}
															onChange={(event) => {
																handleChange(event);
																setDeliveryFee(courier.total);
															}}
														/>
													)
												)}
												<ErrorMessage
													component="div"
													className="text-danger"
													name="courier"
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
							uuid="c"
							dangerouslySetExpanded={currentStep === "c"}
						>
							<AccordionItemHeading>
								<AccordionItemButton>3. Payment</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<Formik
									initialValues={paymentMethodInitialValues}
									validationSchema={paymentMethodValidationSchema}
									onSubmit={() => {
										setCurrentStep("d");
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
							uuid="d"
							dangerouslySetExpanded={currentStep === "d"}
						>
							<AccordionItemHeading>
								<AccordionItemButton>4. Confirmation</AccordionItemButton>
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
									{state?.cart?.map((item, index) => (
										<ProductInfo item={item} key={index} />
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
				{currentStep !== "d" && (
					<div className="col-lg-6 mt-5 mt-sm-5 mt-lg-0">
						<div
							className={`d-flex justify-content-between align-items-center ${styles.bb} pb-4 mb-5`}
						>
							<h4 className={styles.sectionHeader}>Purchase Summary</h4>
							<Link className={`${styles.link}`} to="/cart">
								Edit
							</Link>
						</div>
						<div className={`${styles.bb} ${styles.products} pb-4`}>
							{state?.cart?.map((item, index) => (
								<ProductInfo item={item} key={index} />
							))}
						</div>
						<div className={styles.feesContainer}>
							<div className={styles.feesDescription}>
								<p>Cart Price</p>
								<p>
									{new Intl.NumberFormat("en-GB", {
										style: "currency",
										currency: "NGN",
									}).format(price)}
								</p>
							</div>
							{!!preCheckoutResponse?.cart?.pepperestfees && (
								<div className={styles.feesDescription}>
									<p>Pepperest Fees</p>
									<p>
										{new Intl.NumberFormat("en-GB", {
											style: "currency",
											currency: "NGN",
										}).format(
											parseFloat(preCheckoutResponse?.cart?.pepperestfees)
										)}
									</p>
								</div>
							)}
							{!!deliveryFee && (
								<div className={styles.feesDescription}>
									<p>Shipping</p>
									<p>
										{new Intl.NumberFormat("en-GB", {
											style: "currency",
											currency: "NGN",
										}).format(parseFloat(deliveryFee))}
									</p>
								</div>
							)}

							<div className={styles.feesDescription}>
								<p>Subtotal</p>
								<p>
									<strong>
										{new Intl.NumberFormat("en-GB", {
											style: "currency",
											currency: "NGN",
										}).format(
											price +
												parseFloat(
													preCheckoutResponse?.cart?.pepperestfees || 0
												) +
												parseFloat(deliveryFee || 0)
										)}
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
