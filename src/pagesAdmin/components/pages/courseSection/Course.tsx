import { FC, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconArticle, IconBook, IconDots, IconPlus } from '@tabler/icons-react';
import scss from './Course.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteCourses from '@/src/ui/customModal/deleteModal/DeleteCourse';
import EditCourse from '@/src/ui/customModal/editCourse/EditCourse';
import CreateCourse from '@/src/ui/customModal/createCourse/CreateCurse';
import { Button, Tooltip } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAdminCourseQuery } from '@/src/redux/api/admin/courses';
import { Box, ScrollArea } from '@mantine/core';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import { MouseEventHandler } from 'react';

const Courses: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [openPage, setOpenPage] = useState(8);
	const [openCurse, setOpen] = useState(false);
	const handleOpenCourse = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString === '0' ? '1' : valueString);
		setSearchParams(searchParams);
		navigate(`/admin/courses/?${searchParams.toString()}`);
	};

	const handleInputValuePaginationSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(`/admin/courses/?${searchParams.toString()}`);
	};

	const { data } = useGetAdminCourseQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});

	const navigate = useNavigate();

	const open = Boolean(anchorEl);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value);
		handleOpenPage(value);
	};

	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					{data !== undefined ? (
						<>
							<div className={scss.course_button_modal}>
								<Button
									size="large"
									className={scss.button}
									onClick={handleOpenCourse}
									variant="contained"
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>
									<span style={{ textTransform: 'none' }}>Создать курс</span>
								</Button>
							</div>
							<h1 className={scss.title}>Курсы</h1>
						</>
					) : null}
					{data === undefined ? (
						<NotCreated
							text="Вы пока не создали курсы!"
							name="Курсы"
							buttontText="Создать курс"
							buttonClick={handleOpenCourse}
						/>
					) : (
						<ScrollArea
							type="always"
							scrollbars="xy"
							offsetScrollbars
							classNames={scss}
						>
							<Box>
								<div className={scss.cards}>
									<div className={scss.card}>
										{data?.objects &&
											data.objects.map((item) => (
												<div
													key={item.id}
													className={scss.zero_block_container}
												>
													<div>
														<div
															onClick={() => {
																localStorage.setItem('item', item.title);
																setTimeout(() => {
																	navigate(`/admin/courses/${item.id}/teacher`);
																}, 1000);
															}}
														>
															<div className={scss.block_photo_cards}>
																<img
																	src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.image}`}
																	alt="images"
																/>
															</div>
															<div className={scss.block_cont}>
																<div className={scss.second_block}>
																	<span>
																		<Tooltip title={item.title}>
																			<p
																				style={{
																					width: '100%',
																					maxWidth: '150px',
																					textOverflow: 'ellipsis',
																					overflow: 'hidden',
																					whiteSpace: 'nowrap'
																				}}
																				className={scss.block_title}
																			>
																				{item.title}
																			</p>
																		</Tooltip>
																	</span>
																	<p className={scss.block_date}>
																		{item.dateOfEnd}
																	</p>
																</div>
																<div className={scss.text_card}>
																	<span className={scss.block_text}>
																		<Tooltip title={item.description}>
																			<p
																				style={{
																					width: '100%',
																					maxWidth: '300px',
																					textOverflow: 'ellipsis',
																					overflow: 'hidden',
																					whiteSpace: 'nowrap'
																				}}
																			>
																				{item.description}
																			</p>
																		</Tooltip>
																	</span>
																</div>
															</div>
														</div>
													</div>
													<div className={scss.block_button_div}>
														<div
															onClick={() => {
																setSaveId(item.id);
															}}
														>
															<button
																onClick={handleClick}
																className={scss.button_dots}
															>
																<IconDots stroke={2} />
															</button>
														</div>
														<Menu
															anchorEl={anchorEl}
															id="basic-menu"
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
															PaperProps={{
																style: {
																	boxShadow: 'none',
																	border: '1px solid gray'
																}
															}}
														>
															<MenuItem
																style={{ display: 'flex', gap: '10px' }}
																onClick={() => {
																	setOpenEditModal(true);
																	handleClose();
																}}
															>
																<img src={editImg} alt="#" />
																Редактировать
															</MenuItem>
															<MenuItem
																style={{ display: 'flex', gap: '10px' }}
																onClick={() => {
																	setDeleteModal(true);
																	handleClose();
																}}
															>
																<img src={deleteImg} alt="#" />
																Удалить
															</MenuItem>
														</Menu>
													</div>
												</div>
											))}
										<EditCourse
											open={openEditModal}
											handleClose={handleCloseEditModal}
											saveId={saveId}
										/>
									</div>
									<DeleteCourses
										openModalDelete={deleteModal}
										closeModalDelete={() => setDeleteModal(false)}
										deleteById={saveId}
									/>
								</div>
							</Box>
						</ScrollArea>
					)}
				</div>
				{data !== undefined ? (
					<>
						<div className={scss.pagination}>
							<div className={scss.Inputs}>
								<p className={scss.text}>Перейти на страницу</p>
								<div className={scss.pagination_element}>
									<IconBook stroke={2} />
								</div>
								<input
									type="text"
									value={currentPage}
									onChange={(e) => setCurrentPage(Number(e.target.value))}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handleOpenPage(currentPage);
										}
									}}
								/>
							</div>
							<div className={scss.stack}>
								<Stack direction="row" spacing={2}>
									<Pagination
										page={currentPage}
										count={data?.totalPages}
										variant="outlined"
										shape="rounded"
										onChange={handleChangePage}
									/>
								</Stack>
							</div>
							<div className={scss.Inputs}>
								<p className={scss.text}>Показать</p>
								<div className={scss.pagination_element}>
									<IconArticle stroke={2} />
								</div>
								<input
									style={
										data?.totalObjects && data.totalObjects <= openPage
											? { border: '2px solid red' }
											: undefined
									}
									type="text"
									value={openPage}
									onChange={(e) => {
										const value = Number(e.target.value);
										setOpenPage(value);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											if (data?.totalObjects && data.totalObjects >= openPage) {
												handleInputValuePaginationSize(openPage);
											}
										}
									}}
								/>
								<p>из {data?.totalObjects}</p>
							</div>
						</div>
					</>
				) : null}
			</div>
			<CreateCourse
				handleOpenCourse={handleOpenCourse}
				open={openCurse}
				handleClose={handleCloseCourses}
			/>
		</div>
	);
};

export default Courses;
