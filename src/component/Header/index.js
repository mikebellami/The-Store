import React from "react";
// import { FiSearch } from "react-icons/fi";
import { Link, useMatch, useParams } from "react-router-dom";
import { getFromStorage } from "../../constants";
import { getMerchant } from "../../api";
import styles from "./header.module.css";
import { useQuery } from "@tanstack/react-query";

const nonRoutes = ["/confirm", "/account", "/cart", "/payment", "/tracker"];

const Header = () => {
	const { merchantID } = useParams();

	const storeID = merchantID || getFromStorage("storeID");

	const { data } = useQuery({
		queryKey: ["mechart", storeID],
		queryFn: () => getMerchant(storeID),
	});

	const homeMatch = useMatch("/:id");

	if (homeMatch && !nonRoutes.includes(homeMatch.pathname)) return;

	return (
		<div className={styles.bb}>
			<div className="container">
				<div className={`d-flex justify-content-between align-items-center`}>
					<Link to={`/${storeID}`}>
						<img
							className={styles.headerLogo}
							src={`https://ui-avatars.com/api/?name=${data?.businessname}`}
							alt="business"
						/>
					</Link>
					<h2 className={`${styles.storeName}`}>{data?.businessname}</h2>
					<div></div>
					{/* <FiSearch size={22} /> */}
				</div>
			</div>
		</div>
	);
};

export default Header;
