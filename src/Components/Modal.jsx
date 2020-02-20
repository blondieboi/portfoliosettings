import React, { useState } from "react";
import "../Styles/Modal.css";
import app from "../fireBase";

const Modal = ({ availablePlacements }) => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [fileSize, setFileSize] = useState("");
	const [imageName, setImageName] = useState("");
	const [placement, setPlacement] = useState(availablePlacements[0]);
	const [isLoading, setIsLoading] = useState(false);

	const ref = app.storage().ref();
	const database = app.database();

	const handleClick = e => {
		if (fileSize === "" || fileName === "") {
			return;
		} else {
			e.preventDefault();
			setIsLoading(true);
			const id = Math.round(Math.random() * 10000000);
			ref
				.child(file.name)
				.put(file)
				.then(snapshot => snapshot.ref.getDownloadURL())
				.then(url => {
					database
						.ref("GalleryImages")
						.child(`${id}`)
						.update({
							id: id,
							storageName: file.name,
							name: fileName,
							placement: placement,
							size: fileSize,
							url: url
						});
					setIsLoading(false);
					window.location.reload();
				});
		}
	};

	const handleFileSelect = e => {
		e.preventDefault();
		setFile(e.target.files["0"]);
		setFileSize(e.target.files["0"].size);
		setImageName(e.target.files["0"].name);
	};

	const handleNameChange = e => {
		setFileName(e.target.value);
	};

	const handleSelectChange = e => {
		setPlacement(e.target.value);
	};

	const options = availablePlacements.map(placement => (
		<option key={placement} value={placement}>
			{placement}
		</option>
	));

	return (
		<div className="modal-wrapper">
			<form className="modal-form" autoComplete="off">
				<label className="modal-input-label">
					Name:
					<input
						className="modal-input"
						type="text"
						name="name"
						onChange={handleNameChange}
						value={fileName}
					/>
				</label>
				<label className="modal-input-label">
					Placement:
					<select onChange={handleSelectChange} value={placement}>
						{options}
					</select>
				</label>
				<label className="modal-input-label">
					Size:
					<input
						className="modal-input"
						type="text"
						name="name"
						value={
							fileSize > 0 ? `${Math.round(fileSize / 10000) / 100} MB` : ""
						}
						disabled
					/>
				</label>
				<label className="modal-input-label">
					File Name:
					<input
						className="modal-input"
						type="text"
						name="name"
						value={imageName}
						disabled
					/>
				</label>
				{file ? (
					<img
						className="preview-image"
						src={URL.createObjectURL(file)}
						alt="preview"
					/>
				) : (
					""
				)}
				<label htmlFor="file-upload" className="file-upload-button">
					Select Image
				</label>
				<input
					id="file-upload"
					className="file-input"
					type="file"
					accept="image/x-png,"
					onChange={handleFileSelect}
				/>
				<button onClick={handleClick}>
					{isLoading ? <div className="loader"></div> : "Save"}
				</button>
			</form>
		</div>
	);
};

export default Modal;
