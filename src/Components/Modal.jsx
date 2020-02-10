import React from "react";
import "../Styles/Modal.css";

const Modal = () => {
	return (
		<div className="modal-wrapper">
			<form className="modal-form">
				<label>
					Name:
					<input type="text" name="name" />
				</label>
				<button>Select Image</button>
			</form>
		</div>
	);
};

export default Modal;
