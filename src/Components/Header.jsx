import React from "react";
import "../Styles/Header.css";
import app from "../fireBase";

const Header = () => {
	return (
		<div className="header-wrapper">
			<h1>JW</h1>
			<div className="logout-button" onClick={() => app.auth().signOut()}>
				Sign out
			</div>
		</div>
	);
};

export default Header;
