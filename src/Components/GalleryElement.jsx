import React, { useState } from "react";
import app from "../fireBase";
import PlacementSelector from "./PlacementSelector";

const GalleryElement = props => {
	const [isEdit, setIsEdit] = useState(false);
	const [imageName, setImageName] = useState(props.data.name);
	let data = props.data;
	let child = props.child;

	const database = app.database();
	const storage = app.storage();

	const handleDelete = child => e => {
		console.log(child);
		e.preventDefault();
		database
			.ref("GalleryImages")
			.child(`${child}`)
			.remove()
			.then(function() {
				console.log("Remove succeeded.");
			})
			.catch(function(error) {
				console.log("Remove failed: " + error.message);
			});

		storage
			.ref()
			.child(data.storageName)
			.delete()
			.then(function() {
				console.log("Remove succeeded.");
			})
			.catch(function(error) {
				console.log("Remove failed: " + error.message);
			});
	};

	const handleChange = e => {
		e.preventDefault();
		setImageName(e.target.value);
	};

	const handleClick = child => e => {
		e.preventDefault();
		const { name, placement } = e.target.elements;
		if (isEdit) {
			database
				.ref("GalleryImages")
				.child(`${props.child}`)
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
				<input
					className="gallery-element-button"
					type="submit"
					value={isEdit ? "Save" : "Edit"}
				/>
				<input
					className="gallery-element-button"
					type="submit"
					onClick={handleDelete(child)}
					value="Delete"
				/>
			</form>
			<div className="gallery-right">
				<img className="gallery-image" src={data.url} alt="portfolio" />
			</div>
			<PlacementSelector />
		</div>
	);
};

export default GalleryElement;
