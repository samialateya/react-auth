import { SessionHelper } from '../Helpers/SessionHelper.js';
/* --------------------------------------------------------------------------
	this class is used to manage user auth data on the sate manager
	and sync them with local storage data																			
-------------------------------------------------------------------------- */
export class AuthManager {
	//sync data from local storage and save it to the state manager
	static syncUserData() {
		const userSession = new SessionHelper("user_auth");
		//?abort if no data found in local storage
		if (!userSession.check()) { return false; }
		//?else return user data from local storage
		return userSession.fetch();
	}

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