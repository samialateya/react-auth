import { Link } from 'react-router-dom';
export function FooterComponent() {
	return (
		<>
			{/* #SECTION Form Footer */}
			{/* ANCHOR Register */}
			<div className="text-center font-weight-light">
				Don't have an account? 
				<Link to="/register" className="text-primary">Create</Link>
			</div>
			{/* #!SECTION Form Footer */}
		</>
	)
}
