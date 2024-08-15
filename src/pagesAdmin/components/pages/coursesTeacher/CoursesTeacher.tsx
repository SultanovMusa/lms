import React, { useState } from 'react';
import scss from './CoursesTeacher.module.scss';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Preloader } from '@/src/ui/preloader/Preloader';
import Button from '@mui/material/Button';
import AppointTeacher from '@/src/ui/customModal/appoint/AppointTeacher';
import { Box, ScrollArea } from '@mantine/core';
import { IconArticle, IconBook, IconPlus } from '@tabler/icons-react';
import { useGetAllInstructorCourseQuery } from '@/src/redux/api/admin/courses';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import BasicBreadcrumbs from '@/src/ui/breadCrumbs/BreadCrumbs';

const CoursesTeacher = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openPage, setOpenPage] = useState<number>(8);
	const { courseId } = useParams();
	const [openPart, setOpenPart] = useState(1);
	const [openAddTeacher, setOpenAddTeacher] = useState(false);
	const course = Number(courseId);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString === '0' ? '1' : valueString);
		setSearchParams(searchParams);
		navigate(`/admin/courses/${courseId}/teacher?${searchParams.toString()}`);
	};

	const handleOpenPart = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(`/admin/courses/${courseId}/teacher?${searchParams.toString()}`);
	};

	const pages = {
		page: searchParams.toString(),
		size: searchParams.toString(),
		role: 'INSTRUCTOR'
	};

	const { data, isLoading } = useGetAllInstructorCourseQuery({
		course,
		pages
	});

	const handleOpenAppoint = () => {
		setOpenAddTeacher(true);
	};

	const handleCloseAppoint = () => {
		setOpenAddTeacher(false);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const open = Boolean(anchorEl);
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPart(value);
		handleOpenPage(value);
	};

	return (
		<div className={scss.teacher}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data !== undefined ? (
						<>
							<BasicBreadcrumbs />
							<div className={scss.buttons}>
								<Button
									size="large"
									className={scss.button}
									variant="contained"
									onClick={handleOpenAppoint}
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>
									<span style={{ textTransform: 'none' }}>
										Назначить учителя
									</span>
								</Button>
							</div>
							<h1 className={scss.title}>Учителя</h1>
						</>
					) : null}
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								{data === undefined ? (
									<>
										<NotCreated
											name="Учителя"
											text="Вы еще не назначили учителя !"
											buttonClick={handleOpenAppoint}
											buttontText="Назначить учителя"
										/>
									</>
								) : (
									<>
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
															<th>Группа</th>
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
														{data?.objects.map((item, index: number) => (
															<tr
																key={item.id}
																className={
																	index % 2 === 1
																		? scss.TableAlternateRow
																		: '' || scss.TableContainerSecond
																}
															>
																<td>{index + 1 + (openPart - 1) * openPage}</td>
																<td className={scss.TableCell}>
																	{item.fullName}
																</td>
																<td className={scss.TableCell}>
																	{item.specializationOrStudyFormat}
																</td>
																<td className={scss.TableCell}>
																	{item.phoneNumber}
																</td>
																<td className={scss.TableCell}>{item.email}</td>
																<td className={scss.TableCell}>
																	{item.courseName}
																</td>
																<td className={scss.TableCellIcon}>
																	<button
																		className={scss.button}
																		aria-controls={
																			open ? 'basic-menu' : undefined
																		}
																		aria-haspopup="true"
																		onClick={() => {
																			setOpenModalDelete(true);
																			setAnchorEl(null);
																			setDeleteById(item.id!);
																		}}
																	>
																		<img src={deleteIcon} alt="Delete" />
																	</button>
																</td>
															</tr>
														))}
													</tbody>
												</table>
												<ModalEditTeacher
													openModalEdit={openModalEdit}
													closeModalEdit={() => setOpenModalEdit(false)}
													deleteById={deleteById}
												/>
											</div>
										</div>
									</>
								)}
							</div>
						</Box>
					</ScrollArea>
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
											handleOpenPage(openPart);
										}
									}}
								/>
							</div>
							<div className={scss.stack}>
								<Stack direction="row" spacing={2}>
									<Pagination
										page={openPart}
										count={data?.totalPages}
										variant="outlined"
										shape="rounded"
										onChange={handleChangePage}
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
											handleOpenPart(openPage);
										}
									}}
								/>
							</div>
						</div>
					</>
				) : null}
			</div>
			<AppointTeacher open={openAddTeacher} handleClose={handleCloseAppoint} />
		</div>
	);
};

export default CoursesTeacher;
