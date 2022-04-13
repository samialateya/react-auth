import './VerifyEmailPage.css';
import { useState, useEffect, useContext} from 'react';
import { ErrorMessageComponent } from '../../../Components/alerts/ErrorMessageComponent.jsx';
import { InfoMessageComponent } from '../../../Components/alerts/InfoMessageComponent.jsx';
import { FormComponent } from './FormComponent.jsx';
import { AuthManager } from '../../../StateManager/AuthManager.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarComponent } from '../../../Components/NavbarComponent';
import { GlobalContext } from '../../../StateManager/AppContext.js';

export function VerifyEmailPage() {
	//SECTION	Scripts
	//ANCHOR global state
	const [userData, setUserData] = useContext(GlobalContext);
	//ANCHOR local state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	
	//ANCHOR navigation & navigation props
	const navigate = useNavigate();
	const { state } = useLocation();

	//ANCHOR invalid token handler
	function invalidToken() {
		//clear user data from context and local storage
		AuthManager.clearUserData();
		setUserData(null);
		//redirect to the login page with flash message
		navigate('/login', { state: { flashMessage: 'your session has expired, login again' } });
	}
	useEffect(() => {
		//?redirect un authenticated users to login
		if (!AuthManager.isLoggedIn()) {
			navigate('/login');
		}
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
					<FormComponent setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} userData={userData} invalidToken={invalidToken} />

				</div>
				{/*#!SECTION register card */}
			</div>
		</>
	)
}
