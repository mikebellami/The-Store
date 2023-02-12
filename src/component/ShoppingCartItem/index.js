import React from "react";
import styles from "./shoppingcartitem.module.css";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import QuantityInput from "../QuantityInput";
import { useCartContext } from "../../context/cartContext";

const ShoppingCartItem = ({ item: { product, quantity } }) => {
	const { dispatch } = useCartContext();

	const setQuantity = (quantity) =>
		dispatch({
			type: "CHANGE-QUANTITY",
			payload: {
				id: product.id,
				quantity,
			},
		});

	return (
		<div className="row mb-5">
			<div className="col-3">
				<img
					src={product.image_url}
					alt="product"
					className={styles.productImage}
				/>
			</div>
			<div className="col-9 d-flex flex-column justify-content-between">
				<div className="d-flex justify-content-between">
					<Link to={`/product/${product.id}`} className={styles.productName}>
						{product.productName}
					</Link>
					<button
						className={styles.btn}
						onClick={() =>
							dispatch({
								type: "REMOVE",
								payload: product.id,
							})
						}
					>
						<MdOutlineClose className="pointy-cursor" size={22} />
					</button>
				</div>
				<div className="d-flex justify-content-between align-items-end">
					<QuantityInput
						quantity={quantity}
						setQuantity={setQuantity}
						quantityLeft={product.quantity}
					/>
					<p className={styles.productPrice}>
						{new Intl.NumberFormat("en-GB", {
							style: "currency",
							currency: product?.currency || "NGN",
						}).format(parseInt(product.amount))}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartItem;
