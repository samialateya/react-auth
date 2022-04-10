export function ErrorMessageComponent({message}) {
	return (
		<>
			{/* render alert message if the message is exists */ }
			{ (message?.length) ? <div className="alert alert-danger text-center p-1">{message}</div> : '' }
		</>
	)
}
