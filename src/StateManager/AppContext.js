import { createContext } from "react";
import { useState } from "react";
import App from '../App.js';
import { AuthManager } from "../Helpers/AuthManager";

export const GlobalContext = createContext();

export const GlobalProvider = () => {
	//instantiate state manager
	const [userData, setUserData] = useState(()=>{
		//set the default data to be the user data from local storage
		return AuthManager.fetchUserData();
	});
	return (
		<GlobalContext.Provider value={[userData, setUserData]}>
			<App />
		</GlobalContext.Provider>
	)
};