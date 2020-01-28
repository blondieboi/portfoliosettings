import React, { useState } from "react";
import "../Styles/Gallery.css";
import data from "../Mock/gallery.json";

const ImageGallery = () => {
	const [isEdit, setIsEdit] = useState(false);

	const handleClick = () => {
		setIsEdit(!isEdit);
	};

	const imageTable = Object.keys(data).map((key, index) => (
		<div key={key} className="gallery-element">
			<div className="gallery-left">
				<p>Name: {data[index].name}</p>
				<p>Placement: {data[index].placement}</p>
				<p>ID: {data[index].id}</p>
				<p>Size: {data[index].size}</p>
			</div>
			<div className="gallery-right">
				<img
					className="gallery-image"
					src={data[index].urlWebp}
					alt="portfolio"
				/>
			</div>
		</div>
	));

	return (
		<div className="gallery-wrapper">
			<div className="gallery-header">
				<h3>Image Gallery</h3>
				<button onClick={handleClick}>{isEdit ? "Save" : "Edit"}</button>
			</div>
			{imageTable}
		</div>
	);
};

export default ImageGallery;
