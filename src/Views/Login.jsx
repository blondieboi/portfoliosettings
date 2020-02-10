import React, { useContext, useCallback } from "react";
import "../Styles/Login.css";
import app from "../fireBase";
import { AuthContext } from "../Utils/Auth";
import { withRouter, Redirect } from "react-router-dom";

const Login = ({ history }) => {
	const handleSubmit = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push("/");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div className="background">
			<div className="overlay">
				<div className="login-wrapper">
					<div className="greeting-wrapper">
						<h1 className="title">Login</h1>
						<h4 className="sub-title">
							nice to see you <b>again</b>.
						</h4>
					</div>

					<form className="login-form" onSubmit={handleSubmit}>
						<label className="login-label">
							email:
							<input className="login-input" name="email" type="email" />
						</label>
						<label className="login-label">
							password:
							<input className="login-input" name="password" type="password" />
						</label>
						<button type="submit">Log In!</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Login);
