import FilterPhoto from '@/src/assets/svgs/adjustments-horizontal.svg';
import SearchPhoto from '@/src/assets/svgs/search.svg';
import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import Input from '@/src/ui/customInput/Input';
import ExcelModal from '@/src/ui/customModal/ExcelModal';
import ModalAddStudent from '@/src/ui/customModal/ModalAddStudent.tsx';
import { Preloader } from '@/src/ui/preloader/Preloader';
import StudentMenu from '@/src/ui/toBlock/ToBlock.tsx';
import { Button, Tooltip } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconPlus,
	IconUpload
} from '@tabler/icons-react';
import React, { MouseEvent, useState } from 'react';
import scss from './Student.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import SearchModal from '@/src/ui/customModal/searchModal/SearchModal';

interface Student {
	id: number;
	fullName: string;
	groupName: string;
	studyFormat: string;
	phoneNumber: string;
	email: string;
	isBlock: boolean;
}

const Student: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [saveIdElement, setSaveIdElement] = useState<number | null>(null);
	const [saveItem, setSaveItem] = useState<Student | undefined>(undefined);
	const [open, setOpen] = useState<boolean>(false);
	const [openStudent, setOpenStudent] = useState<boolean>(false);
	const [openPart, setOpenPart] = useState<number>(12);
	const [openPage, setOpenPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const [modalSearch, setModalOpenSearchModal] = useState(false);

	const handleOpenSeartchModal = () => {
		setModalOpenSearchModal(true);
	};

	const handleSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		// navigate(`/admin/student?${searchParams.toString()}`);
	};
	const handlePage = (value: number) => {
		const valuePage = value.toString();
		searchParams.set('page', valuePage);
		setSearchParams(searchParams);
		// navigate(`/admin/student?${searchParams.toString()}`);
	};

	const { data, isLoading } = useGetStudentTableQuery({
		page: `page=${searchParams.get('page') || ''}`,
		size: `size=${searchParams.get('size') || ''}`,
		search: `search=${searchParams.get('search') || ''}`,
		studyFormat: searchParams.get('studyFormat') || '',
		groupId: searchParams.get('groupId') || ''
	});

	const handleStudentOpen = (e: MouseEvent<HTMLButtonElement>) => {
		setOpenStudent(true);
		e.preventDefault();
	};

	const handleOpenDeleteModal = () => {
		setOpenDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
	};
	const handleCloseStudent = () => {
		setOpenStudent(false);
	};

	if (isLoading) {
		return <Preloader />;
	}

	const handleOpenSearch = () => setOpen(true);
	const handleCloseSearch = () => setOpen(false);
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handlePage(value);
	};
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		searchParams.set('search', event.target.value);
		setSearchParams(searchParams);
		if (event.target.value === '') {
			searchParams.delete('search');
			setSearchParams(searchParams);
		}
	};

	const filteredData = data?.objects.filter((student: Student) => {
		const searchTermLower = searchTerm.toLowerCase();
		return (
			(student.fullName &&
				student.fullName.toLowerCase().includes(searchTermLower)) ||
			(student.groupName &&
				student.groupName.toLowerCase().includes(searchTermLower)) ||
			(student.studyFormat &&
				student.studyFormat.toLowerCase().includes(searchTermLower)) ||
			(student.phoneNumber &&
				student.phoneNumber.toLowerCase().includes(searchTermLower)) ||
			(student.email && student.email.toLowerCase().includes(searchTermLower))
		);
	});

	return (
		<div className={scss.student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<>
						<div className={scss.search_input_buttons}>
							<div className={scss.search_input}>
								<Input
									size="small"
									width="100%"
									placeholder="Поиск"
									type="text"
									value={searchTerm}
									onChange={handleSearchChange}
								/>
								<div className={scss.input_buttons}>
									<button
										className={scss.button}
										onClick={handleOpenSeartchModal}
									>
										<img src={FilterPhoto} alt="Filter" />
									</button>
									<button className={scss.button}>
										<img src={SearchPhoto} alt="Search" />
									</button>
								</div>
							</div>
							<div className={scss.buttons}>
								<Button
									size="large"
									onClick={handleOpenSearch}
									className={scss.button}
									variant="outlined"
									style={{ textTransform: 'none' }}
								>
									<div className={scss.icon}>
										<IconUpload stroke={2} />
									</div>
									<span>Импорт Excel</span>
								</Button>
								<Button
									size="large"
									className={scss.button}
									variant="contained"
									onClick={handleStudentOpen}
								>
									<div className={scss.icon}>
										<IconPlus stroke={2} />
									</div>
									<span style={{ textTransform: 'none' }}>
										Добавить студента
									</span>
								</Button>
							</div>
						</div>
						<h1 className={scss.title}>Студенты</h1>
					</>

					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								<>
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<div className={scss.StudentContainer}>
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
													{filteredData
														?.slice(
															(openPage - 1) * openPart,
															openPage * openPart
														)
														.map((item: Student, index) => (
															<tr
																key={item.id}
																className={
																	index % 2 === 1
																		? scss.TableAlternateRow
																		: '' || scss.StudentContainerSecond
																}
															>
																<td
																	className={
																		item.isBlock ? scss.changeClass : ''
																	}
																>
																	{index + 1 + (openPage - 1) * openPart}
																</td>
																<td
																	className={
																		item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.fullName}
																</td>
																<Tooltip title={item.groupName}>
																	<td
																		className={
																			item.isBlock ? scss.changeClass : ''
																		}
																	>
																		<p
																			style={{
																				width: '100%',
																				maxWidth: '180px',
																				textOverflow: 'ellipsis',
																				overflow: 'hidden',
																				whiteSpace: 'nowrap'
																			}}
																		>
																			{item.groupName}
																		</p>
																	</td>
																</Tooltip>
																<td
																	className={
																		item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.studyFormat}
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
																<td className={scss.TableCellIcon}>
																	<button
																		onClick={(event) => {
																			setAnchorEl(event.currentTarget);
																			setSaveIdElement(item.id);
																			setSaveItem(item);
																		}}
																	>
																		<IconDotsVertical
																			style={{ cursor: 'pointer' }}
																			onClick={() => setAnchorEl(null)}
																		/>
																	</button>
																</td>
															</tr>
														))}
													<StudentMenu
														anchorEl={anchorEl!}
														open={Boolean(anchorEl)}
														onClose={() => setAnchorEl(null)}
														handleOpenDeleteModal={handleOpenDeleteModal}
														item={saveItem!}
														saveIdElement={saveIdElement!}
														openDeleteModal={openDeleteModal}
														setFilteredData={() => {}}
														handleCloseDeleteModal={handleCloseDeleteModal}
													/>
												</tbody>
											</table>
										</div>
									</div>
								</>
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
									value={openPage}
									onChange={(e) => setOpenPage(+e.target.value)}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handlePage(openPage);
										}
									}}
								/>
							</div>
							<div className={scss.stack}>
								<Stack direction="row" spacing={2}>
									<Pagination
										count={data?.totalPages}
										page={openPage}
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
									value={openPart}
									onChange={(e) => setOpenPart(+e.target.value)}
									onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											handleSize(openPart);
										}
									}}
								/>
								<p>из {data?.totalObjects}</p>
							</div>
						</div>
					</>
				) : null}
			</div>
			<ExcelModal handleClose={handleCloseSearch} open={open} />
			<ModalAddStudent open={openStudent} handleClose={handleCloseStudent} />
			<SearchModal
				openModalEdit={modalSearch}
				handleClose={() => setModalOpenSearchModal(false)}
			/>
		</div>
	);
};

export default Student;
