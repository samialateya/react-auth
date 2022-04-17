import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavbarComponent } from '../../Components/NavbarComponent';
import { useAuthMiddleware } from '../../Hooks/MiddlewareHooks.js';
export function ProfilePage() {

	//ANCHOR use authentication middleware & catch user data from the hook
	const [authMiddleware, userData] = useAuthMiddleware();

	//ANCHOR on component mount
	useEffect(() => {
		//*Implement Authentication Middleware 
		authMiddleware();
	}, []);
	
	return (
		<>
			{/* ANCHOR Navbar */}
			<NavbarComponent />
			<div className="container mt-4">
				<div className="w-100 row justify-content-center">
					{/* profile card */}
					<div className="card col-sm-8 col-md-6 col-lg-4 mx-auto">
						{/* avatar */}
						<img src={userData?.avatar} className="card-img-top" alt="avatar" />
						{/* card body */}
						<div className="card-body">
							<h5 className="card-title">{userData?.name}</h5>
							<h6 className="card-title">{userData?.email}</h6>
							<Link to="/profile/update" className="btn btn-primary">Update profile</Link>
						</div>
						{/* #card body */}
					</div>
					{/* #profile card */}
				</div>
			</div>
		</>
	)
}
