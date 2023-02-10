import React from "react";
import { Link } from "react-router-dom";
import { CartSVG } from "../../assets";
import { useCartContext } from "../../context/cartContext";
import "./productCard.css";

const ProductCard = ({ product }) => {
	const { dispatch } = useCartContext();
	return (
		<div className="product-card">
			<div
				className="product-card-header"
				style={{ backgroundImage: `url(${product?.image_url})` }}
			>
				{!!product?.quantity && (
					<button
						className="add-cart"
						onClick={() =>
							dispatch({ type: "ADD", payload: { product, quantity: 1 } })
						}
					>
						Add to Cart <CartSVG className="cart-icon" />
					</button>
				)}
			</div>
			<Link to={`/product/${product?.id}`} className="product-card-link">
				<div className="product-card-body">
					<p className="product-name">{product?.productName}</p>
					<p className="product-price">
						{new Intl.NumberFormat("en-GB", {
							style: "currency",
							currency: product?.currency || "NGN",
						}).format(parseFloat(product?.amount))}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
