import React, { useState } from "react";
import styles from "./Account.module.css";
import { Card, Modal } from "../../component";
import { Product2 } from "../../assets";
import { Dispute } from "../../modal";

const Account = () => {
	const [modalOpen, setModalOpen] = useState(true);
	return (
		<>
			<div className="container">
				<div className={styles.accountContainer}>
					<h1>My Account</h1>
					<div className={styles.hr}></div>

					<div className={styles.navLink}>
						<div className={styles.active}> My Orders</div>
						<div> Profile</div>
					</div>

					<div className="row mt-5">
						{Array(12)
							.fill("")
							.map((_, index) => (
								<div className="col-12 ">
									<Card productImg={Product2} />
								</div>
							))}
					</div>
				</div>
			</div>

			<Modal
				isOpen={modalOpen}
				setIsOpen={setModalOpen}
				title="Order #3066"
				size="l"
			>
				<Dispute />
			</Modal>
		</>
	);
};

export default Account;
