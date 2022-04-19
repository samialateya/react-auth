import { useState } from 'react';
import PropTypes from 'prop-types';

import { APIHelper } from '../../../Helpers/APIHelper.js';
import { useInvalidToken } from '../../../Hooks/AuthHooks';

export function FormComponent({ setErrorMessage, setInfoMessage, userData}) {
	//SECTION	Scripts

	//ANCHOR local component state
	const [btnText, setBtnText] = useState('Send Verification Link');
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR use invalid token hook
	const invalidToken = useInvalidToken();

	//ANCHOR start loader
	function startLoader() {
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('Send Verification Link');
		setLoadingState(false);
	}

	//ANCHOR Verify Email
	async function verifyEmail(e) {
		//prevent default submitting behavior
		e.preventDefault();

		//clear previous flash and error messages
		setErrorMessage('');
		setInfoMessage('');

		//*start loading functionality
		startLoader();

		//*send ajax request to the server
		try {
			const response = await (new APIHelper()).post('/user/verify-email', new FormData(e.target), { 'Authorization': `Bearer ${userData.access_token}` });
			//*stop loading functionality
			stopLoader();
			switch (response.code) {
				//case 200 save user data to the state manager and redirect to the home page
				case 200: setInfoMessage("Verification link sent to your email"); break;
				//invalid token
				case 401: invalidToken(); break;
				//server error case
				case 500: setErrorMessage("Server Error! please contact support center"); break;
				//default case
				default: setErrorMessage("Something went wrong, please try again later"); break;
			}
		} catch (error) {
			stopLoader();
			setErrorMessage("Connection Error!");
		}
	}

	//#!SECTION
	return (
		<>
			{/* #SECTION Form */}
			<form className="pt-3" onSubmit={(event) => verifyEmail(event)}>
				{/* #ANCHOR submit button */}
				<div className="pb-2">
					<button type="submit" className="btn btn-block w-100 btn-dark" disabled={loadingState}>{btnText}</button>
				</div>
			</form>
			{/* #!SECTION Form */}
		</>
	)
}

//*setup the prop types for the component
FormComponent.propTypes = {
	setErrorMessage: PropTypes.func.isRequired,
	setInfoMessage: PropTypes.func.isRequired,
	userData: PropTypes.object
}
