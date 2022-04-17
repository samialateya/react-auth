import './VerifyEmailPage.css';
import { useState, useEffect, useContext} from 'react';
import { ErrorMessageComponent } from '../../../Components/alerts/ErrorMessageComponent.jsx';
import { InfoMessageComponent } from '../../../Components/alerts/InfoMessageComponent.jsx';
import { FormComponent } from './FormComponent.jsx';
import { useLocation } from 'react-router-dom';
import { NavbarComponent } from '../../../Components/NavbarComponent';
import { GlobalContext } from '../../../StateManager/AppContext.js';
import { useAuthMiddleware } from '../../../Hooks/MiddlewareHooks';

export function VerifyEmailPage() {
	//SECTION	Scripts
	//ANCHOR global state
	const [userData] = useContext(GlobalContext);

	//ANCHOR component state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	
	//ANCHOR navigation & navigation props
	const { state } = useLocation();

	//ANCHOR use authentication middleware
	const [authMiddleware] = useAuthMiddleware();

	//ANCHOR on component mount
	useEffect(() => {
		//*Implement Authentication Middleware 
		authMiddleware();
		//print flash message from navigation props if any
		setInfoMessage(state?.flashMessage);
	}, []);
	//#!SECTION

	return (
		<>
			{/* ANCHOR Navbar */}
			<NavbarComponent />
			<div className="verify-email-container">
				{/*#SECTION verify-email card */}
				<div className="card card-body flex-grow-0">

					{/* ANCHOR form text */}
					<h1 className="text-black-50">Verify Your Email</h1>

					{/* #ANCHOR reporting elements */}
					<ErrorMessageComponent message={errorMessage} />
					<InfoMessageComponent message={infoMessage} />

					{/* #ANCHOR Form */}
					<FormComponent setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} userData={userData} />

				</div>
				{/*#!SECTION register card */}
			</div>
		</>
	)
}
