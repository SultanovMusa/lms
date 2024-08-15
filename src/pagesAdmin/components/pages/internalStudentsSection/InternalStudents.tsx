import scss from './InternalStudents.module.scss';
import { useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import { useGetGroupStudentQuery } from '@/src/redux/api/admin/groups';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const InternalStudents = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const { groupId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const group = Number(groupId);
	const navigate = useNavigate();
	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/admin/group/${groupId}?${searchParams.toString()}`);
	};

	const handleOpenPart = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(`/admin/group/${groupId}?${searchParams.toString()}`);
	};
	const pages = {
		page: searchParams.toString(),
		size: searchParams.toString()
	};

	const { data, isLoading } = useGetGroupStudentQuery({ pages, group });

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPart(value);
		handleOpenPage(value);
	};

	const item = localStorage.getItem('item');
	const itemText = String(item);

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data !== undefined ? (
						<>
							<h1 className={scss.title}>{item}</h1>
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
											name={itemText}
											text="Вы пока не добавили студентов"
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
														</tr>
													</thead>
													<tbody>
														{data?.objects &&
															data?.objects.map((item, index) => (
																<tr
																	key={item.id}
																	className={
																		index % 2 === 1
																			? scss.table_alternate_row
																			: '' || scss.internal
																	}
																>
																	<td>
																		{index + 1 + (openPart - 1) * openPart}
																	</td>
																	<td>{item.fullName}</td>
																	<td>{item.groupName}</td>
																	<td>{item.studyFormat}</td>
																	<td>{item.phoneNumber}</td>
																	<td>{item.email}</td>
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
		</div>
	);
};
export default InternalStudents;
