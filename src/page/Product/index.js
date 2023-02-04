import React, { useMemo } from "react";
import { ArrowButton, QuantityInput } from "../../component";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./Product.module.css";
import Slider from "react-slick";
import product from "../../assets/img/product.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../../assets";

const Product = () => {
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

	return (
		<div className="container">
			<div className={styles.page}>
				<div className="d-flex justify-content-between mb-3">
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
				</div>
				<div className="row mt-5 col-12">
					<div className="col-md-6">
						<Slider {...settings}>
							<div className={styles.productImageWrapper}>
								<img
									className={styles.productImage}
									src={product}
									alt="product"
								/>
							</div>
							<div className={styles.productImageWrapper}>
								<img
									className={styles.productImage}
									src={product}
									alt="product"
								/>
							</div>
							<div className={styles.productImageWrapper}>
								<img
									className={styles.productImage}
									src={product}
									alt="product"
								/>
							</div>
							<div className={styles.productImageWrapper}>
								<img
									className={styles.productImage}
									src={product}
									alt="product"
								/>
							</div>
						</Slider>
					</div>
					<div className="col-md-6">
						<h2 className={styles.productName}>Bleu Perfume</h2>
						<h3 className={styles.productPrice}>
							{new Intl.NumberFormat("en-GB", {
								style: "currency",
								currency: "NGN",
							}).format(8500)}
						</h3>
						<p className={styles.productQuantity}>Quantity</p>
						<QuantityInput />
						<button className={styles.btn}>Add to cart</button>
						<p className={styles.note}>Share this product with friends:</p>
						<div className={styles.socialIcons}>
							<FacebookIcon />
							<InstagramIcon />
							<WhatsAppIcon />
						</div>
						<h3 className={styles.details}>Product Details</h3>
						<p className={styles.productDetails}>
							Add variations of your products that customers can choose from.
							Common variants include license options, colors, sizes, and more.
							Add variations of your products that customers can choose from.
							Common variants include license options, colors, sizes, and more.
							Add variations of your products that customers can choose from.
							Common variants include license options, colors, sizes, and more.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
