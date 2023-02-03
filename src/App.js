import React from "react";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import "./App.css";
import { CartIcon, Footer, Header } from "./component";
import CartProvider from "./context/cartContext";
import { Home, Product, Confirmation, Account, Cart, Payment } from "./page";

function App() {
	return (
		<CartProvider>
			<Router basename="/">
				<Routes>
					<Route element={<AppWrapper />}>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/confirmation" element={<Confirmation />} />
						<Route path="/account" element={<Account />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/payment" element={<Payment />} />
					</Route>
				</Routes>
			</Router>
		</CartProvider>
	);
}

const AppWrapper = () => {
	const location = useLocation();

	return (
		<div className="app-wrpper">
			<Header />
			<CartIcon />
			<Outlet />
			<Footer />
		</div>
	);
};

export default App;
