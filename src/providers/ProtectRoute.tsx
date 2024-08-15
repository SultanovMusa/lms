import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
	children: ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
	const navigate = useNavigate();
	const role = localStorage.getItem('role');
	const { pathname } = useLocation();

	useEffect(() => {
		if (!pathname.startsWith('/auth/newPassword')) {
			// Добавляем условие для страницы сброса пароля
			if (role === 'ADMIN') {
				navigate(`/admin/analytics`);
			} else if (role === 'INSTRUCTOR') {
				navigate(`/instructor/course/`);
			} else if (role === 'STUDENT') {
				navigate(`/`);
			} else if (role === null) {
				navigate(`/auth/login`);
			} else if (
				role === 'ADMIN' ||
				pathname.startsWith(`/instructor/course`)
			) {
				navigate('/admin/analytics');
			}
		}
	}, [role, pathname, navigate]);

	return children;
};

export default ProtectedRoute;
