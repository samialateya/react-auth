import './ResetPasswordPage.css';
import { useState, useEffect } from 'react';
import { ErrorMessageComponent } from '../../../Components/alerts/ErrorMessageComponent.jsx';
import { InfoMessageComponent } from '../../../Components/alerts/InfoMessageComponent.jsx';
import { FormComponent } from './FormComponent';
import { FooterComponent } from './FooterComponent';
import { AuthManager } from '../../../StateManager/AuthManager.js';
import { useNavigate } from 'react-router-dom';

export function ResetPasswordPage() {
	//SECTION	Scripts
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	const navigate = useNavigate();
	//prevent logged in user from accessing the register page
	useEffect(() => {
		if (AuthManager.isLoggedIn()) {
			navigate('/');
		}
	}, []);
	//#!SECTION

	return (
		<div className="reset-password-container bg-light">
			{/*#SECTION reset-password card */}
			<div className="card card-body flex-grow-0">

				{/* ANCHOR form text */}
				<h1 className="text-black-50">Reset Password</h1>

				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />
				<InfoMessageComponent message={infoMessage} />

				{/* #ANCHOR Form */}
				<FormComponent setErrorMessage={setErrorMessage} />

				{/* #ANCHOR Form Footer */}
				<FooterComponent />
			</div>
			{/*#!SECTION register card */}
		</div>
	)
}
