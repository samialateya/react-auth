import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSyncUserData } from '../../../Hooks/AuthHooks';
import { APIHelper } from '../../../Helpers/APIHelper';
import PropTypes from 'prop-types';
import LoaderComponent from '../../../Components/Loader/LoaderComponent';

export function FacebookLoginComponent({ setErrorMessage }) {

	//SECTION Scripts

	//ANCHOR Local component state
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR use navigation hook
	const navigate = useNavigate();

	//ANCHOR use sync user data hook
	const syncUserData = useSyncUserData();

	//ANCHOR handle facebook login
	const responseFacebook = (response) => {
		//?print error message when error is encountered
		if (!response.accessToken) {
			setErrorMessage(response.error);
			return;
		}
		//*prepare user data
		const userData = {
			access_token: response.accessToken,
			email: response.email,
			name: response.name,
			avatar: response.picture.data.url,
		}
		//*verify user data in the server and logged user in
		verifyIDToken(userData);
	}

	//ANCHOR Verify ID Token on the server
	async function verifyIDToken(userData) {
		//*start loading functionality
		setLoadingState(true);
		try {
			const response = await (new APIHelper()).post('/user/facebook-login', JSON.stringify(userData), { 'Content-Type': 'application/json' });
			setLoadingState(false);
			switch (response.code) {
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
			setLoadingState(false);
			setErrorMessage("Connection Error!");
		}
	}

	//#!SECTION Scripts

	//SECTION Render
	return (
		<>
			{(loadingState) ? <LoaderComponent /> : ''}
			{/* ANCHOR facebook button */}
			<FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_APP_ID}
				autoLoad={false}
				fields="name,email,picture"
				callback={responseFacebook}
				render={renderProps => (
					// ANCHOR facebook button design
					<button onClick={renderProps.onClick} className="btn btn-primary">Facebook</button>
				)}
			/>
		</>
	)
	//#!SECTION Render
}

//ANCHOR setup the prop types for the component
FacebookLoginComponent.propTypes = {
	setErrorMessage: PropTypes.func.isRequired,
}
