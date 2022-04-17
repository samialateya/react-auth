import './LoginPage.css';
import { useState, useEffect } from 'react';
import { ErrorMessageComponent } from '../../../Components/alerts/ErrorMessageComponent.jsx';
import { InfoMessageComponent } from '../../../Components/alerts/InfoMessageComponent.jsx';
import { FormComponent } from './FormComponent';
import { FooterComponent } from './FooterComponent';
import { useLocation } from 'react-router-dom';
import { useGuestMiddleware } from '../../../Hooks/MiddlewareHooks';

export function LoginPage() {
	//SECTION	Scripts
	
	//ANCHOR component state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');

	//ANCHOR router navigation props
	const { state } = useLocation();

	//ANCHOR guest middleware
	const [guestMiddleware] = useGuestMiddleware();

	//ANCHOR on component mount
	useEffect(() => {
		//*Implement Guest Middleware 
		guestMiddleware();
		//?print flash message from navigation props if any
		setInfoMessage(state?.flashMessage);
	}, []);
	//#!SECTION

	return (
		<div className="login-container bg-light">
			{/*#SECTION login card */}
			<div className="card card-body flex-grow-0">

				{/* ANCHOR form text */}
				<h1 className="text-black-50">Auth Starter Login</h1>
				<h4>Hello! let's get started</h4>
				<h6>Sign in to continue.</h6>

				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />
				<InfoMessageComponent message={infoMessage} />

				{/* #ANCHOR Form */}
				<FormComponent setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} />

				{/* #ANCHOR Form Footer */}
				<FooterComponent />
			</div>
			{/*#!SECTION login card */}
		</div>
	)
}
