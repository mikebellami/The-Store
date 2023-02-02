import { Formik } from "formik";
import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { CustomRadio, CustomInput } from "../../component";
import styles from "./payment.module.css";
import * as Yup from "yup";

const Payment = () => {
	const initialValues = {
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

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Please provide a valid email")
			.required("Please provide an email"),
		fullname: Yup.string().required("Please provide a fullname"),
		phone: Yup.string()
			.length(11, "Please provide a valid phone number")
			.required("Please provide a phone number"),
	});

	return (
		<div className="row">
			<div className="col-6 d-flex justify-content-center">
				<Accordion allowZeroExpanded>
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton>1. Delivery Information</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={() => {}}
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
												name="fullname"
												value={values.fullname}
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
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton>2. Payment</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<p>
								In ad velit in ex nostrud dolore cupidatat consectetur ea in ut
								nostrud velit in irure cillum tempor laboris sed adipisicing eu
								esse duis nulla non.
							</p>
						</AccordionItemPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionItemHeading>
							<AccordionItemButton>3. Confirmation</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<p>
								In ad velit in ex nostrud dolore cupidatat consectetur ea in ut
								nostrud velit in irure cillum tempor laboris sed adipisicing eu
								esse duis nulla non.
							</p>
						</AccordionItemPanel>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="col-6"></div>
		</div>
	);
};

export default Payment;
