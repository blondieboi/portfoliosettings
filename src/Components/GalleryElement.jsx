import React, { useState } from "react";
import app from "../fireBase";
import PlacementSelector from "./PlacementSelector";

const GalleryElement = props => {
	const [isEdit, setIsEdit] = useState(false);
	const [imageName, setImageName] = useState(props.data.name);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingSave, setIsLoadingSave] = useState(false);
	let data = props.data;
	let child = props.child;

	const database = app.database();
	const storage = app.storage();

	const handleDelete = child => e => {
		setIsLoading(true);
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
				setIsLoading(false);
				window.location.reload();
			})
			.catch(function(error) {
				console.log("Remove failed: " + error.message);
				setIsLoading(false);
			});
	};

	const handleChange = e => {
		e.preventDefault();
		setImageName(e.target.value);
	};

	const handleClick = child => e => {
		setIsLoadingSave(true);

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
		setIsLoadingSave(false);
		window.location.reload();
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
				<button className="gallery-element-button" type="submit">
					{isEdit ? (
						"Save"
					) : isLoadingSave ? (
						<div className="loader"></div>
					) : (
						"Edit"
					)}
				</button>
				<button
					className="gallery-element-button"
					type="submit"
					onClick={handleDelete(child)}
				>
					{isLoading ? <div className="loader"></div> : "Delete"}
				</button>
			</form>
			<div className="gallery-right">
				<img className="gallery-image" src={data.url} alt="portfolio" />
			</div>
		</div>
	);
};

export default GalleryElement;
