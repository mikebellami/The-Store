import React from "react";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import { CartIcon, Footer, Header } from "./component";
import CartProvider from "./context/cartContext";
import { Home, Product } from "./page";

function App() {
	return (
		<CartProvider>
			<Router>
				<Routes>
					<Route element={<AppWrapper />}>
						<Route index element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
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

export default App;
