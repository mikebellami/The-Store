import React from "react";
import { CartSVG } from "../../assets";
import "./productCard.css"
const ProductCard = ({image}) => {
	return (
		<>
			<div className="product-card">
				<div
					className="product-card-header"
					style={{ backgroundImage: `url(${image})` }}
				>
					<div className="add-cart">
						Add to Cart <CartSVG className="cart-icon" />
					</div>

					<div></div>
				</div>
				<div className="product-card-body">
					<p className="product-name">Bleu Perfume</p>
					<p className="product-price">NGN8,500</p>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
