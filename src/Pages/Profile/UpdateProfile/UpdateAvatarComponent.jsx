import { ErrorMessageComponent } from "../../../Components/alerts/ErrorMessageComponent";
import { InfoMessageComponent } from "../../../Components/alerts/InfoMessageComponent";
import { useState } from 'react';
import { APIHelper } from "../../../Helpers/APIHelper";
import { useInvalidToken, useUnVerifiedEmail } from "../../../Hooks/AuthHooks";
import { useSyncUserData } from "../../../Hooks/AuthHooks";

export function UpdateAvatarComponent({ userData }) {
	//SECTION	Scripts

	//ANCHOR component state
	const [errorMessage, setErrorMessage] = useState('');
	const [infoMessage, setInfoMessage] = useState('');
	const [btnText, setBtnText] = useState('Update Avatar');
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR auth hooks
	const invalidToken = useInvalidToken();
	const unVerifiedEmail = useUnVerifiedEmail();

	//ANCHOR use sync user data hook
	const syncUserData = useSyncUserData();

	//ANCHOR start loader
	function startLoader() {
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('Update Avatar');
		setLoadingState(false);
	}

	//ANCHOR Update Avatar
	async function updateAvatar(e) {
		//prevent default submitting behavior
		e.preventDefault();

		//clear previous flash and error messages
		setErrorMessage('');
		setInfoMessage('');

		//*start loading functionality
		startLoader();

		//*send ajax request to the server
		try {
			const response = await (new APIHelper()).post('/user/profile/update/change-avatar', new FormData(e.target), { 'Authorization': `Bearer ${userData.access_token}` });
			//*stop loading functionality
			stopLoader();
			switch (response.code) {
				//case 200 save user data to have the new avatar link
				case 200:
					const newUserData = { ...userData };
					newUserData.avatar = response.body.avatar;
					//*update user data in the state manager and browser local storage
					syncUserData(newUserData);
					//* print success message
					setInfoMessage("Avatar Is Updated Successfully");
					break;
				//invalid image
				case 422: setErrorMessage("Invalid Image"); break;
				//invalid access token
				case 401: invalidToken(); break;
				//un verified email case
				case 403: unVerifiedEmail(); break;
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
			<form className="pt-3" onSubmit={(event) => updateAvatar(event)} encType="multipart/form-data">
				<h4>Update Profile Image</h4>
				<h6>update your profile picture</h6>
				{/* #ANCHOR reporting elements */}
				<ErrorMessageComponent message={errorMessage} />
				<InfoMessageComponent message={infoMessage} />
				{/* image input */}
				<div className="pb-2">
					<input type="file" name="image" placeholder="Select new profile image" className="form-control form-control-lg" required />
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