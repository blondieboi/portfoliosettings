import React, { useState, useEffect } from "react";
import "../Styles/Gallery.css";

import app from "../fireBase";
import ImageTable from "./ImageTable";
import Modal from "./Modal";

const database = app.database();

const ImageGallery = () => {
	const [data, setData] = useState([]);
	const [modalActive, setModalActive] = useState(false);

	let takenPlacements = [];
	data.map(item => takenPlacements.push(item.placement));

	let totalPlacements = [];
	for (let i = 1; i < 21; i++) {
		totalPlacements.push(i);
	}

	const isTaken = value => {
		return !takenPlacements.includes(value);
	};
	var availablePlacements = totalPlacements.filter(isTaken);

	useEffect(() => {
		database
			.ref("GalleryImages")
			.orderByChild("placement")
			.once("value", function(snapshot) {
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
				<button className="modal-button" onClick={displayModal}>
					{modalActive ? "Close editor" : "Add new image"}
				</button>
			</div>
			{modalActive ? (
				<Modal availablePlacements={availablePlacements} />
			) : (
				<ImageTable data={data} />
			)}
		</div>
	);
};

export default ImageGallery;
