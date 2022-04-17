import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { APIHelper } from '../../../Helpers/APIHelper.js';

export function FormComponent({ setErrorMessage, setInfoMessage }) {
	//SECTION	Scripts

	//ANCHOR local component state
	const [btnText, setBtnText] = useState('Reset Password');
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR start loader
	function startLoader() {
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('SIGN IN');
		setLoadingState(false);
	}

	//ANCHOR Reset Password functionality
	async function resetPassword(e){
		//prevent default submitting behavior
		e.preventDefault();
		
		//clear previous flash and error messages
		setErrorMessage('');
		setInfoMessage('');

		//*start loading functionality
		startLoader();
		
		//*send ajax request to the server
		try{
			const response = await (new APIHelper()).post('/user/forgot-password', new FormData(e.target));
			//*stop loading functionality
			stopLoader();
			switch(response.code){
				//case 200 save user data to the state manager and redirect to the home page
				case 200: setInfoMessage("Reset password link sent to your email"); break;
				//incorrect credentials case
				case 406: setErrorMessage("Email not found"); break;
				//invalid inputs case
				case 422: setErrorMessage("Email or password are invalid"); break;
				//server error case
				case 500: setErrorMessage("Server Error! please contact support center"); break;
				//default case
				default: setErrorMessage("Something went wrong, please try again later"); break;
			}
		} catch(error){
			console.log(error);
			setErrorMessage("Connection Error!");
		}
	}
	
	//#!SECTION
	return (
		<>
			{/* #SECTION Form */}
			<form className="pt-3" onSubmit={(event) => resetPassword(event)}>
				{/* #ANCHOR email  */}
				<div className="pb-2">
					<input type="email" name="email" placeholder="Email" className="form-control form-control-lg" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="Invalid email address" autoComplete="email" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR submit button */}
				<div className="pb-2">
					<button type="submit" className="btn btn-block btn-dark" disabled={loadingState}>{btnText}</button>
				</div>
			</form>
			{/* #!SECTION Form */}
		</>
	)
}

//*setup the prop types for the component
FormComponent.propTypes = {
	setErrorMessage: PropTypes.func.isRequired,
	setInfoMessage: PropTypes.func.isRequired
}
