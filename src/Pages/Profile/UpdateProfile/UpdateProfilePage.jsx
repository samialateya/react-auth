import { useEffect } from "react";
import { NavbarComponent } from "../../../Components/NavbarComponent";
import { UpdateBasicInfoComponent } from "./UpdateBasicInfoComponent";
import { UpdateAvatarComponent } from "./UpdateAvatarComponent";
import { RemoveAvatarComponent } from "./RemoveAvatarComponent";
import { useAuthMiddleware } from "../../../Hooks/MiddlewareHooks";

export function UpdateProfilePage(){

	//ANCHOR use authentication middleware & catch user data from the hook
	const [authMiddleware, userData] = useAuthMiddleware();

	//ANCHOR on component mount
	useEffect(() => {
		//*Implement Authentication Middleware 
		authMiddleware();
	}, []);

	//#!SECTION	Scripts
	return(
		<>
			{/* ANCHOR Navbar */}
			<NavbarComponent />
			{/*SECTION profile page container */}
			<div className="container mt-4">
				<div className="row w-100 m-0 justify-center">
					<div className="col-sm-8 col-md-6 mx-auto">
						{/* form card */}
						<div className="card card-body">
							{/* ANCHOR update basic info */}
							<UpdateBasicInfoComponent userData={userData}/>
							<hr />
							{/*ANCHOR from to remove user avatar */}
							<UpdateAvatarComponent userData={userData} />
							<hr />
							{/*ANCHOR from to remove user avatar */}
							<RemoveAvatarComponent userData={userData}/>
							{/*#from remove user avatar */}
						</div>
					</div>
				</div>
			</div>
			{/* #!SECTION profile page container */}
		</>
	);
}