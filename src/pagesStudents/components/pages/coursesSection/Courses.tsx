import { FC, useState } from 'react';
import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './Courses.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { useGetStudentsCourseQuery } from '@/src/redux/api/students/courses';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';
import { Tooltip } from '@mui/material';

const Courses: FC = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [saveItem, setSaveItem] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/courses?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('size', valueString);
		setSearchParams(searchParams);
		navigate(`/courses?${searchParams.toString()}`);
	};

	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};

	const { data } = useGetStudentsCourseQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});
	localStorage.setItem('item', saveItem);

	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					{data === undefined ? (
						<>
							<NotCreatedWithoutButton
								text="У вас еще нет курсы !"
								name="Мои курсы"
							/>
						</>
					) : (
						<>
							<h1 className={scss.title}>Мои курсы</h1>
							<ScrollArea
								type="always"
								scrollbars="xy"
								offsetScrollbars
								classNames={scss}
							>
								<Box>
									<div>
										<div className={scss.cards}>
											<div className={scss.card}>
												{data?.objects.map((item) => (
													<div
														key={item.id}
														className={scss.zero_block_container}
													>
														<div
															onClick={() => {
																setSaveItem(item.title);
															}}
														>
															<div
																onClick={() => {
																	setTimeout(() => {
																		navigate(`/courses/${item.id}/materials`);
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
													</div>
												))}
											</div>
											{/* ) : null} */}
										</div>
									</div>
								</Box>
							</ScrollArea>
						</>
					)}
				</div>
				{data !== undefined && (
					<>
						<div className={scss.pagination}>
							<div className={scss.Inputs}>
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
							<div className={scss.Inputs}>
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
					</>
				)}
			</div>
		</div>
	);
};

export default Courses;
