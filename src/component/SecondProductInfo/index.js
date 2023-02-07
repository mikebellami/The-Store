import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../assets";
import styles from "./secondproductinfo.module.css";

const SecondProductInfo = () => {
	return (
		<div className="row mb-5">
			<div className="col-3">
				<img src={Product} alt="product" className={styles.productImage} />
			</div>
			<div className="col-9 d-flex flex-column justify-content-between py-2">
				<div className="d-flex justify-content-between">
					<Link to={"/product/sadsa"} className={styles.productName}>
						Bleu Perfume
					</Link>
				</div>
				<div className="d-flex justify-content-between align-items-center ">
					<div>
						<p className={styles.description}>
							Lorem ipsum is dummy text used for dummy purposes
						</p>
					</div>
					<p className={styles.quantity}>x2</p>
				</div>
				<div className="d-flex justify-content-between align-items-end">
					<p className={styles.productPrice}>
						{new Intl.NumberFormat("en-GB", {
							style: "currency",
							currency: "NGN",
						}).format(8500)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SecondProductInfo;
