import { useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './InternalCourseStudent.module.scss';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import { Box, ScrollArea } from '@mantine/core';
import { useGetAllInstructorCourseQuery } from '@/src/redux/api/admin/courses';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import IsBlockCourses from '@/src/ui/customModal/IsBlockCourses';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const InternalCourses = () => {
	const [rowsPerPage, setRowsPerPage] = useState(1);
	const [openPart, setOpenPart] = useState(8);
	const [saveIdElement, setSaveIdElement] = useState<number | null>(null);
	const [openBlock, setOpenBlock] = useState(false);
	const [saveBlock, setSaveBlock] = useState(false);
	const { courseId } = useParams();
	const course = Number(courseId);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/admin/courses/${courseId}/student?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const ValueString = value.toString();
		searchParams.set('size', ValueString);
		setSearchParams(searchParams);
		navigate(`/admin/courses/${courseId}/student?${searchParams.toString()}`);
	};

	const pages = {
		page: searchParams.toString(),
		size: searchParams.toString(),
		role: 'STUDENT'
	};

	const { data, isLoading } = useGetAllInstructorCourseQuery({
		course,
		pages
	});

	if (isLoading) {
		return <Preloader />;
	}
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPart(value);
		handleOpenPage(value);
	};

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data !== undefined ? (
						<>
							<h1 className={scss.title}>Студенты</h1>
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
										<NotCreatedWithoutButton
											name="Студенты"
											text="Вы пока не добавили студентов на курс !"
										/>
									</>
								) : (
									<>
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
															data?.objects?.map((item, index: number) => (
																<tr
																	key={item.id}
																	className={
																		index % 2 === 1
																			? scss.table_alternate_row
																			: '' || scss.internal
																	}
																>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{index + 1 + (rowsPerPage - 1) * openPart}
																	</td>

																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{item.fullName}
																	</td>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{item.courseName}
																	</td>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{item.specializationOrStudyFormat}
																	</td>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{item.phoneNumber}
																	</td>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		{item.email}
																	</td>
																	<td>
																		<button
																			className={scss.button}
																			onClick={() => {
																				setOpenBlock(true);
																				setSaveIdElement(item.id);
																				setSaveBlock(item.isBlock);
																			}}
																		>
																			{!item.isBlock ? (
																				<img src={LockOpenStudent} alt="#" />
																			) : (
																				<img src={LockBlockStudent} alt="#" />
																			)}
																		</button>
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</>
								)}
							</div>
						</Box>
					</ScrollArea>
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
									value={rowsPerPage}
									onChange={(e) => setRowsPerPage(+e.target.value)}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handleOpenPage(rowsPerPage);
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
									value={openPart}
									onChange={(e) => setOpenPart(+e.target.value)}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handleOpenSize(openPart);
										}
									}}
								/>
							</div>
						</div>
					</>
				) : null}
			</div>
			<IsBlockCourses
				openModalBlock={openBlock}
				handleCloseModal={() => setOpenBlock(false)}
				saveIdElement={saveIdElement}
				saveBlock={saveBlock}
			/>
		</div>
	);
};

export default InternalCourses;
