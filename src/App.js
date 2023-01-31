import React from "react";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./component";
import { Home, Product } from "./page";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppWrapper />}>
					<Route index element={<Home />} />
					<Route path="/product/:id" element={<Product />} />
				</Route>
			</Routes>
		</Router>
	);
}

const AppWrapper = () => {
	return (
		<div className="app-wrapper">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default App;
