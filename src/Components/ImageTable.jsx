import React from "react";
import GalleryElement from "./GalleryElement";

const ImageTable = props => {
	var object = {};
	var result = [];
	props.takenPlacements.forEach(item => {
		if (!object[item]) object[item] = 0;
		object[item] += 1;
	});

	for (var prop in object) {
		if (object[prop] >= 2) {
			result.push(prop);
		}
	}

	const errorModal = result.map(dulpicate => (
		<h2 className="error-box" key={dulpicate}>
			Warning: Duplicate placement {dulpicate}
		</h2>
	));

	const element = props.data.map((key, item) => {
		return (
			<GalleryElement
				key={props.data[item].id}
				child={props.data[item].id}
				data={props.data[item]}
			/>
		);
	});

	return (
		<div>
			{errorModal}
			{element}
		</div>
	);
};

export default ImageTable;
