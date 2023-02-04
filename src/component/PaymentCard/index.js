import React from "react";
import { Checked, VisaIcon } from "../../assets";
import styles from "./paymentcard.module.css";

const PaymentCard = () => {
	return (
		<div className={styles.wrapper}>
			<VisaIcon className={styles.cardType} />
			<div className={styles.cardDetails}>
				<p>Visa ending in 1234</p>
				<p>Expiry 06/2024</p>
			</div>
			<Checked className={styles.checked} />
		</div>
	);
};

export default PaymentCard;
