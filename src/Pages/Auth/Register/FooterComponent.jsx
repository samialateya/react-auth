import { Link } from "react-router-dom";

export function FooterComponent() {
	return (
		<>
			{/* #SECTION Form Footer */}
			<div className="my-2 d-flex justify-content-between align-items-center">
				{/*ANCHOR remember me */}
				<div className="form-check">
					<label className="text-muted">
						<input type="checkbox" className="form-check-input" name="remember" />
						Keep me signed in
					</label>
				</div>
			</div>
			{/* ANCHOR Register */}
			<div className="text-center font-weight-light">
				already have an account?
				<Link to="/login" className="text-primary">Login</Link>
			</div>
			{/* #!SECTION Form Footer */}
		</>
	)
}
