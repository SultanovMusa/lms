import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Pagination, Stack, Tooltip } from '@mui/material';
import { useGetStudentMaterialsQuery } from '@/src/redux/api/students/materials';
import scss from './LessonsList.module.scss';
import empty from '@/src/assets/notCreated0.png';

const LessonsList = () => {
	const { coursesId } = useParams();
	const course = Number(coursesId);

	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/courses/${coursesId}/materials?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('size', valueString);
		setSearchParams(searchParams);
		navigate(`/course/${coursesId}/materials?${searchParams.toString()}`);
	};
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};

	const { data } = useGetStudentMaterialsQuery({
		course,
		page: searchParams.toString(),
		size: searchParams.toString()
	});

	return (
		<div className={scss.list_lessons}>
			<div className={scss.container}>
				<div className={scss.title_lesson}>
					<h1>Материалы</h1>
				</div>
				<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
					<Box>
						<div style={{ minHeight: '70vh' }}>
							{data?.objects.length === 0 ? (
								<div className={scss.empty_page}>
									<img src={empty} alt="Empty state" />
								</div>
							) : (
								<div className={scss.card}>
									{data?.objects.map((item) => (
										<div
											className={scss.cards}
											onClick={() => {
												localStorage.setItem('taskName', String(item.title));
												setTimeout(() => {
													navigate(
														`/courses/${coursesId}/materials/${item.id}`
													);
												}, 1000);
											}}
											key={item.id}
										>
											<a href="#" className={scss.link}>
												<span className={scss.card_item}>
													<Tooltip title={item.title}>
														<p
															style={{
																width: '100%',
																maxWidth: '200px',
																textOverflow: 'ellipsis',
																overflow: 'hidden',
																whiteSpace: 'nowrap'
															}}
														>
															№ {item.title}
														</p>
													</Tooltip>
												</span>
											</a>
										</div>
									))}
								</div>
							)}
						</div>
					</Box>
				</ScrollArea>

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
								page={openPart}
								count={data?.totalPages}
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
			</div>
		</div>
	);
};

export default LessonsList;
