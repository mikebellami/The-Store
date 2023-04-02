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
	// PaymentCard,
} from "../../component";
import styles from "./payment.module.css";
import * as Yup from "yup";
import "yup-phone-lite";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { getStorePickupAddress, placeOrder, preCheckout } from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFromStorage, setToStorage } from "../../constants";

const Payment = () => {
	const { state, price } = useCartContext();
	const [currentStep, setCurrentStep] = useState("a");
	const [deliveryMethod, setDeliveryMethod] = useState("");
	const [preCheckoutResponse, setPreCheckoutResponse] = useState(null);
	const [placeOrderResponse, setPlaceOrderResponse] = useState(null);
	const [selectedCourier, setSelectedCourier] = useState(null);

	const { isLoading: preCheckOutLoading, mutate: preCheckOutFN } = useMutation(
		preCheckout,
		{
			onSuccess: (data) => {
				setPreCheckoutResponse(data);
				setToStorage("token", data?.token?.access_token);
				setCurrentStep("b");
			},
		}
	);

	const { isLoading: placeOrderLoading, mutate: placeOrderFN } = useMutation(
		placeOrder,
		{
			onSuccess: (data) => {
				setToStorage("merchantID", data?.order?.merchant_id);
				setPlaceOrderResponse(data);
				setCurrentStep("c");
			},
		}
	);

	const { data: pickupAddess } = useQuery({
		queryKey: ["pickupAddress"],
		queryFn: () =>
			getStorePickupAddress({
				merchantID: getFromStorage("merchantID"),
				token: preCheckoutResponse?.token?.access_token,
			}),
		enabled:
			!!deliveryMethod && deliveryMethod === "Pickup" && !!preCheckoutResponse,
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
			.length(11, "Please provide a valid nigerian phone number")
			.phone("NG", `Please provide a valid nigerian phone number`)
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
											return preCheckOutFN(JSON.stringify(data));
										}
										setDeliveryMethod("Delivery");
										preCheckOutFN(JSON.stringify(data));
									}}
								>
									{({ values, handleSubmit, handleChange, setFieldValue }) => (
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
													onChange={(event) =>
														setFieldValue(
															"phone",
															event.target.value.replace(/\D/g, "")
														)
													}
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
												disabled={preCheckOutLoading}
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
								{deliveryMethod === "Pickup" ? (
									<Formik
										onSubmit={() => {
											const data = {
												customerID: preCheckoutResponse?.cart?.customerID,
												cart_id: preCheckoutResponse?.cart?.cart_id,
												currency_id: 1,
												paymentProvider: "seerbit",
												charge_currency: "NGN",
											};

											const token = preCheckoutResponse?.token?.access_token;
											setToStorage("token", token);
											setToStorage(
												"info",
												JSON.stringify({
													pepperestfees:
														preCheckoutResponse?.cart?.pepperestfees,
													courierprice: selectedCourier?.total,
													address: preCheckoutResponse?.address,
												})
											);

											placeOrderFN({ data, token });
										}}
									>
										{({ handleSubmit }) => (
											<form onSubmit={handleSubmit}>
												<div>
													<h4 className={styles.sectionHeader}>
														Pickup Address
													</h4>
												</div>
												<div className={styles.pickup}>
													<p>{pickupAddess?.pickup_address?.name}</p>
													<p>{pickupAddess?.pickup_address?.phone}</p>
													<p>{pickupAddess?.pickup_address?.email}</p>
													<p>{pickupAddess?.pickup_address?.address}</p>
												</div>
												<button
													type="submit"
													className={styles.submit}
													disabled={placeOrderLoading}
												>
													Next: Confirmation
												</button>
											</form>
										)}
									</Formik>
								) : (
									<Formik
										initialValues={deliveryTypeInitialValues}
										validationSchema={deliveryTypeValidationSchema}
										onSubmit={(values) => {
											const data = {
												customerID: preCheckoutResponse?.cart?.customerID,
												cart_id: preCheckoutResponse?.cart?.cart_id,
												currency_id: 1,
												address_id: preCheckoutResponse?.address?.address_id,
												paymentProvider: "seerbit",
												courier_id: values.courier,
												request_token:
													preCheckoutResponse?.shipmentRates?.ratesDetails
														?.request_token,
												estimated_days: selectedCourier?.delivery_eta,
												charge_amount: parseFloat(selectedCourier?.total || 0),
												service_code: selectedCourier?.service_code,
												charge_currency: "NGN",
											};

											const token = preCheckoutResponse?.token?.access_token;
											setToStorage("token", token);
											setToStorage(
												"info",
												JSON.stringify({
													pepperestfees:
														preCheckoutResponse?.cart?.pepperestfees,
													courierprice: selectedCourier?.total,
													address: preCheckoutResponse?.address,
												})
											);

											placeOrderFN({ data, token });
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
																		<p className="m-0">
																			{courier.courier_name}
																		</p>
																		<p className="m-0">
																			{courier.delivery_eta}
																		</p>
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
																	setSelectedCourier(courier);
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
												<button
													type="submit"
													className={styles.submit}
													disabled={placeOrderLoading}
												>
													Next: Confirmation
												</button>
											</form>
										)}
									</Formik>
								)}
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
									{!!selectedCourier && (
										<div className={styles.feesDescription}>
											<p>Shipping</p>
											<p>
												{new Intl.NumberFormat("en-GB", {
													style: "currency",
													currency: "NGN",
												}).format(parseFloat(selectedCourier?.total))}
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
														parseFloat(selectedCourier?.total || 0)
												)}
											</strong>
										</p>
									</div>
								</div>

								{!deliveryMethod === "Pickup" && (
									<>
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
												{preCheckoutResponse?.address?.address},<br />
												{preCheckoutResponse?.address?.city},<br />
												{preCheckoutResponse?.address?.country},<br />
												<strong>
													Phone: ({preCheckoutResponse?.address?.phone})
												</strong>
											</p>
										</div>
									</>
								)}

								<Link
									to={placeOrderResponse?.paymentUrl || "/"}
									className={styles.submit}
								>
									Confirm and Pay
								</Link>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
				{currentStep !== "c" && (
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
							{!!selectedCourier && (
								<div className={styles.feesDescription}>
									<p>Shipping</p>
									<p>
										{new Intl.NumberFormat("en-GB", {
											style: "currency",
											currency: "NGN",
										}).format(parseFloat(selectedCourier?.total))}
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
												parseFloat(selectedCourier?.total || 0)
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
