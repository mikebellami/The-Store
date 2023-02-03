/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { ReactComponent as ProfileIcon } from "../../assets/img/profile.svg";
import { ReactComponent as ShoppingBagIcon } from "../../assets/img/svg/shopping-bag.svg";
import { ReactComponent as FacebookIcon } from "../../assets/img/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/img/instagram.svg";
import { ReactComponent as WhatsAppIcon } from "../../assets/img/whatsapp.svg";

const Footer = () => {
	const [isLogin] = useState(false);
	return (
		<div className="container">
			{isLogin === false ? (
				<div className={`${styles.footer2} mb-2 mt-5`}>
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
	);
};

export default Footer;
