import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"

import { APIHelper } from '../../../Helpers/APIHelper.js';
import { GlobalContext } from '../../../StateManager/AppContext.js';
import { useSyncUserData } from '../../../Hooks/AuthHooks.js';

export function LogoutComponent() {
	//SECTION	Scripts
	let navigate = useNavigate();
	//ANCHOR catch user data from global state
	const [userData] = useContext(GlobalContext);

	//ANCHOR local component state
	const [loadingState, setLoadingState] = useState(false);

	//ANCHOR use sync user data hook
	const syncUserData = useSyncUserData();

	//ANCHOR process logout functionally
	async function logout() {
		//start loader
		setLoadingState(true);
		//send ajax request to the server
		await (new APIHelper()).post('user/logout', {}, {'Authorization': `Bearer ${userData?.access_token}`});
		//clear user data from the state manager and local storage
		syncUserData(null);
		//redirect to the login page
		navigate('/login');
	}

	//#!SECTION Scripts
	return (
		<>
			<button className="btn btn-dark" type="submit" disabled={loadingState} onClick={() => logout()}>
				Logout
			</button>
		</>
	)
}
