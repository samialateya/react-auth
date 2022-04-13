import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../Pages/Auth/Login/LoginPage";
import { RegisterPage } from "../Pages/Auth/Register/RegisterPage";
import { ResetPasswordPage } from "../Pages/Auth/ResetPassword/ResetPasswordPage";
import { VerifyEmailPage } from "../Pages/Auth/VerifyEmail/VerifyEmailPage";
import { HomePage } from "../Pages/Home/HomePage";
import { ProfilePage } from "../Pages/Profile/ProfilePage";
import { UpdateProfilePage } from "../Pages/Profile/UpdateProfile/UpdateProfilePage";

export function Router() {
	return (
		<>
			<Routes>
				<Route path="*" element={<HomePage />} />
				<Route path="/" element={<HomePage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="reset-password" element={<ResetPasswordPage />} />
				<Route path="verify-email" element={<VerifyEmailPage />} />
				<Route path="profile">
					<Route index element={<ProfilePage />} />
					<Route path="update" element={<UpdateProfilePage />} />
				</Route>
			</Routes>
		</>
	)
}
