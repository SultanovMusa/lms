import React, { useState } from 'react';
import scss from './Announcements.module.scss';
import {
	Button,
	Menu,
	MenuItem,
	Pagination,
	Stack,
	Tooltip
} from '@mui/material';
import {
	useGetAnnouncementTableQuery,
	useShowAnnouncementMutation
} from '@/src/redux/api/admin/announcement';
import AnnouncementForm from '@/src/ui/announcementForm/AnnouncementForm';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import DotsHorizont from '@/src/assets/icon-Dots-Horizont';
import ModalEditAnnouncement from '@/src/ui/customModal/ModalEditAnnouncement';
import DeleteAnnouncementModal from '@/src/ui/customModal/deleteModal/DeleteAnnouncementModal';
import {
	IconArticle,
	IconBook,
	IconEye,
	IconEyeOff,
	IconPlus
} from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Announcements = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openAnnouncement, setOpenAnnouncement] = useState<boolean>(false);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(4);
	const [showAnnouncement] = useShowAnnouncementMutation();
	const [testId, setTestId] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('pageInstructor', valueString);
		setSearchParams(searchParams);
		navigate(`/instructor/announcement?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('sizeInstructor', valueString);
		setSearchParams(searchParams);
		navigate(`/instructor/announcement?${searchParams.toString()}`);
	};
	const { data } = useGetAnnouncementTableQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});
	const handleOpenAnnouncement = () => {
		setOpenAnnouncement(true);
	};
	const handleCloseAnnouncement = () => {
		setOpenAnnouncement(false);
	};

	const find = data?.objects?.find((item) => item.id === deleteById);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};
	const handleShow = async () => {
		const test = data?.objects.find((item) =>
			item.id === testId ? item.isPublished : null
		);
		if (test) {
			const isPublished = false;
			const res = await showAnnouncement({ testId, isPublished });
			if (res.data?.httpStatus === 'OK') {
				setAnchorEl(null);
			}
		} else {
			const isPublished = true;
			const res = await showAnnouncement({ testId, isPublished });
			if (res.data?.httpStatus === 'OK') {
				setAnchorEl(null);
			}
		}
	};
	return (
		<div className={scss.Section_announcement}>
			<div className={scss.main_container}>
				<div>
					<div className={scss.add_button_name}>
						<div className={scss.course_button_modal}>
							<Button
								size="large"
								className={scss.button}
								onClick={handleOpenAnnouncement}
								variant="contained"
							>
								<div className={scss.icon}>
									<IconPlus stroke={2} />
								</div>
								<span>Добавить обьявление</span>
							</Button>
						</div>
						<div className={scss.title}>
							<h1>Объявление</h1>
						</div>
					</div>
					<div>
						<div className={scss.announce_box}>
							<div className={scss.announce_card}>
								{data?.objects.map((item) => (
									<li key={item.id} className={scss.announce_list}>
										<div>
											{item?.isPublished ? (
												<p style={{ color: '#0ECE22 ', fontSize: '16px' }}>
													Видно
												</p>
											) : (
												<p style={{ color: 'red' }}>Не видно</p>
											)}
										</div>
										<div className={scss.announcement_owners}>
											<p className={scss.announce_groupsss}>
												<span className={scss.announce_groups}>Для кого:</span>
												{item.groupNames.join(' / ')}
											</p>
											<p className={scss.announcement_owner}>
												<span className={scss.announc_user}>Кем создан:</span>
												{item.owner}
											</p>
										</div>
										<p className={scss.announce_contents}>
											<span className={scss.announce_content}>Текст:</span>
											<Tooltip title={item.content}>
												<p
													style={{
														width: '100%',
														maxWidth: '250px',
														textOverflow: 'ellipsis',
														overflow: 'hidden',
														whiteSpace: 'nowrap',
														cursor: 'pointer'
													}}
												>
													{item.content}
												</p>
											</Tooltip>
										</p>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '50px'
											}}
										>
											<div className={scss.cont_date}>
												<p className={scss.announcement_publishDate}>
													{item.publishDate} / {item.endDate}
												</p>
												<button
													className={scss.button}
													aria-controls={open ? 'basic-menu' : undefined}
													aria-haspopup="true"
													onClick={(e) => {
														handleClick(e);
														setDeleteById(item.id);
														setTestId(item.id);
													}}
												>
													<DotsHorizont />
												</button>
											</div>
										</div>
										<Menu
											id="basic-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{ 'aria-labelledby': 'basic-button' }}
											elevation={0}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right'
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
											PaperProps={{
												style: {
													boxShadow: 'none',
													border: '1px solid gray'
												}
											}}
										>
											<MenuItem
												style={{ display: 'flex', gap: '20px' }}
												onClick={() => {
													setOpenModalEdit(true);
													setAnchorEl(null);
												}}
											>
												<img src={editIcon} alt="Edit" />
												<p>Редактировать</p>
											</MenuItem>
											<MenuItem
												style={{ display: 'flex', gap: '20px' }}
												onClick={() => {
													handleShow();
												}}
											>
												{find?.isPublished === true ? (
													<>
														<IconEyeOff stroke={2} />
														<p>Не показывать</p>
													</>
												) : (
													<>
														<IconEye stroke={2} />
														<p>Показывать</p>
													</>
												)}
											</MenuItem>
											<MenuItem
												style={{ display: 'flex', gap: '20px' }}
												onClick={() => {
													setOpenModalDelete(true);
													setAnchorEl(null);
												}}
											>
												<img src={deleteIcon} alt="Delete" />
												<p>Удалить</p>
											</MenuItem>
										</Menu>
									</li>
								))}
							</div>
							<ModalEditAnnouncement
								openModalEdit={openModalEdit}
								closeModalEdit={() => setOpenModalEdit(false)}
								saveIdElement={deleteById}
							/>
							<DeleteAnnouncementModal
								openModalDelete={openModalDelete}
								closeModalDelete={() => setOpenModalDelete(false)}
								saveIdElement={deleteById}
							/>
							<AnnouncementForm
								open={openAnnouncement}
								handleClose={handleCloseAnnouncement}
							/>
						</div>
					</div>
				</div>
				<div className={scss.pagination}>
					<div className={scss.inputs}>
						<p className={scss.text}>Перейти на страницу</p>
						<div className={scss.pagination_element}>
							<IconBook stroke={2} />
						</div>
						<input
							type="text"
							value={openPart}
							onChange={(e) => setOpenPart(+e.target.value)}
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
								if (e.key === 'Enter') {
									handleOpenPage(openPart);
								}
							}}
						/>
					</div>
					<div className={scss.stack}>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={data?.totalPages}
								page={openPart}
								onChange={handleChangePage}
								shape="rounded"
								variant="outlined"
							/>
						</Stack>
					</div>
					<div className={scss.inputs}>
						<p className={scss.text}>Показать</p>
						<div className={scss.pagination_element}>
							<IconArticle stroke={2} />
						</div>
						<input
							type="text"
							value={openPage}
							onChange={(e) => setOpenPage(+e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleOpenSize(openPage);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Announcements;
