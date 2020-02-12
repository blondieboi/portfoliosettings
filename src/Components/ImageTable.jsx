import React from "react";
import GalleryElement from "./GalleryElement";

const ImageTable = props => {
	const element = props.data.map((key, item) => {
		return (
			<GalleryElement
				key={props.data[item].id}
				child={props.data[item].id}
				data={props.data[item]}
			/>
		);
	});

	return <div>{element}</div>;
};

export default ImageTable;
