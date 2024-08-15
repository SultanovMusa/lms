import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAuth.module.scss';
import Login from './login/Login';
import NewPassword from './newPassword/NewPassword';
const LayoutAuth = () => {
	return (
		<>
			<div className={scss.Layout}>
				<main>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/newPassword/:uuid" element={<NewPassword />} />
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutAuth;
