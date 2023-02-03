import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Bg, Product } from "../../assets";
import { IoSearchOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { ProductCard } from "../../component";

const Home = () => {
	// const [f, setF] = useState()
	
	// useEffect(() => {
	// 	setF(window.innerWidth +"x"+window.innerHeight)
	// }, [f])
	
	return (
		<div className={styles["hero-section"]}>
			<div className={styles["hero-img"]} style={{ backgroundImage: `url(${Bg})` }}></div>
			<div className={styles["store-initails"]}>
				<h1>BP</h1>
			</div>
			<div className="container">
				<div className={styles["store-wrapper"]}>
					
					<h1 className={styles["store-title"]}>Bambam’s Perfume Store</h1>
					<p className={styles["store-description"]}>
						Welcome to my store, I sell bespoke perfumes at affordable prices.
						<br />
						Lorem ipsum dolor sit amet consectetur. Ullamcorper sodales tempus
						et tortor risus dignissim tellus. Magna lobortis sapien sit est quis
						sollicitudin.
					</p>
				</div>
				<div className={styles["search-wrapper"]}>
					<div className={styles["serach-container"]}>
						<IoSearchOutline className={styles["search-icon"]} />
						<input
							type="text"
							className={styles["search-input"]}
							placeholder="Search for products"
						/>
						<button className={styles["search-btn"]}>Search </button>
					</div>
				</div>

				<div className={styles["products-container"]}>
					<div className={styles["products-header"]}>
						<h2 className={styles["products-title"]}>Explore Products</h2>
						<h2 className={styles["product-feature"]}>
							Featured <span><SlArrowDown className="ml-2 product-feature-icon" /></span>
						</h2>
					</div>
					<div className="row">
						{Array(12)
							.fill("")
							.map((_, index) => (
								<div className="col-lg-3 col-md-6 col-sm-1">
									<ProductCard image={Product}  key={index} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
