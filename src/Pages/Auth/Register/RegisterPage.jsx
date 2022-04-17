import './RegisterPage.css';
import { useState, useEffect } from 'react';
import { ErrorMessageComponent } from '../../../Components/alerts/ErrorMessageComponent.jsx';
import { FormComponent } from './FormComponent';
import { FooterComponent } from './FooterComponent';
import { useGuestMiddleware } from '../../../Hooks/MiddlewareHooks';

export function RegisterPage() {
	//SECTION	Scripts
	
	//ANCHOR Local component state
	const [errorMessage, setErrorMessage] = useState('');

	//ANCHOR guest middleware
	const [guestMiddleware] = useGuestMiddleware();
	
	//ANCHOR on component mount
	useEffect(() => {
		//*Implement Guest Middleware 
		guestMiddleware();
	}, []);
	//#!SECTION

	return (
		<div className="register-container bg-light">
			{/*#SECTION register card */}
			<div className="card card-body flex-grow-0">

				{/* ANCHOR form text */}
				<h1 className="text-black-50">Auth Starter Register</h1>

				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />

				{/* #ANCHOR Form */}
				<FormComponent setErrorMessage={setErrorMessage} />

				{/* #ANCHOR Form Footer */}
				<FooterComponent />
			</div>
			{/*#!SECTION register card */}
		</div>
	)
}
