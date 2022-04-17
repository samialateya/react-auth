import { SessionHelper } from '../Helpers/SessionHelper.js';
/* --------------------------------------------------------------------------
	this class is used to manage user data stored in browser local Storage																		
-------------------------------------------------------------------------- */
export class AuthManager {
	
	//store user data to local storage
	static storeUserData(data) {
		(new SessionHelper("user_auth")).store(data);
		return true;
	}

	//fetch user data from the local storage
	static fetchUserData() {
		return (new SessionHelper("user_auth")).fetch(); 
	}

	//check if user is logged in
	static isLoggedIn() {
		return (new SessionHelper("user_auth")).check();
	}

	//clear user data from the state manager and local storage
	static clearUserData() {
		(new SessionHelper("user_auth")).remove();
	}
}