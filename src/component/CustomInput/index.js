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

export const CustomSelect = ({ title, name, options, ...rest }) => {
	return (
		<div className={styles.selectWrapper}>
			<label className={styles.title} htmlFor={name}>
				{title}
			</label>
			<select className={styles.select} name={name} {...rest}>
				<option value="" label="Select" selected disabled />
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export const CustomTextArea =  ({title, name, ...rest}) => {
	return (
		<div className={styles.textAreaWrapper}>
			<label className={styles.title} htmlFor={name}>
				{title}
			</label>
			<textarea className={styles.textArea} name={name} {...rest} />
		</div>
	)
}

export default CustomInput;
