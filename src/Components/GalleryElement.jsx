import React, { useState } from "react";
import app from "../fireBase";

const GalleryElement = props => {
	const [isEdit, setIsEdit] = useState(false);
	const [imageName, setImageName] = useState(props.data.name);
	let data = props.data;
	let child = props.child;

	const database = app.database();

	const handleChange = e => {
		e.preventDefault();
		setImageName(e.target.value);
	};

	const handleClick = child => e => {
		e.preventDefault();
		const { name, placement } = e.target.elements;
		console.log(child);
		if (isEdit) {
			database
				.ref("GalleryImages")
				.child(`${child}`)
				.update({
					name: name.value
				});
		} else {
		}
		setIsEdit(!isEdit);
	};
	return (
		<div className="gallery-element">
			<form className="gallery-form" onSubmit={handleClick(child)}>
				<label>
					Name:
					<input
						onChange={handleChange}
						className="text-field"
						type="text"
						name="name"
						value={imageName}
						disabled={!isEdit}
					/>
				</label>
				<label>
					Placement:
					<input
						className="text-field"
						type="text"
						name="placement"
						value={data.placement}
						disabled
					/>
				</label>
				<label>
					id:
					<input
						className="text-field"
						type="text"
						name="id"
						value={data.id}
						disabled
					/>
				</label>
				<label>
					Size:
					<input
						className="text-field"
						type="text"
						name="size"
						value={data.size}
						disabled
					/>
				</label>
				<input type="submit" value={isEdit ? "Save" : "Edit"} />
			</form>
			<div className="gallery-right">
				<img className="gallery-image" src={data.url} alt="portfolio" />
			</div>
		</div>
	);
};

export default GalleryElement;
