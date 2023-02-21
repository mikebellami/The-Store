import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import "./App.css";
import { CartIcon, Footer, Header } from "./component";
import { getFromStorage } from "./constants";
import CartProvider, { useCartContext } from "./context/cartContext";
import {
	Home,
	Product,
	Confirmation,
	Account,
	Cart,
	Payment,
	Tracker,
} from "./page";

function App() {
	return (
		<CartProvider>

			<Router >
				<Routes>
					<Route element={<AppWrapper />}>
						<Route path="/:merchantID" exact element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/cart" element={<Cart />} />
						<Route element={<Redirect />}>
							<Route path="/confirm" element={<Confirmation />} />
							<Route path="/payment" element={<Payment />} />
						</Route>
						<Route path="/account" element={<Account />} />
						<Route path="/tracker" element={<Tracker />} />
					</Route>
				</Routes>
			</Router>
		</CartProvider>
	);
}

const AppWrapper = () => {
	return (
		<div className="app-wrapper">
			<Header />
			<CartIcon />
			<Outlet />
			<Footer />
		</div>
	);
};

const Redirect = () => {
	const {
		state: { cart },
	} = useCartContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!cart.length) return navigate(`/${getFromStorage("storeID")}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Outlet />;
};

export default App;
