import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useState } from 'react';
import scss from './NotificationHeader.module.scss';
import {
	useGetNotificationQuery,
	useGetNotificationTrueQuery,
	useGetViewNotificationQuery
} from '@/src/redux/api/instructor/notification';
import { useNavigate } from 'react-router-dom';
import notifications from '@/src/assets/icons/Group 1772.png';
import { IconDots } from '@tabler/icons-react';
import { Menu, MenuItem } from '@mui/material';
import { IconDelete } from '@/src/assets/icons';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,

	sx: {
		bgcolor: 'background.paper',
		padding: '0px'
	}
};

interface NotificationHeaderProps {
	open: boolean;
	handleClose: () => void;
}

const NotificationHeader: FC<NotificationHeaderProps> = ({
	open,
	handleClose
}) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openDrop = Boolean(anchorEl);

	const [isVewe, setIsVewe] = useState<boolean | number>(false);
	const { data } = useGetNotificationQuery();
	const { data: trueData } = useGetNotificationTrueQuery();

	const { data: notification } = useGetViewNotificationQuery(isVewe);
	console.log(notification);
	const role = localStorage.getItem('role');
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseDrop = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={() => {
					handleClose();
					handleCloseDrop();
				}}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box className={scss.main_modal_vid} sx={{ ...style }}>
					<div className={scss.header_modal}>
						<h1>ВАШИ УВЕДОМЛЕНИЯ</h1>
					</div>

					{data?.length === 0 ? (
						<div className={scss.notifications_div}>
							<img
								className={scss.img_notifications}
								src={notifications}
								alt=""
							/>
						</div>
					) : (
						<>
							<div className={scss.notifications}>
								<h2>НОВЫЕ</h2>

								<div className={scss.messages_content}>
									{data?.map((item) => (
										<div className={scss.results}>
											{item.isView === false && (
												<div
													onClick={() => {
														setIsVewe(item?.notificationId);
														{
															role === 'STUDENT'
																? setTimeout(() => {
																		navigate(
																			`/courses/${item.courseId}/materials/${item.lessonId}/lesson/${item.taskId}/send-task`
																		);
																	}, 100)
																: setTimeout(() => {
																		navigate(
																			`/instructor/course/${item.courseId}/materials/${item.lessonId}/lesson/${item.taskId}/answer/${item.answerTaskId}`
																		);
																	}, 100);
														}
														handleClose();
													}}
												>
													<h1>{item.notificationTitle}</h1>
													<p>{item.notificationDescription}</p>
													<p>{item.notificationSendDate}</p>
												</div>
											)}

											<div
												onClick={handleClick}
												style={{
													width: '100%',
													display: 'flex',
													justifyContent: 'flex-end'
												}}
											>
												<IconDots stroke={2} />
											</div>
											<Menu
												id="basic-menu"
												anchorEl={anchorEl}
												open={openDrop}
												onClose={handleCloseDrop}
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
														border: '1px solid #838caa',
														borderRadius: '10px',
														boxShadow: 'none',
														width: '150px'
													}
												}}
											>
												<MenuItem
													onClick={() => {
														handleCloseDrop();
													}}
													style={{
														display: 'flex',
														gap: '10px',
														fontSize: '18px',
														fontWeight: '600',
														alignItems: 'center'
													}}
												>
													<IconDelete />
													<p>Удалить</p>
												</MenuItem>
											</Menu>
										</div>
									))}
								</div>
							</div>
							<div className={scss.notifications}>
								<h2>Просмотренные</h2>

								<div className={scss.messages_content2}>
									{trueData?.map((item) => (
										<>
											<div className={scss.results2}>
												{item.isView === true && (
													<div>
														<h1>{item.notificationTitle}</h1>
														<p>{item.notificationDescription}</p>
														<p>{item.notificationSendDate}</p>
													</div>
												)}
												<div
													onClick={handleClick}
													style={{
														width: '100%',
														display: 'flex',
														justifyContent: 'flex-end'
													}}
												>
													<IconDots stroke={2} />
												</div>
												<Menu
													id="basic-menu"
													anchorEl={anchorEl}
													open={openDrop}
													onClose={handleCloseDrop}
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
															border: '1px solid #838caa',
															borderRadius: '10px',
															boxShadow: 'none',
															width: '150px'
														}
													}}
												>
													<MenuItem
														onClick={() => {
															handleCloseDrop();
														}}
														style={{
															display: 'flex',
															gap: '10px',
															fontSize: '18px',
															fontWeight: '600',
															alignItems: 'center'
														}}
													>
														<IconDelete />
														<p>Удалить</p>
													</MenuItem>
												</Menu>
											</div>
										</>
									))}
								</div>
							</div>
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default NotificationHeader;
