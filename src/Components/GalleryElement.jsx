import React, { useState } from "react";
import app from "../fireBase";

const GalleryElement = ({ data, child }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [imageName, setImageName] = useState(data.name);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingSave, setIsLoadingSave] = useState(false);
	const [placement, setPlacement] = useState(data.placement);

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

	const handleClick = () => e => {
		setIsLoadingSave(true);

		e.preventDefault();
		const { name } = e.target.elements;
		if (isEdit) {
			database
				.ref("GalleryImages")
				.child(`${child}`)
				.update({
					name: name.value,
					placement: placement
				});
			window.location.reload();
		} else {
		}
		setIsEdit(!isEdit);
		setIsLoadingSave(false);
	};

	const handleSelectChange = e => {
		setPlacement(e.target.value);
	};

	let placementList = [];
	for (let i = 1; i < 21; i++) {
		placementList.push(i);
	}
	const options = placementList.map(option => {
		return (
			<option key={option} value={option}>
				{option}
			</option>
		);
	});

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
				<label className="modal-input-label">
					Placement:
					<select
						onChange={handleSelectChange}
						value={placement}
						disabled={!isEdit}
					>
						{options}
					</select>
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
