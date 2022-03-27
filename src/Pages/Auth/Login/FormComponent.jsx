import { useState } from 'react';
import { APIHelper } from '../../../Helpers/APIHelper.js';
export function FormComponent({	setErrorMessage }) {
	//SECTION	Scripts
	
	//ANCHOR login
	async function login(e){
		//prevent default submitting behavior
		e.preventDefault();
		//*start loading functionality
		startLoader();
		//*send ajax request to the server
		try{
			const response = await (new APIHelper()).post('user/login', new FormData(e.target));
			switch(response.code){
				//incorrect credentials case
				case 401:
					setErrorMessage("Incorrect email or password");
					break;
				//invalid inputs case
				case 422:
					setErrorMessage("Email or password are invalid");
					break;
				//server error case
				case 500:
					setErrorMessage("Server Error! please contact support center");
					break;
				//default case
				default:
					setErrorMessage("Something went wrong, please try again later");
					break;
			}
		} catch(error){
			setErrorMessage("Connection Error!");
		}
		//*stop loading functionality
		stopLoader();
	}

	//ANCHOR start loader
	function startLoader(){
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('SIGN IN');
		setLoadingState(false);
	}
	
	//ANCHOR local component state
	const [btnText, setBtnText] = useState('SIGN IN');
	const [loadingState, setLoadingState] = useState(false);
	
	//#!SECTION
	return (
		<>
			{/* #SECTION Form */}
			<form className="pt-3" onSubmit={(event) => login(event)}>
				{/* #ANCHOR email  */}
				<div className="pb-2">
					<input type="email" name="email" placeholder="Email" className="form-control form-control-lg" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="Invalid email address" autoComplete="email" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR password  */}
				<div className="pb-2">
					<input type="password" name="password" placeholder="Password" autoComplete="current-password" className="form-control form-control-lg" required minLength="6" />
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