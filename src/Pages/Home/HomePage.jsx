import { NavbarComponent } from "../../Components/NavbarComponent";
import { useEffect } from "react";
import { FeaturesComponent } from "./FeaturesComponent";
import { useAuthMiddleware } from "../../Hooks/MiddlewareHooks";
export function HomePage() {
	//ANCHOR use authentication middleware
	const [authMiddleware] = useAuthMiddleware();

	//ANCHOR on component mount
	useEffect(()=>{
		//*Implement Authentication Middleware 
		authMiddleware();
	},[]);
	return (
		<>
			<NavbarComponent></NavbarComponent>
			<FeaturesComponent></FeaturesComponent>
		</>
	)
}
