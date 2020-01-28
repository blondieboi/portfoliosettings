import React from "react";
import "./App.css";
import Login from "./Views/Login";
import { AuthProvider } from "./Utils/Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Views/Home";
import PrivateRoute from "./Utils/PrivateRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<PrivateRoute exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/login" component={Login} />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
