import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { ReactComponent as ProfileIcon } from "../../assets/img/profile.svg";
import { ReactComponent as ShoppingBagIcon } from "../../assets/img/svg/shopping-bag.svg";

const Footer = () => {
	return (
		<div className="mt-auto">
			<div
				className={`${styles.bt} d-flex justify-content-center align-items-center mt-5`}
			>
				<ul className={styles.navLinks}>
					<li className={styles.navlink}>
						<Link to="#" className={styles.link}>
							<ProfileIcon />
							<p>My Account</p>
						</Link>
					</li>
					<li className={styles.navlink}>
						<Link to="/cart" className={styles.link}>
							<ShoppingBagIcon />
							<p>Shopping Bag</p>
						</Link>
					</li>
				</ul>
			</div>
			<div
				className={`${styles.bt} d-flex justify-content-between align-items-center`}
			>
				<p className={styles.copyright}>Copyright © 2023 Peppa.io</p>
				<ul className={styles.navLinks}>
					<li className={styles.navlink}>
						<a href="#" className={styles.link}>
							Privacy Policy
						</a>
					</li>
					<li className={styles.navlink}>
						<a href="#" className={styles.link}>
							Terms of Service
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
