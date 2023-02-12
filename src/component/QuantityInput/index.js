import React from "react";
import styles from "./quantityinput.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const QuantityInput = ({ quantity, setQuantity, quantityLeft }) => {
	return (
		<div className={styles.quantityWrapper}>
			<button
				className={`${styles.quantityBtn} ${styles.left}`}
				onClick={() => {
					var value = quantity - 1;
					if (value < 1) value = 1;
					setQuantity(value);
				}}
			>
				<BiMinus size={10} />
			</button>
			<input
				type="number"
				className={styles.quantityInput}
				value={quantity}
				min={0}
				max={quantityLeft}
				onChange={(e) => {
					var value = e.target.valueAsNumber;
					if (value < 1) value = 1;
					if (value > quantityLeft) value = quantityLeft;
					setQuantity(value);
				}}
			/>
			<button
				className={`${styles.quantityBtn} ${styles.right}`}
				onClick={() => {
					var value = quantity + 1;
					if (value > quantityLeft) value = quantity;
					setQuantity(value);
				}}
			>
				<BiPlus size={10} />
			</button>
		</div>
	);
};

export default QuantityInput;
