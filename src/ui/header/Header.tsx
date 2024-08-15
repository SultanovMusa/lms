import { links } from '@/src/utils/routes';
import scss from './Header.module.scss';
import { FC, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import peaksoft from '@/src/assets/header-logo.png';
import peaksoft2 from '@/src/assets/pealsoft.jpg';
import { IconAlignLeft } from '@tabler/icons-react';

interface LayoutProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const Header: FC<LayoutProps> = ({ isOpen, setIsOpen }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (pathname === '/') {
			navigate('/courses');
		}
		if (pathname === '/admin') {
			navigate('/admin/analytics');
		}
		if (pathname === '/instructor') {
			navigate('/instructor/course');
		}
	}, [pathname]);

	const handleNavigate = () => {
		if (pathname.startsWith(`/admin`)) {
			navigate(`/admin/analytics`);
		} else if (pathname.startsWith(`/instructor`)) {
			navigate(`/instructor/course`);
		} else if (
			pathname.startsWith(`/courses`) ||
			pathname === `/announcements`
		) {
			navigate(`/courses`);
		}
	};

	return (
		<header
			className={isOpen ? `${scss.SaidBar} ${scss.active}` : `${scss.SaidBar}`}
		>
			<div className={scss.top}>
				<div className={scss.logo}>
					<i className="bx bxl-codepen"></i>
					<span>CodeCommerse</span>
				</div>
				<button
					style={{
						background: 'none',
						border: 'none',
						paddingLeft: '10px'
					}}
					onClick={() => {
						localStorage.setItem('isOpenNavBar', String(!isOpen));
						setIsOpen(!isOpen);
					}}
				>
					<IconAlignLeft style={{ cursor: 'pointer' }} stroke={2} />
				</button>
				<ul>
					<div className={scss.peaksoft_img} onClick={handleNavigate}>
						<img
							className={
								isOpen
									? `${scss.peaksoft1_url}`
									: `${scss.peaksoft1_url} ${scss.active}`
							}
							src={peaksoft}
							alt=""
						/>
						<img
							className={
								!isOpen
									? `${scss.peaksoft2_url} `
									: `${scss.peaksoft2_url} ${scss.active} `
							}
							src={peaksoft2}
							alt=""
						/>
					</div>
					{/* //! admin */}
					{pathname.startsWith('/admin') && (
						<>
							{links.admin.map((item, index) => (
								<li key={index + 1}>
									<Link
										to={`/admin/${item.link!}`}
										className={
											pathname === `/admin/${item.link!}` ||
											pathname.startsWith(`/admin/${item.link!}`)
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span
											className={
												!isOpen
													? `${scss.label} ${scss.active}`
													: `${scss.label}`
											}
										>
											{item.name}
										</span>
									</Link>
									{!isOpen && <span className={scss.tooltip}>{item.name}</span>}
								</li>
							))}
						</>
					)}

					{/* //! student */}
					{!pathname.startsWith('/admin') ===
						!pathname.startsWith('/instructor') && (
						<>
							{pathname.startsWith('/') && (
								<>
									{links.student.map((item, index) => (
										<li key={index + 1}>
											<Link
												to={`/${item.link!}`}
												className={
													pathname === `/${item.link!}` ||
													pathname.startsWith(`/${item.link!}`)
														? `${scss.nav_item} ${scss.active}`
														: `${scss.nav_item}`
												}
											>
												<span className={scss.icon}>{item.icon}</span>
												<span
													className={
														!isOpen
															? `${scss.label} ${scss.active}`
															: `${scss.label}`
													}
												>
													{item.name}
												</span>
											</Link>
											{!isOpen && (
												<span className={scss.tooltip}>{item.name}</span>
											)}
										</li>
									))}
								</>
							)}
						</>
					)}

					{/* //! instructor */}
					{pathname.startsWith('/instructor') && (
						<div>
							{links.instructor.map((item, index) => (
								<li key={index + 1}>
									<Link
										to={`/instructor/${item.link!}`}
										className={
											pathname === `/instructor/${item.link!}` ||
											pathname.startsWith(`/instructor/${item.link!}`)
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span
											className={
												!isOpen
													? `${scss.label} ${scss.active}`
													: `${scss.label}`
											}
										>
											{item.name}
										</span>
									</Link>
									{!isOpen && <span className={scss.tooltip}>{item.name}</span>}
								</li>
							))}
						</div>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;
