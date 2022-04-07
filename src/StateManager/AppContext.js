import { createContext } from "react";
import { useState } from "react";
import App from '../App.js';

export const GlobalContext = createContext();

export const GlobalProvider = () => {
	//instantiate state manager
	const [userData, setUserData] = useState();
	return (
		<GlobalContext.Provider value={[userData, setUserData]}>
			<App />
		</GlobalContext.Provider>
	)
};