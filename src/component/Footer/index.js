/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	CartSVG,
	FacebookIcon,
	InstagramIcon,
	ProfileIcon,
	WhatsAppIcon,
} from "../../assets";
import styles from "./footer.module.css";

const Footer = () => {
	const [isLogin] = useState(false);
	return (
		<div className="container mt-auto">
			<div className={styles.footerContainer}>
				{isLogin === false ? (
					<div className={`${styles.footer2} mb-2`}>
						<ul className={styles.navLinks}>
							<li className={styles.navlink} style={{ color: "#495057" }}>
								<a href="#" className={styles.link}>
									About
								</a>
							</li>
							<li className={styles.navlink} style={{ color: "#495057" }}>
								<a href="#" className={styles.link}>
									Contact
								</a>
							</li>
						</ul>
						<div className={styles.socialIcons}>
							<FacebookIcon />
							<InstagramIcon />
							<WhatsAppIcon />
						</div>
					</div>
				) : (
					<div
						className={`${styles.bt} d-flex justify-content-center align-items-center`}
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
									<CartSVG />
									<p>Shopping Bag</p>
								</Link>
							</li>
						</ul>
					</div>
				)}
				<div className={styles.bt}>
					<div className={styles.footer}>
						<p className={styles.copyright}>Copyright © 2023 Peppa.io </p>
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
			</div>
		</div>
	);
};

export default Footer;
