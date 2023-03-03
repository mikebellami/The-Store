import React, { useEffect } from "react";
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

const Home = () => {
	const { merchantID } = useParams();
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const page = searchParams.get("page");

	const { data, isLoading } = useQuery({
		queryKey: ["mechart", merchantID, page],
		queryFn: () => getMerchant(merchantID, page),
		onSuccess: (data) => {
			setToStorage("merchantID", data.merchantID);
		},
	});

	useEffect(() => {
		return () => {
			setToStorage("storeID", merchantID);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePageClick = (event) => {
		searchParams.set("page", event.selected + 1);
		setSearchParams(searchParams);
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
					></div>
					<img
						className={styles["store-initails"]}
						src={`https://ui-avatars.com/api/?name=${data?.businessname}`}
						alt="business"
					/>
					<div className="container">
						<div className={styles["store-wrapper"]}>
							<h1 className={styles["store-title"]}>{data?.businessname}</h1>
							{/* <p className={styles["store-description"]}>
						Welcome to my store, I sell bespoke perfumes at affordable prices.
						<br />
						Lorem ipsum dolor sit amet consectetur. Ullamcorper sodales tempus
						et tortor risus dignissim tellus. Magna lobortis sapien sit est quis
						sollicitudin.
					</p> */}
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
									Featured
									<span>
										<SlArrowDown className="ml-2 product-feature-icon" />
									</span>
								</h2>
							</div>
							<div className="row">
								{data?.products?.data?.map((product, index) => (
									<div className="col-lg-3 col-md-6 col-sm-1" key={index}>
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
								forcePage={parseInt(page) - 1}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
