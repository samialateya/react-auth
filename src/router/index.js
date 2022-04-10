import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../Pages/Auth/Login/LoginPage";
import { RegisterPage } from "../Pages/Auth/Register/RegisterPage";
import { ResetPasswordPage } from "../Pages/Auth/ResetPassword/ResetPasswordPage";
import { HomePage } from "../Pages/Home/HomePage";

export function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="reset-password" element={<ResetPasswordPage />} />
			</Routes>
		</>
	)
}
