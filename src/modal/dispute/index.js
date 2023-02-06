import React from "react";
import styles from "./dispute.module.css";
import { Avatar } from "../../assets";
import { AiOutlineCheck } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import * as Yup from "yup";
import { Formik } from "formik";
import { CustomSelect, CustomTextArea } from "../../component";
const Dispute = () => {
	const disputeFormValidation = {};
	const disputeFormValidationSchema = Yup.object().shape({});
	return (
		<>
			<div className={styles.container}>
				<div className={styles.avatarWrapper}>
					<div className={styles.avatarContainer}>
						<img src={Avatar} />
					</div>
					<div>
						<div className={styles.avatarName}>Jane Lynn</div>
						<div className={styles.avatarEmail}>johndoe@gmail.com</div>
					</div>
				</div>
				<div className={styles.dateWrapper}>
					<div className={styles.date}>Jan 6, 2022</div>
					<div className={styles.Paymentstatus}>
						<AiOutlineCheck />
						paid
					</div>
				</div>
				<div className={styles.price}>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(1215)}
				</div>
			</div>
			<div className={styles.formContainer}>
				<Formik
					initialValues={disputeFormValidation}
					validationSchema={disputeFormValidationSchema}
				>
					{({ values, handleSubmit, handleChange }) => (
						<form onSubmit={handleSubmit}>
							<div className="mt-4">
								<CustomSelect
									title="Dispute Type"
									name="disputeType"
									value={values.disputeType}
									onChange={handleChange}
									options={[
										{
											value: "1",
											label: "Product has been misplaced",
										},
										{
											value: "2",
											label: "Product has been misplaced",
										},
										{
											value: "3",
											label: "Product has been misplaced",
										},
									]}
								/>
							</div>

							<div className="mt-4">
								<CustomTextArea
									title="Give a more detailed reason"
									name="disputeReason"
									value={values.disputeReason}
									onChange={handleChange}
								/>
							</div>

							<div className={styles.refundWrapper}>
								<span>
									<RiErrorWarningLine className={styles.refundIcon} />
								</span>
								<p>
									Seller will be notified if there’s an issue with your order
									and may get a refund. Review our{" "}
									<span>
										<a href="#" className={styles.refundLink}>
											Return Policy
										</a>
									</span>
								</p>
							</div>
							<div className={styles.bb}></div>
							<div className={styles.disputeBtnWrapper}>
								<button className={styles.disputeBtn}>Submit Dispute</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default Dispute;
