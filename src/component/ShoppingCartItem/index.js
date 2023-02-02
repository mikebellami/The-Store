import React from "react";
import { Product } from "../../assets";
import styles from "./shoppingcartitem.module.css";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import QuantityInput from "../QuantityInput";

const ShoppingCartItem = () => {
	return (
		<div className="row mb-5">
			<div className="col-3">
				<img src={Product} alt="product" className={styles.productImage} />
			</div>
			<div className="col-9 d-flex flex-column justify-content-between">
				<div className="d-flex justify-content-between">
					<Link to={"/product/sadsa"} className={styles.productName}>
						Bleu Perfume
					</Link>
					<MdOutlineClose className="pointy-cursor" size={22} />
				</div>
				<div className="d-flex justify-content-between align-items-end">
					<QuantityInput />
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

export default ShoppingCartItem;
