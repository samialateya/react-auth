import { useGoogleLogin } from 'react-google-login';
import { APIHelper } from '../../../Helpers/APIHelper';
import PropTypes from 'prop-types';
import LoaderComponent from '../../../Components/Loader/LoaderComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSyncUserData } from '../../../Hooks/AuthHooks';

const CLIENT_ID = "308672257396-30h903etf2pjd73ulblcg8ri5c875hfq.apps.googleusercontent.com";

export function GoogleLoginComponent({ setErrorMessage}) {

	//SECTION Scripts

	//ANCHOR Local component state
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR use navigation hook
	const navigate = useNavigate();

	//ANCHOR use sync user data hook
	const syncUserData = useSyncUserData();

	//ANCHOR Google Login Success Handler
	const successHandler = async (response) => {
		//*clear previous flash and error messages
		setErrorMessage('');
		//*prepare user data to send to server
		const userData = {
			name: response.profileObj.name,
			email: response.profileObj.email, 
			avatar: response.profileObj.imageUrl,
			id_token: response.tokenId,
		};
		//*verify user data in the server and logged user in
		verifyIDToken(userData);
	}

	//ANCHOR Verify ID Token on the server
	async function verifyIDToken(userData){
		//*start loading functionality
		setLoadingState(true);
		try {
			const response = await (new APIHelper()).post('/user/google-login', JSON.stringify(userData), {'Content-Type': 'application/json'});
			setLoadingState(false);
			switch(response.code){
				//case 200 save user data to the state manager and redirect to the home page
				case 200:
					//*update user data in the state manager and browser local storage
					syncUserData(response.body.data);
					//*redirect to the home page
					navigate('/');
					break;
				default:
					setErrorMessage("something went wrong! please try again later");
			}
		} catch (error) {
			console.log(error);
			setLoadingState(false);
			setErrorMessage("Connection Error!");
		}
	}

	//ANCHOR Google Login Error Handler
	const failureHandler = () => {
		setErrorMessage("Something went wrong please try again");
	}

	//ANCHOR use Google Login Hook
	const { signIn } = useGoogleLogin({
		onSuccess : successHandler,
		onFailure : failureHandler,
		clientId : CLIENT_ID,
		isSignedIn: false,
		accessType: 'offline',
		// responseType: 'code',
		// prompt: 'consent',
	});

	//#!SECTION script

	//SECTION Render
	return (
		<>
			{(loadingState) ? <LoaderComponent /> : ''}
			<button onClick={signIn} className="btn btn-danger">Google</button>
		</>
	)
	//#!SECTION render
}

//ANCHOR setup the prop types for the component
GoogleLoginComponent.propTypes = {
	setErrorMessage: PropTypes.func.isRequired,
}
