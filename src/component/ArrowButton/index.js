import React from "react";
import styles from "./ArrowButton.module.css";

const ArrowButton = ({ icon, text, right, className, ...rest }) => {
	return (
		<button
			className={`${styles.button} ${right && styles.right} ${
				className && className
			}`}
			{...rest}
		>
			{icon} {text}
		</button>
	);
};

export default ArrowButton;
