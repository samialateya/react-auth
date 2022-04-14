import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../StateManager/AppContext';
import { AuthManager } from '../StateManager/AuthManager';

// invalid token handler
export function useInvalidToken() {
	const [userData, setUserData] = useContext(GlobalContext);
	const navigate = useNavigate();

	return function invalidToken() {
		//clear user data from context and local storage
		AuthManager.clearUserData();
		setUserData(null);
		//redirect to the login page with flash message
		navigate('/login', { state: { flashMessage: 'your session has expired, login again' } });
	}
}

// un verified user handler
export function useUnVerifiedEmail() {
	const navigate = useNavigate();
	return function unVerifiedEmail() {
		//redirect to the login page with flash message
		navigate('/verify-email', { state: { flashMessage: 'please verify your email to continue' } });
	}
}