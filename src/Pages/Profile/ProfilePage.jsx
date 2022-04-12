import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../StateManager/AppContext.js';
import { NavbarComponent } from '../../Components/NavbarComponent';
import { AuthManager } from '../../StateManager/AuthManager.js';
export function ProfilePage() {
	//catch user data from global state
	const [userData, setUserData] = useContext(GlobalContext);
	//redirect to login page if user is not logged in
	const navigate = useNavigate();
	useEffect(() => {
		if (!AuthManager.isLoggedIn()) {
			navigate('/login');
		}
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
						<img src={userData?.avatar} className="card-img-top" alt="avatar"/>
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
