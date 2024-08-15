import scss from './InternalInstructorStudents.module.scss';
import { useState } from 'react';
import { Button, Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconPlus, IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import { useGetStudentsTableQuery } from '@/src/redux/api/instructor/studentAddCourse';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ModalAddStudentToGroups from '@/src/ui/customModal/ModalAddStudentToGroups';
import NotCreated from '@/src/ui/notCreated/NotCreated';

const InternalInstructorStudents = () => {
	const { courseId } = useParams();
	const course = Number(courseId);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [openModalEdit, setOpenModalEdit] = useState(false);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('size', valueString);
		setSearchParams(searchParams);
		navigate(
			`instructor/course/${courseId}/student/page/?${searchParams.toString()}`
		);
	};
	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(
			`/instructor/course/${courseId}/student/page/?${searchParams.toString()}`
		);
	};

	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};

	const { data, isLoading } = useGetStudentsTableQuery({
		course,
		page: searchParams.toString(),
		size: searchParams.toString()
	});
	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data?.objects !== undefined && (
						<>
							<div className={scss.delete_button_modal}>
								<Button
									size="large"
									className={scss.button}
									variant="contained"
									onClick={() => setOpenModalEdit(true)}
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>

									<span style={{ textTransform: 'none' }}>
										Добавить группу на курс
									</span>
								</Button>
							</div>
						</>
					)}
					{data?.objects === undefined ? (
						<>
							<NotCreated
								text=""
								name="Студенты"
								buttonClick={() => setOpenModalEdit(true)}
								buttontText="Добавить группу на курс"
							/>
						</>
					) : (
						<>
							<h1 className={scss.title}>Студенты</h1>
							<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
								<Box>
									<div>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<div className={scss.internal_container}>
												<table className={scss.table}>
													<thead>
														<tr>
															<th style={{ textAlign: 'start' }}>№</th>
															<th>Имя Фамилия</th>
															<th>Группа</th>
															<th>Формат обучения</th>
															<th>Номер телефона</th>
															<th>E-mail</th>
														</tr>
													</thead>
													<tbody>
														{data?.objects &&
															data.objects.map((item, index) => (
																<tr
																	key={item.id}
																	className={
																		index % 2 === 1
																			? scss.table_alternate_row
																			: scss.table_alternate_row2
																	}
																>
																	<td>{index + 1}</td>
																	<td>{item.fullName}</td>
																	<td>{item.courseName}</td>
																	<td>{item.specializationOrStudyFormat}</td>
																	<td>{item.phoneNumber}</td>
																	<td>{item.email}</td>
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
				</div>
				{data?.objects !== undefined && (
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
								<ModalAddStudentToGroups
									openModalEdit={openModalEdit}
									handleClose={setOpenModalEdit}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default InternalInstructorStudents;
