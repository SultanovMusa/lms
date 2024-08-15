/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { FC, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconArticle, IconBook, IconDots, IconPlus } from '@tabler/icons-react';
import scss from './Group.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import CreateGroup from '@/src/ui/customModal/createGroup/CreateGroup';
import EditGroup from '@/src/ui/customModal/editGroup/EditGroup';
import DeleteGroupModal from '@/src/ui/customModal/deleteModal/DeleteGroups';
import { Button, Tooltip } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotCreated from '@/src/ui/notCreated/NotCreated';

const Groups: FC = () => {
	const navigate = useNavigate();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [openGroups, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
		searchParams.set('page', page.toString());
		navigate(`/admin/group/page/?${searchParams.toString()}`);
	};
	const handleInputValue = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString === '0' ? '1' : valueString);
		setSearchParams(searchParams);
		navigate(`/admin/group/page/?${searchParams.toString()}`);
	};

	const handleInputValuePaginationSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(`/admin/group/page/?${searchParams.toString()}`);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);

	const { data } = useGetGroupQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});

	return (
		<div className={scss.group}>
			<div className={scss.content}>
				<div className={scss.container}>
					{data !== undefined ? (
						<>
							<div className={scss.course_button_modal}>
								<Button
									type="button"
									size="large"
									className={scss.button}
									onClick={handleOpen}
									variant="contained"
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>
									<span style={{ textTransform: 'none' }}>Создать группу</span>
								</Button>
							</div>
							<h1 className={scss.title}>Группы</h1>
						</>
					) : null}
					<div>
						{data === undefined ? (
							<>
								<NotCreated
									text="Вы пока не создали группы!"
									name="Группы"
									buttontText="Создать группу"
									buttonClick={handleOpen}
								/>
							</>
						) : (
							<>
								<div className={scss.cards}>
									{
										<div className={scss.card}>
											{data?.objects.map((item) => (
												<div
													key={item.id}
													className={scss.zero_block_container}
												>
													<div
														onClick={() => {
															localStorage.setItem('item', item.title);
															setTimeout(() => {
																navigate(`/admin/group/${item.id}`);
															}, 500);
														}}
													>
														<div className={scss.block_photo_cards}>
															<img
																src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.image}`}
																alt="images"
															/>
														</div>
														<div className={scss.block_cont}>
															<div className={scss.second_block_container}>
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
													<div className={scss.block_button_div}>
														<div onClick={handleClick}>
															<button
																className={scss.block_button_dots}
																onClick={() => {
																	setSaveId(item.id);
																}}
															>
																<IconDots stroke={2} />
															</button>
														</div>
														{
															<Menu
																anchorEl={anchorEl}
																id="positioned-menu"
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
														}
													</div>
												</div>
											))}
											<EditGroup
												open={openEditModal}
												handleClose={handleCloseEditModal}
												saveId={saveId}
											/>
										</div>
									}
									<DeleteGroupModal
										openModalDelete={deleteModal}
										closeModalDelete={() => setDeleteModal(false)}
										deleteById={saveId}
									/>
								</div>
							</>
						)}
					</div>
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
											handleInputValue(currentPage);
										}
									}}
								/>
							</div>
							<div className={scss.stack}>
								<Stack direction="row" spacing={2}>
									{openPage > 0 && data?.objects && data.objects.length > 0 && (
										<Pagination
											page={currentPage}
											count={data.totalPages}
											variant="outlined"
											shape="rounded"
											onChange={handlePageChangeC}
										/>
									)}
								</Stack>
							</div>

							<div className={scss.Inputs}>
								<p className={scss.text}>Показать</p>
								<div className={scss.pagination_element}>
									<IconArticle stroke={2} />
								</div>
								<input
									type="text"
									value={openPage}
									onChange={(e) => {
										setOpenPage(+e.target.value);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleInputValuePaginationSize(openPage);
										}
									}}
								/>
								<p>из {data?.totalObjects}</p>
							</div>
						</div>
					</>
				) : null}
			</div>
			<CreateGroup
				handleOpen={handleOpen}
				open={openGroups}
				handleClose={handleCloseCourses}
			/>
		</div>
	);
};

export default Groups;
