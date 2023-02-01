import React from "react";
import "./home.css";
import { Bg, Product } from "../../assets";
import { IoSearchOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { ProductCard } from "../../component";

const Home = () => {
	return (
		<div className="hero-section">
			<div className="hero-img" style={{ backgroundImage: `url(${Bg})` }}></div>
			<div className="store-initails">
				<h1>BP</h1>
			</div>
			<div className="container">
				<div className="store-wrapper">
					<h1 className="store-title">Bambam’s Perfume Store</h1>
					<p className="store-description">
						Welcome to my store, I sell bespoke perfumes at affordable prices.
						<br />
						Lorem ipsum dolor sit amet consectetur. Ullamcorper sodales tempus
						et tortor risus dignissim tellus. Magna lobortis sapien sit est quis
						sollicitudin.
					</p>
				</div>
				<div className="search-wrapper">
					<div className="serach-container gap-2">
						<IoSearchOutline className="search-icon" />
						<input
							type="text"
							className="search-input"
							placeholder="Search for products"
						/>
						<button className="search-btn">Search </button>
					</div>
				</div>

				<div className="products-container">
					<div className="products-header">
						<h2 className="products-title">Explore Products</h2>
						<h2 className="product-feature">
							Featured <SlArrowDown className="ml-2 product-feature-icon" />
						</h2>
					</div>
					<div className="row">
						{Array(12)
							.fill("")
							.map((_, index) => (
								<div className="col-lg-3 col-md-6 col-sm-1">
									<ProductCard image={Product} key={index} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
