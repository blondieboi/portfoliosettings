import React from "react";
import GalleryElement from "./GalleryElement";
import "../Utils/findDuplicates";
import { findDuplicates } from "../Utils/findDuplicates";

const ImageTable = ({ takenPlacements, data }) => {
	const duplicates = findDuplicates(takenPlacements);

	const errorModal = duplicates.map(dulpicate => (
		<h2 className="error-box" key={dulpicate}>
			Warning: Duplicate placement {dulpicate}
		</h2>
	));

	const element = data.map((key, item) => {
		return (
			<GalleryElement
				key={data[item].id}
				child={data[item].id}
				data={data[item]}
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
