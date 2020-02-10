import React from "react";
import "../Styles/Home.css";
import ImageGallery from "../Components/ImageGallery";
import Header from "../Components/Header";

const Home = () => {
	return (
		<div>
			<Header />
			<div className="home-wrapper">
				<h1>Portfolio Settings</h1>
				<ImageGallery />
			</div>
		</div>
	);
};

export default Home;
