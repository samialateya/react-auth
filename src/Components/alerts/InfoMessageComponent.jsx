export function InfoMessageComponent({ message }) {
	return (
		<>
			{/* render alert message if the message is exists */}
			{message?.length ? <div className="alert alert-info text-center p-1">{message}</div> : ''}
		</>
	)
}
