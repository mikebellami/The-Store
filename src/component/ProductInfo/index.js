import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../assets";
import styles from "./productinfo.module.css";

const ProductInfo = () => {
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
				<div className="d-flex justify-content-between align-items-end">
					<div>
						<p className={styles.quantity}>Qty</p>
						<p className={styles.quantityNumber}>x 2</p>
					</div>
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

export default ProductInfo;
