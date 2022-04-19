import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../StateManager/AppContext';
import { AuthManager } from '../Helpers/AuthManager';

//ANCHOR invalid token handler
export function useInvalidToken() {
	const [userData, setUserData] = useContext(GlobalContext);
	const navigate = useNavigate();

	return function invalidToken() {
		//clear user data from local storage
		AuthManager.clearUserData();
		//clear user data from context
		setUserData(null);
		//redirect to the login page with flash message
		navigate('/login', { state: { flashMessage: 'your session has expired, login again' } });
	}
}

//ANCHOR un verified user handler
export function useUnVerifiedEmail() {
	const navigate = useNavigate();
	return function unVerifiedEmail() {
		//redirect to the verify email page with flash message
		navigate('/verify-email', { state: { flashMessage: 'please verify your email to continue' } });
	}
}


/* ANCHOR Sync user data with browser local storage
 : this Hook is used to update user data in global context and in browser local storage as well */
export function useSyncUserData() {
	
	const [userData, setUserData] = useContext(GlobalContext);

	return function syncUserData(newUserData){
		//*update user data in browser local storage
		AuthManager.storeUserData(newUserData);
		//*update user data in global context
		setUserData(() => newUserData);
	}
}