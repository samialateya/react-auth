import { useContext } from "react";
import { GlobalContext } from "../StateManager/AppContext";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------------------------- 
	 	Authentication Middleware used to prevent un authenticated users
		from accessing any protected routes.                                    
/* -------------------------------------------------------------------------- */
export function useAuthMiddleware(){
	//catch user data from global state
	const [userData] = useContext(GlobalContext);
	const navigate = useNavigate();
	//redirect to login page if user data is not exists in the global state
	const AuthMiddleware = () => {
		if(!userData){
			navigate("/login");
		}
	}
	return [AuthMiddleware, userData];
}


/* -------------------------------------------------------------------------- 
	Guest Middleware used to prevent authenticated users from accessing
	guests pages like login, register and forgot password pages.
	and redirect user to home page.	                                    
/* -------------------------------------------------------------------------- */
export function useGuestMiddleware(){
	//catch user data from global state
	const [userData] = useContext(GlobalContext);
	const navigate = useNavigate();
	//redirect to home page if user data is exists in the global state
	const GuestMiddleware = () => {
		if(userData){
			navigate("/");
		}
	}
	return [GuestMiddleware];
}