import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../Components/NavbarComponent";
import { useState, useEffect } from "react";
import { AuthManager } from "../../StateManager/AuthManager";
import { FeaturesComponent } from "./FeaturesComponent";
export function HomePage() {
	//redirect to login page if user is not logged in
	const navigate = useNavigate();
	useEffect(()=>{
		if(!AuthManager.isLoggedIn()){
			navigate('/login');
		}
	},[])
	return (
		<>
			<NavbarComponent></NavbarComponent>
			<FeaturesComponent></FeaturesComponent>
		</>
	)
}
