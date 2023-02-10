import React from "react";
import styles from "./quantityinput.module.css";
import { BiMinus, BiPlus } from "react-icons/bi";

const QuantityInput = ({ quantity, setQuantity, quantityLeft }) => {
	return (
		<div className={styles.quantityWrapper}>
			<button
				className={`${styles.quantityBtn} ${styles.left}`}
				onClick={() =>
					setQuantity((prevState) => {
						const value = prevState - 1;
						if (value < 1) return 1;
						return value;
					})
				}
			>
				<BiMinus size={10} />
			</button>
			<input
				type="number"
				className={styles.quantityInput}
				value={quantity}
				min={0}
				max={quantityLeft}
				onChange={(e) => setQuantity(e.target.valueAsNumber)}
			/>
			<button
				className={`${styles.quantityBtn} ${styles.right}`}
				onClick={() =>
					setQuantity((prevState) => {
						const value = prevState + 1;
						if (value > quantityLeft) return prevState;
						return value;
					})
				}
			>
				<BiPlus size={10} />
			</button>
		</div>
	);
};

export default QuantityInput;
