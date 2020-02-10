import React, { useState, useEffect } from "react";
import "../Styles/Gallery.css";

import app from "../fireBase";
import ImageTable from "./ImageTable";
import Modal from "./Modal";

const database = app.database();

const ImageGallery = () => {
	const [data, setData] = useState([]);
	const [modalActive, setModalActive] = useState(false);

	useEffect(() => {
		database.ref("GalleryImages").once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var childData = childSnapshot.val();
				setData(oldArray => [...oldArray, childData]);
			});
		});
	}, []);

	const displayModal = () => {
		setModalActive(!modalActive);
	};

	return (
		<div className="gallery-wrapper">
			<div className="gallery-header">
				<h3>Image Gallery</h3>
				<button onClick={displayModal}>{modalActive ? "x" : "+"}</button>
			</div>
			{modalActive ? <Modal /> : ""}
			<ImageTable data={data} />
		</div>
	);
};

export default ImageGallery;
