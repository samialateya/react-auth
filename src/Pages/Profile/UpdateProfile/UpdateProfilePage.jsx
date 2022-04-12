import { useContext } from "react";
import { GlobalContext } from "../../../StateManager/AppContext";
import { NavbarComponent } from "../../../Components/NavbarComponent";
import { UpdateBasicInfoComponent } from "./UpdateBasicInfoComponent";
import { UpdateAvatarComponent } from "./UpdateAvatarComponent";
import { RemoveAvatarComponent } from "./RemoveAvatarComponent";

export function UpdateProfilePage(){
	//SECTION	Scripts
	//ANCHOR Global State
	const [userData, setUserData] = useContext(GlobalContext);
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
							<UpdateBasicInfoComponent userData={userData} setUserData={setUserData}/>
							<hr />
							{/*ANCHOR from to remove user avatar */}
							<UpdateAvatarComponent userData={userData} setUserData={setUserData} />
							<hr />
							{/*ANCHOR from to remove user avatar */}
							<RemoveAvatarComponent userData={userData} setUserData={setUserData}/>
							{/*#from remove user avatar */}
						</div>
					</div>
				</div>
			</div>
			{/* #!SECTION profile page container */}
		</>
	);
}