import React, { useState, MouseEvent } from 'react';
import scss from './Teacher.module.scss';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconPlus
} from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import { Menu, MenuItem } from '@mui/material';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Preloader } from '@/src/ui/preloader/Preloader';
import Button from '@mui/material/Button';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher.tsx';
import { Box, ScrollArea } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotCreated from '@/src/ui/notCreated/NotCreated';

const Teacher = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openPage, setOpenPage] = useState<number>(8);
	const [openPart, setOpenPart] = useState(1);
	const [openTeacher, setTeacherOpen] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('page', valueSize);
		setSearchParams(searchParams);
		navigate(`/admin/teacher/?${searchParams.toString()}`);
	};

	const handlePage = (value: number) => {
		const valuePage = value.toString();
		searchParams.set('size', valuePage);
		setSearchParams(searchParams);
		navigate(`/admin/teacher/?${searchParams.toString()}`);
	};

	const { data, isLoading } = useGetTeacherQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});

	const handleTeacherOpen = (e: MouseEvent<HTMLButtonElement>) => {
		setTeacherOpen(true);
		e.preventDefault();
	};

	const handleTeacherClose = () => {
		setTeacherOpen(false);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

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
		setOpenPart(value);
		handleSize(value);
	};
	return (
		<div className={scss.teacher}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data !== undefined ? (
						<>
							<div className={scss.button_title_elements}>
								<Button
									size="large"
									className={scss.button}
									onClick={handleTeacherOpen}
									variant="contained"
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>
									<span style={{ textTransform: 'none' }}>
										Добавить учителя
									</span>
								</Button>
							</div>
							<h1 className={scss.title}>Учителя</h1>
						</>
					) : null}
					{data === undefined ? (
						<>
							<NotCreated
								text="Вы пока не добавили учителей!"
								name="Учителя"
								buttonClick={() => setTeacherOpen(true)}
								buttontText="Добавить учителя"
							/>
						</>
					) : (
						<>
							<ScrollArea
								scrollbars="xy"
								type="always"
								offsetScrollbars
								classNames={scss}
							>
								<Box>
									<div>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<div className={scss.TeacherContainer}>
												<table className={scss.Table}>
													<thead>
														<tr>
															<th style={{ textAlign: 'start' }}>№</th>
															<th>Имя Фамилия</th>
															<th>Специализация</th>
															<th>Номер телефона</th>
															<th>E-mail</th>
															<th
																style={{
																	textAlign: 'end',
																	paddingRight: '10px'
																}}
															>
																Действия
															</th>
														</tr>
													</thead>
													<tbody>
														{data?.objects &&
															data.objects.map((item, index) => (
																<tr
																	key={item.id}
																	className={
																		index % 2 === 1
																			? scss.TableAlternateRow
																			: '' || scss.TableContainerSecond
																	}
																>
																	<td>
																		{openPage > 0
																			? index + 1 + (openPart - 1) * openPage
																			: null}
																	</td>
																	<td className={scss.TableCell}>
																		{item.fullName}
																	</td>
																	<td className={scss.TableCell}>
																		{item.specialization}
																	</td>
																	<td className={scss.TableCell}>
																		{item.phoneNumber}
																	</td>
																	<td className={scss.TableCell}>
																		{item.email}
																	</td>
																	<td className={scss.TableCellIcon}>
																		<button
																			className={scss.button}
																			aria-controls={
																				open ? 'basic-menu' : undefined
																			}
																			aria-haspopup="true"
																			onClick={(e) => {
																				handleClick(e);
																				setDeleteById(item.id!);
																			}}
																		>
																			<IconDotsVertical stroke={2} />
																		</button>
																		<Menu
																			id="basic-menu"
																			anchorEl={anchorEl}
																			open={open}
																			onClose={handleClose}
																			MenuListProps={{
																				'aria-labelledby': 'basic-button'
																			}}
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
																				style={{ display: 'flex', gap: '10px' }}
																				onClick={() => {
																					setOpenModalEdit(true);
																					setAnchorEl(null);
																				}}
																			>
																				<img src={editIcon} alt="Edit" />
																				<p>Редактировать</p>
																			</MenuItem>
																			<MenuItem
																				style={{ display: 'flex', gap: '10px' }}
																				onClick={() => {
																					setOpenModalDelete(true);
																					setAnchorEl(null);
																				}}
																			>
																				<img src={deleteIcon} alt="Delete" />
																				<p>Удалить</p>
																			</MenuItem>
																		</Menu>
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</Box>
							</ScrollArea>
						</>
					)}
					<ModalEditTeacher
						openModalEdit={openModalEdit}
						closeModalEdit={() => setOpenModalEdit(false)}
						deleteById={deleteById}
					/>
					<DeleteTeacherModal
						openModalDelete={openModalDelete}
						closeModalDelete={setOpenModalDelete}
						deleteById={deleteById}
					/>
				</div>
				{data !== undefined ? (
					<>
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
											handleSize(openPart);
										}
									}}
								/>
							</div>
							<div className={scss.stack}>
								<Stack direction="row" spacing={2}>
									<Pagination
										page={openPart}
										count={data?.totalPages}
										onChange={handleChangePage}
										variant="outlined"
										shape="rounded"
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
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handlePage(openPage);
										}
									}}
								/>
								<p>из {data?.totalObjects}</p>
							</div>
						</div>
					</>
				) : null}
			</div>
			<ModalAddTeacher open={openTeacher} handleClose={handleTeacherClose} />
		</div>
	);
};

export default Teacher;
