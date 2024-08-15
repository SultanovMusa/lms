import { IconAlignJustified, IconChevronDown } from '@tabler/icons-react';
import profile from '@/src/assets/svgs/Profile.png';
import scss from './SubHeaderMobile.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import bell from '@/src/assets/svgs/Header icons.png';
import vector from '@/src/assets/svgs/Vector.svg';
import ExitModal from '../customModal/exitModal/ExitModal';

const SupHeaderMobile = () => {
	const { pathname } = useLocation();
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [anchorElOpen, setAnchorElOpen] = useState<null | HTMLElement>(null);
	const [value, setValue] = useState<number>(0);
	console.log(value);
	const [openExit, setOpenExit] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);

	const handleCloseDrop = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (
			pathname === `/admin/courses/${courseId}/teacher` &&
			pathname === `/admin/courses/${courseId}/teacher`
		) {
			setValue(0);
		}
	}, [pathname]);
	useEffect(() => {
		if (
			pathname === `/instructor/course/${courseId}/materials` &&
			pathname === `/instructor/course/${courseId}/materials`
		) {
			setValue(0);
		}
	}, [pathname]);

	const openStudent = () => {
		navigate(`/admin/courses/${courseId}/student`);
	};
	const openTeacher = () => {
		navigate(`/admin/courses/${courseId}/teacher`);
	};
	const openMaterial = () => {
		navigate(`/instructor/course/${courseId}/materials`);
	};
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${courseId}/student`);
	};
	const openRatingStudent = () => {
		navigate(`/courses/${courseId}/rating`);
	};
	const openMaterialStudent = () => {
		navigate(`/courses/${courseId}/materials`);
	};

	const openel = Boolean(anchorElOpen);
	const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElOpen(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorElOpen(null);
	};

	return (
		<div className={scss.header}>
			{/* //! admin header для /admin/courses */}
			{pathname.startsWith(`/admin/courses/${courseId}`) && (
				<div className={scss.subHeaderCourses2}>
					<Button
						id="basic-button"
						aria-controls={openel ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openel ? 'true' : undefined}
						onClick={handleClickOpen}
					>
						<IconAlignJustified stroke={2} />
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorElOpen}
						open={openel}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem
							onClick={() => {
								openTeacher();
								handleClose();
							}}
						>
							Учителя
						</MenuItem>
						<MenuItem
							onClick={() => {
								openStudent();
								handleClose();
							}}
						>
							Студенты
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img src={profile} alt="Profile" />
						<div onClick={handleClick}>
							<p> Aдминистратор</p>
						</div>
						<div onClick={handleClick}>
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
							onClick={() => {
								setOpenExit(true);
								handleCloseDrop();
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
							<p>Выйти</p>
						</MenuItem>
					</Menu>
				</div>
			)}

			{/* //! ins */}
			{pathname.startsWith(`/instructor/course/${courseId}`) && (
				<div className={scss.subHeaderCourses}>
					<Button
						id="basic-button"
						aria-controls={openel ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openel ? 'true' : undefined}
						onClick={handleClickOpen}
					>
						<IconAlignJustified stroke={2} />
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorElOpen}
						open={openel}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem
							onClick={() => {
								openMaterial();
								handleClose();
							}}
						>
							Материалы
						</MenuItem>
						<MenuItem
							onClick={() => {
								openInstructorStudent();
								handleClose();
							}}
						>
							Студенты
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
							}}
						>
							Рейтинг студентов
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img src={bell} alt="bell" />
						<img src={profile} alt="Profile" />
						<div onClick={handleClick}>
							<p>Учитель</p>
						</div>
						<div onClick={handleClick}>
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
							onClick={() => {
								setOpenExit(true);
								handleCloseDrop();
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
							<p>Выйти</p>
						</MenuItem>
					</Menu>
				</div>
			)}
			{pathname.startsWith(`/courses/${courseId}`) && (
				<div className={scss.subHeaderCourses}>
					<Button
						id="basic-button"
						aria-controls={openel ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openel ? 'true' : undefined}
						onClick={handleClickOpen}
					>
						<IconAlignJustified stroke={2} />
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorElOpen}
						open={openel}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem
							onClick={() => {
								openMaterialStudent();
							}}
						>
							Материалы
						</MenuItem>

						<MenuItem
							onClick={() => {
								openRatingStudent();
							}}
						>
							Рейтинг студентов
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img src={bell} alt="bell" />
						<img src={profile} alt="Profile" />
						<div onClick={handleClick}>
							<p>Студент</p>
						</div>
						<div onClick={handleClick}>
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
							onClick={() => {
								setOpenExit(true);
								handleCloseDrop();
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
							<p>Выйти</p>
						</MenuItem>
					</Menu>
				</div>
			)}

			<ExitModal openExit={openExit} handleClose={() => setOpenExit(false)} />
		</div>
	);
};
export default SupHeaderMobile;
