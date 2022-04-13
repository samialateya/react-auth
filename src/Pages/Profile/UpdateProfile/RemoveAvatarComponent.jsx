import { ErrorMessageComponent } from "../../../Components/alerts/ErrorMessageComponent";
import { InfoMessageComponent } from "../../../Components/alerts/InfoMessageComponent";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APIHelper } from "../../../Helpers/APIHelper";
import { AuthManager } from "../../../StateManager/AuthManager";
export function RemoveAvatarComponent({ userData, setUserData}) {
	//SECTION	Scripts

	//ANCHOR component state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	const [btnText, setBtnText] = useState('Remove Avatar');
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR navigation & navigation props
	const navigate = useNavigate();

	//ANCHOR start loader
	function startLoader() {
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('Remove Avatar');
		setLoadingState(false);
	}

	//ANCHOR Remove Avatar
	async function removeAvatar(e) {
		//prevent default submitting behavior
		e.preventDefault();

		//clear previous flash and error messages
		setErrorMessage('');
		setInfoMessage('');

		//*start loading functionality
		startLoader();

		//*send ajax request to the server
		try {
			const response = await (new APIHelper()).post('/user/profile/update/remove-avatar', new FormData(e.target), { 'Authorization': `Bearer ${userData.access_token}` });
			//*stop loading functionality
			stopLoader();
			switch (response.code) {
				//case 200 save user data to have the new avatar link
				case 200:
					const newUserData = { ...userData };
					newUserData.avatar = response.body.defaultAvatar;
					AuthManager.storeUserData(newUserData);
					setUserData(() => newUserData);
					setInfoMessage("Avatar Is Removed Successfully");
					break;
				//invalid access token
				case 401: setErrorMessage("Invalid Access Token"); break;
				//un verified email case
				case 403:
					navigate('/verify-email', { state: { flashMessage: 'please verify your email to continue' } });
					break;
				//server error case
				case 500: setErrorMessage("Server Error! please contact support center"); break;
				//default case
				default: setErrorMessage("Something went wrong, please try again later"); break;
			}
		} catch (error) {
			console.log(error);
			setErrorMessage("Connection Error!");
		}
	}
	//#!SECTION

	//SECTION	Layout
	return (
		<>
			<form className="pt-3" onSubmit={(event) => removeAvatar(event)}>
				<h4>Remove Profile Image</h4>
				<h6>remove your profile picture</h6>
				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />
				<InfoMessageComponent message={infoMessage} />

				{/* submit button */}
				<div className="mt-3">
					<button type="submit" className="btn w-100 btn-dark" disabled={loadingState}>{ btnText }</button>
				</div>
			</form>
		</>
	);
	//#!SECTION
}