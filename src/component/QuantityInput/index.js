import React from "react";
import styles from "./quantityinput.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const QuantityInput = () => {
	return (
		<div className={styles.quantityWrapper}>
			<button className={`${styles.quantityBtn} ${styles.left}`}>
				<BiMinus size={10} />
			</button>
			<input type="text" className={styles.quantityInput} value={10} />
			<button className={`${styles.quantityBtn} ${styles.right}`}>
				<BiPlus size={10} />
			</button>
		</div>
	);
};

export default QuantityInput;
