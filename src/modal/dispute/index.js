import React from "react";
import styles from "./dispute.module.css";
import { Avatar } from "../../assets";
import { AiOutlineCheck } from "react-icons/ai";

const Dispute = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.avatarWrapper}>
					<div className={styles.avatarContainer}>
						<img src={Avatar} />
					</div>
					<div>
						<div className={styles.avatarName}>Jane Lynn</div>
						<div className={styles.avatarEmail}>johndoe@gmail.com</div>
					</div>
				</div>
				<div className={styles.date}>Jan 6, 2022</div>
				<div className={styles.Paymentstatus}>
					<AiOutlineCheck />
					paid
				</div>
				<div className={styles.price}>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(1215)}
				</div>
			</div>
            {/* <div className={}>

            </div> */}
		</>
	);
};

export default Dispute;
