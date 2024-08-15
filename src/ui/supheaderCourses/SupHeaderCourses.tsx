import { useLocation } from 'react-router-dom';
import profile from '@/src/assets/svgs/Profile.png';
import scss from './SupHeaderCourses.module.scss';
import { IconChevronDown } from '@tabler/icons-react';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import vector from '@/src/assets/svgs/Vector.svg';
import bell from '@/src/assets/svgs/Header icons.png';
import NotificationHeader from '../customModal/notificationHeader/NotificationHeader';
import ExitModal from '../customModal/exitModal/ExitModal';

const SupHeaderCourses = () => {
	const { pathname } = useLocation();
	const [openNotification, setOpenNotification] = useState(false);
	const handleOpenNotification = () => {
		setOpenNotification(true);
	};
	const [openExit, setOpenExit] = useState(false);

	const handleCloseNotification = () => {
		setOpenNotification(false);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={scss.all_header}>
			{pathname.startsWith('/admin') && (
				<>
					<div className={scss.courses_admin} onClick={handleClick}>
						<img className={scss.profile} src={profile} alt="Profile" />
						<p>Администратор</p>
						<IconChevronDown stroke={2} />
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: '#dde9f9',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={() => {
								setOpenExit(true);
								handleClose();
							}}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			{/* //! учитель */}
			{pathname.startsWith('/instructor') && (
				<>
					<div className={scss.courses_admin}>
						<div className={scss.bell} onClick={handleOpenNotification}>
							<img src={bell} alt="bell" />
						</div>
						<img onClick={handleClick} src={profile} alt="Profile" />
						<p onClick={handleClick}>Учитель</p>
						<div className={scss.icon} onClick={handleClick}>
							<IconChevronDown stroke={2} />
						</div>
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: '#dde9f9',
								borderRadius: '10px',
								paddingBottom:"20px"
							}
						}}
					>
						<MenuItem
							onClick={() => {
								setOpenExit(true);
								handleClose();
							}}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			{/* //! student */}
			{pathname.startsWith('/courses') && (
				<>
					<div className={scss.courses_admin}>
						<img
							onClick={handleOpenNotification}
							className={scss.bell}
							src={bell}
							alt="bell"
						/>
						<img
							onClick={handleClick}
							className={scss.profile}
							src={profile}
							alt="Profile"
						/>
						<p onClick={handleClick} style={{ cursor: 'pointer' }}>
							Студент
						</p>
						<div
							onClick={handleClick}
							style={{ background: 'none ', border: 'none' }}
						>
							<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
						</div>
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: '#dde9f9',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={() => setOpenExit(true)}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			{pathname.startsWith('/calendar') && (
				<>
					<div className={scss.courses_admin}>
						<img onClick={handleOpenNotification} src={bell} alt="bell" />
						<img onClick={handleClick} src={profile} alt="Profile" />
						<p onClick={handleClick}>Студент</p>
						<IconChevronDown stroke={2} />
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: '#dde9f9',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={() => {
								setOpenExit(true);
								handleClose();
							}}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			{pathname.startsWith('/announcements') && (
				<>
					<div className={scss.courses_admin}>
						<img onClick={handleOpenNotification} src={bell} alt="bell" />
						<img onClick={handleClick} src={profile} alt="Profile" />
						<p onClick={handleClick}>Студент</p>
						<IconChevronDown stroke={2} />
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: '#dde9f9',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={() => {
								setOpenExit(true);
								handleClose();
							}}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			<NotificationHeader
				open={openNotification}
				handleClose={handleCloseNotification}
			/>
			<ExitModal openExit={openExit} handleClose={() => setOpenExit(false)} />
		</div>
	);
};

export default SupHeaderCourses;
