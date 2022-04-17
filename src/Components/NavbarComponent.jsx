import { Link } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from '../StateManager/AppContext.js';
import { LogoutComponent } from '../Pages/Auth/Logout/LogoutComponent.jsx';

export function NavbarComponent() {
	//catch user data from global state
	const [userData] = useContext(GlobalContext);
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			{/*ANCHOR navabr container */}
			<div className="container-fluid">
				{/*ANCHOR logo */}
				<Link to="/" className="navbar-brand">Navbar</Link>
				{/*ANCHOR collapse button for mobile view */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				{/*SECTION navbar links */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link active" aria-current="page">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/profile" className="nav-link">Profile</Link>
						</li>
					</ul>
					{/*ANCHOR right menu link */}
					<Link to="/profile">
						<img className="nav-avatar" src={userData?.avatar} alt='avatar' />
					</Link>
					<Link to="/profile" style={{ textDecoration:'none !important'}}>
						<span className="text-muted mx-3 mt-2 h5">{ userData?.name}</span>
					</Link>

					<LogoutComponent />
				</div>
				{/* #!SECTION navbar link */}
			</div>
		</nav>
	)
}