import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {Home,Completed} from "./page";

function App() {
	return (
		<Router>
			<Routes>
        <Route index element={<Home />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
		</Router>
	);
}

export default App;
