// import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FiSearch } from "react-icons/fi";
import {
	Link,
	useLocation,
	// useParams
} from "react-router-dom";
// import { getMerchant } from "../../api";
import styles from "./header.module.css";

const Header = () => {
	const location = useLocation();

	// const { id } = useParams();

	// const { data } = useQuery({
	// 	queryKey: ["mechart", id],
	// 	queryFn: () => getMerchant(id),
	// });

	if (location.pathname === "/") return;

	return (
		<div className={styles.bb}>
			<div className="container">
				<div className={`d-flex justify-content-between align-items-center`}>
					<Link to="/">
						<img
							className={styles.headerLogo}
							src={`https://ui-avatars.com/api/?name=ScentBird`}
							alt="business"
						/>
					</Link>
					<h2 className={styles.storeName}>ScentBird</h2>
					<FiSearch size={22} />
				</div>
			</div>
		</div>
	);
};

export default Header;
