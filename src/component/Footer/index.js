import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
	return (
		<div className="mt-auto">
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
