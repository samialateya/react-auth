import { ErrorMessageComponent } from "../../../Components/alerts/ErrorMessageComponent";
import { InfoMessageComponent } from "../../../Components/alerts/InfoMessageComponent";
import { useState, useRef } from 'react';
import { APIHelper } from "../../../Helpers/APIHelper";
import { useInvalidToken, useUnVerifiedEmail } from "../../../Hooks/AuthHooks";
import { useSyncUserData } from "../../../Hooks/AuthHooks";

export function UpdateBasicInfoComponent({ userData }) {
	//SECTION	Scripts

	
	//ANCHOR component state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	const [btnText, setBtnText] = useState('Update Basic Info');
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR auth hooks
	const invalidToken = useInvalidToken();
	const unVerifiedEmail = useUnVerifiedEmail();

	//ANCHOR use sync user data hook
	const syncUserData = useSyncUserData();

	//ANCHOR input refs
	const passwordRef = useRef(null);

	//ANCHOR start loader
	function startLoader() {
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('Update Basic Info');
		setLoadingState(false);
	}

	//ANCHOR Update Basic Info
	async function updateInfo(e) {
		//prevent default submitting behavior
		e.preventDefault();

		//clear previous flash and error messages
		setErrorMessage('');
		setInfoMessage('');

		//*start loading functionality
		startLoader();

		//*catch from data
		const formData = new FormData(e.target);
		//*send ajax request to the server
		try {
			const response = await (new APIHelper()).post('/user/profile/update', formData, { 'Authorization': `Bearer ${userData.access_token}` });
			//*stop loading functionality
			stopLoader();
			switch (response.code) {
				//case 200 save new user new name to the global state
				case 200:
					const newUserData = { ...userData };
					newUserData.name = formData.get('name');
					//*update user data in the state manager and browser local storage
					syncUserData(newUserData);
					//* print success message
					setInfoMessage("Profile Info Updated Successfully");
					//clear password input
					passwordRef.current.value = '';
					break;
				//invalid input
				case 422: setErrorMessage("Invalid Name OR Password"); break;
				//invalid access token
				case 401: invalidToken(); break;
				//un verified email case
				case 403: unVerifiedEmail();	break;
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

	//SECTION	Layout
	return (
		<>
			<form className="pt-3" onSubmit={(event) => updateInfo(event)}>
				<h4>Update Profile Info</h4>
				<h6>Update basic information</h6>
				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />
				<InfoMessageComponent message={infoMessage} />
				{/* name */}
				<div className="pb-2">
					<input type="name" name="name" placeholder="Name" className="form-control form-control-lg" defaultValue={userData?.name} required minLength="3"/>
				</div>
				{/* password */}
				<div className="pb-2">
					<input type="password" name="password" placeholder="New Password" className="form-control form-control-lg" minLength="6" autoComplete=""  ref={passwordRef}/>
				</div>
				{/* submit button */}
				<div className="mt-3">
					<button type="submit" className="btn w-100 btn-dark" disabled={loadingState}>{btnText}</button>
				</div>
			</form>
		</>
	);
	//#!SECTION
}