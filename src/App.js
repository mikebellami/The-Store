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
import { Home, Product, Confirmation, Account, Cart } from "./page";

function App() {
	return (
		<CartProvider>
			<Router basename="/store-web">
				<Routes>
					<Route element={<AppWrapper />}>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/confirmation" element={<Confirmation />} />
						<Route path="/account" element={<Account />} />
						<Route path="/cart" element={<Cart />} />
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
