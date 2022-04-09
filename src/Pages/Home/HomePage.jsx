import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../Components/NavbarComponent";
import { useState, useEffect } from "react";
import { AuthManager } from "../../StateManager/AuthManager";
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
			<div>HomePage</div>
			<Link to="/login">login</Link>
		</>
	)
}
