import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"
import { APIHelper } from '../../../Helpers/APIHelper.js';

export function FormComponent({	setErrorMessage }) {
	//SECTION	Scripts

	//ANCHOR local component state
	const [btnText, setBtnText] = useState('SIGN IN');
	const [loadingState, setLoadingState] = useState(false);
	//*reference current password input
	const currentPassword = useRef('currentPassword');
	
	//ANCHOR use navigation hook
	let navigate = useNavigate();

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
	
	//ANCHOR registration functionality
	async function register(e){
		//prevent default submitting behavior
		e.preventDefault();
		//*start loading functionality
		startLoader();
		//*send ajax request to the server
		try{
			const response = await (new APIHelper()).post('user/register', new FormData(e.target));
			//*stop loading functionality
			stopLoader();
			switch(response.code){
				//case 201 user account is created, navigate to login page
				case 201:
					navigate('/login',{state: { flashMessage : 'Account created successfully, please login' }});
					break;
				//invalid inputs case
				case 422: 
					//?check if email is been used before
					if (response.body.errors.email) setErrorMessage("This email is used before")
					else setErrorMessage("Email or password are invalid"); 
					break;
				//server error case
				case 500: setErrorMessage("Server Error! please contact support center"); break;
				//default case
				default: setErrorMessage("Something went wrong, please try again later"); break;
			}
		} catch(error){
			stopLoader();
			setErrorMessage("Connection Error!");
		}
	}
	
	//#!SECTION
	return (
		<>
			{/* #SECTION Form */}
			<form className="pt-3" onSubmit={(event) => register(event)}>
				{/* #ANCHOR name  */}
				<div className="pb-2">
					<input type="name" name="name" placeholder="Name" className="form-control form-control-lg" required minLength="3" title="Invalid email address" autoComplete="name" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR email  */}
				<div className="pb-2">
					<input type="email" name="email" placeholder="Email" className="form-control form-control-lg" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="Invalid email address" autoComplete="email" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR password  */}
				<div className="pb-2">
					<input type="password" name="password" ref={currentPassword} placeholder="Password" autoComplete="current-password" className="form-control form-control-lg" required minLength="6" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR password confirmation  */}
				<div className="pb-2">
					<input type="password" name="password_confirmation" placeholder="Confirm Your Password" autoComplete="Confirm Your Password" className="form-control form-control-lg" required minLength="6" pattern={currentPassword.current.value} />
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
}
