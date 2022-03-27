import { useState } from 'react';
export function FormComponent({	setErrorMessage, setInfoMessage }) {
	//SECTION	Scripts
	
	//ANCHOR login
	async function login(e){
		//prevent default submitting behavior
		e.preventDefault();
		//*start loading functionality
		startLoader();
		setErrorMessage("message");
		//*stop loading functionality
		stopLoader();
	}

	//ANCHOR start loader
	function startLoader(){
		setBtnText('loading...');
		setLoadingState(true);
	}
	//ANCHOR stop loader
	function stopLoader() {
		setBtnText('SIGN IN');
		setLoadingState(false);
	}
	
	//ANCHOR local component state
	const [btnText, setBtnText] = useState('SIGN IN');
	const [loadingState, setLoadingState] = useState(false);
	
	//#!SECTION
	return (
		<>
			{/* #SECTION Form */}
			<form className="pt-3" onSubmit={(event) => login(event)}>
				{/* #ANCHOR email  */}
				<div className="pb-2">
					<input type="email" name="email" placeholder="Email" className="form-control form-control-lg" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="Invalid email address" autoComplete="email" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR password  */}
				<div className="pb-2">
					<input type="password" name="password" placeholder="Password" autoComplete="current-password" className="form-control form-control-lg" required minLength="6" />
					<span className="text-danger mt-1 d-inline-block"></span>
				</div>
				{/* #ANCHOR submit button */}
				<div className="pb-2">
					<button type="submit" className="btn btn-block btn-dark" disabled={loadingState}>{btnText}</button>
				</div>
			</form>
			{/* #!SECTION Form */}
		</>
	)
}
