import { ErrorMessage } from "formik";
import React from "react";
import styles from "./custominput.module.css";

const CustomInput = ({ title, name, ...rest }) => {
	return (
		<div className={styles.inputWrapper}>
			<label className={styles.title} htmlFor={rest?.id ?? name}>
				{title}
			</label>
			<input
				type="text"
				name={name}
				id={name}
				placeholder={title}
				className={styles.textInput}
				{...rest}
			/>
			<ErrorMessage component="div" className="text-danger" name={name} />
		</div>
	);
};

export const CustomRadio = ({ title, name, ...rest }) => {
	return (
		<div className={styles.checkboxWrapper} style={{ display: "flex" }}>
			<input type="radio" name={name} id={name} {...rest} />
			<label className={styles.label} htmlFor={rest?.id ?? name}>
				{title}
			</label>
		</div>
	);
};

export default CustomInput;
