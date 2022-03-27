import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../Pages/Auth/Login/LoginPage"
import { HomePage } from "../Pages/Home/HomePage"

export function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="login" element={<LoginPage />} />
			</Routes>
		</>
	)
}
