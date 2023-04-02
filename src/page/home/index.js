import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Bg, Product } from "../../assets";
import { IoSearchOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { Oval } from "react-loader-spinner";
import { ProductCard } from "../../component";
import { getMerchant } from "../../api";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { setToStorage } from "../../constants";
import { DebounceInput } from "react-debounce-input";

const Home = () => {
	const { merchantID } = useParams();
	const [searchParams, setSearchParams] = useSearchParams({ pg: 1 });
	const pg = searchParams.get("pg");
	const sb = searchParams.get("sb");
	const d = searchParams.get("d");

	const [productList, setProductList] = useState([]);
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
	const [s, setKeyword] = useState("");

	const { data, isLoading } = useQuery({
		queryKey: ["mechart", merchantID, pg, sb, d, s],
		queryFn: () =>
			getMerchant({
				id: merchantID,
				page: pg,
				sortBy: sb,
				direction: d,
				keyword: s,
			}),
		onSuccess: (data) => {
			setProductList(data?.products?.data);
			setToStorage("merchantID", data?.merchantID);
		},
	});

	useEffect(() => {
		return () => {
			setToStorage("storeID", merchantID);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen);

	const handlePageClick = (event) => {
		searchParams.set("pg", event.selected + 1);
		setSearchParams(searchParams);
	};

	const handleSearchParam = (params) => {
		Object.entries(params).forEach((entry) => {
			const [key, value] = entry;
			searchParams.set(key, value);
			setSearchParams(searchParams);
		});
	};

	return (
		<>
			{isLoading ? (
				<div className="d-flex align-items-center justify-content-center mt-auto">
					<Oval
						height={60}
						width={60}
						color="#5e60ce"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#5e60ce"
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				</div>
			) : (
				<div className={styles["hero-section"]}>
					<div
						className={styles["hero-img"]}
						style={{ backgroundImage: `url(${Bg})` }}
					/>
					<img
						className={styles["store-initails"]}
						src={`https://ui-avatars.com/api/?name=${data?.businessname}`}
						alt="business"
					/>
					<div className="container">
						<div className={styles["store-wrapper"]}>
							<h1 className={styles["store-title"]}>{data?.businessname}</h1>
						</div>
						<div className={styles["search-wrapper"]}>
							<div className={styles["search-container"]}>
								<IoSearchOutline className={styles["search-icon"]} />
								<DebounceInput
									debounceTimeout={500}
									type="text"
									className={styles["search-input"]}
									placeholder="Search for products"
									value={s}
									onChange={(event) => {
										setKeyword(event.target.value);
										searchParams.set("pg", 1);
										setSearchParams(searchParams);
									}}
								/>
								{/* <button className={styles["search-btn"]}>Search </button> */}
							</div>
						</div>

						<div className={styles["products-container"]}>
							<div className={styles["products-header"]}>
								<h2 className={styles["products-title"]}>Explore Products</h2>
								<div className={styles.featuredProductContainer}>
									<h2
										className={styles.featuredProduct}
										onClick={toggleDropdown}
									>
										Featured
										<span>
											<SlArrowDown className="ml-2 featuredProduct-icon" />
										</span>
									</h2>
									<div
										className={`${styles.featuredDropdown} ${
											dropdownIsOpen && "d-flex"
										}`}
									>
										<ul>
											{/* <li>Featured</li> */}
											{/* <li>New Arrivals</li> */}
											<li
												onClick={() =>
													handleSearchParam({
														sb: "price",
														d: "DESC",
													})
												}
											>
												Price: High to Low
											</li>
											<li
												onClick={() =>
													handleSearchParam({
														sb: "price",
														d: "ASC",
													})
												}
											>
												Price: Low to High{" "}
											</li>
											<li
												onClick={() =>
													handleSearchParam({
														sb: "productname",
														d: "ASC",
													})
												}
											>
												Name: A - Z
											</li>
											<li
												onClick={() =>
													handleSearchParam({
														sb: "productname",
														d: "DESC",
													})
												}
											>
												Name: Z - A
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row">
								{productList?.map((product, index) => (
									<div className="col-lg-3 col-md-6 col-sm-6" key={index}>
										<ProductCard image={Product} product={product} />
									</div>
								))}
							</div>
							<ReactPaginate
								breakLabel="..."
								nextLabel="&raquo;"
								onPageChange={handlePageClick}
								pageRangeDisplayed={5}
								pageCount={data?.products?.meta?.last_page}
								previousLabel="&laquo;"
								renderOnZeroPageCount={null}
								pageClassName="page-item"
								className="pagination"
								pageLinkClassName="page-link"
								activeClassName="active"
								nextClassName="page-item"
								previousClassName="page-item"
								nextLinkClassName="page-link"
								previousLinkClassName="page-link"
								forcePage={parseInt(pg) - 1}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
