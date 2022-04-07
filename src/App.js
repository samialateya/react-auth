
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { useEffect, useContext } from 'react';
import { AuthManager } from './StateManager/AuthManager.js';
import { GlobalContext } from './StateManager/AppContext';

function App() {
	//*sync user data from local storage to the state manager on app load
	//#this is done to avoid the user data to be lost when the user refreshes the page
	const [userData, setUserData] = useContext(GlobalContext);
	useEffect(() => {
		//if user data is not found in the state manager
		if(!userData){
			setUserData(() => AuthManager.fetchUserData());
		}
	}, []);
  return (
		<BrowserRouter >
			<Router />
		</BrowserRouter>
  );
}

export default App;
