import React, { useMemo, useState } from "react";
import {
	// ArrowButton,
	QuantityInput,
} from "../../component";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./Product.module.css";
import Slider from "react-slick";
import product from "../../assets/img/product.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../../assets";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useCartContext } from "../../context/cartContext";

const Product = () => {
	const { id } = useParams();
	const { dispatch } = useCartContext();

	const [quantity, setQuantity] = useState(1);

	const settings = useMemo(
		() => ({
			customPaging: function (i) {
				return (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a href="#">
						<img src={product} alt="prodict-preview" />
					</a>
				);
			},
			dots: true,
			dotsClass: `${styles.slickDots}`,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		}),
		[]
	);

	const { data: productDetails } = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProductDetails(id),
	});

	return (
		<div className="container">
			<div className={styles.page}>
				{/* <div className="d-flex justify-content-between mb-3">
					<ArrowButton
						icon={<SlArrowLeft size={15} />}
						text="Back to catalog"
					/>
					<div className="d-flex">
						<ArrowButton
							icon={<SlArrowLeft size={15} />}
							text="Prev"
							className="mr-3"
						/>
						<ArrowButton icon={<SlArrowRight size={15} />} text="Next" right />
					</div>
				</div> */}
				<div className="row mt-5 col-12">
					<div className="col-md-6">
						<Slider {...settings}>
							<div className={styles.productImageWrapper}>
								<img
									className={styles.productImage}
									src={productDetails?.product?.image_url}
									alt="product"
								/>
							</div>
						</Slider>
					</div>
					<div className="col-md-6  d-flex flex-column">
						<h2 className={styles.productName}>
							{productDetails?.product?.productName}
						</h2>
						<h3 className={styles.productPrice}>
							{new Intl.NumberFormat("en-GB", {
								style: "currency",
								currency: productDetails?.product?.currency || "NGN",
							}).format(productDetails?.product?.amount)}
						</h3>
						<p className={styles.productQuantityLeft}>
							Quantity left: {productDetails?.product?.quantity}
						</p>
						{!!productDetails?.product?.quantity && (
							<>
								<p className={styles.productQuantity}>Quantity</p>
								<QuantityInput
									quantity={quantity}
									setQuantity={setQuantity}
									quantityLeft={productDetails?.product?.quantity}
								/>
								<button
									className={styles.btn}
									onClick={() =>
										dispatch({
											type: "ADD",
											payload: {
												product: productDetails?.product,
												quantity,
											},
										})
									}
								>
									Add to cart
								</button>
							</>
						)}

						<p className={`${styles.note} mt-auto`}>
							Share this product with friends:
						</p>
						<div className={styles.socialIcons}>
							<FacebookIcon />
							<InstagramIcon />
							<WhatsAppIcon />
						</div>
						<h3 className={styles.details}>Product Details</h3>
						<p className={styles.productDetails}>
							{productDetails?.product?.productDescription}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
