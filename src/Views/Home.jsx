import React from "react";
import app from "../fireBase";
import "../Styles/Home.css";
import ImageGallery from "../Components/ImageGallery";

//

const Home = () => {
	return (
		<div className="home-wrapper">
			<h1>Portfolio Settings</h1>
			<ImageGallery />
			<button onClick={() => app.auth().signOut()}>Sign out</button>
		</div>
	);
};

export default Home;
