import React from "react";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
	const location = useLocation();

	if (location.pathname === "/") return;

	return (
		<div
			className={`d-flex justify-content-between align-items-center ${styles.bb}`}
		>
			<div className={styles.headerLogo}>BJ</div>
			<h2 className={styles.storeName}>Bambam's Perfume Store</h2>
			<FiSearch size={22} />
		</div>
	);
};

export default Header;
