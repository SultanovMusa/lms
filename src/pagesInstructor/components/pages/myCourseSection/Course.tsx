import { FC, useState } from 'react';
import {
	IconArticle,
	IconBook,
	IconChartDonut,
	IconDots,
	IconUsers
} from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import scss from './Course.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetCourseInstructorQuery } from '@/src/redux/api/instructor/course';
import CreateCourse from '@/src/ui/customModal/createCourse/CreateCurse';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import RatingModal from '@/src/ui/customModal/ratingModal/RatingModal';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';
import ModalDeleteGroupOfCourse from '@/src/ui/customModal/ModalDeleteGroupOfCourse';
import { Tooltip } from '@mui/material';

const Course: FC = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [openCurse, setOpen] = useState(false);
	const handleOpenCourse = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [saveId, setSaveId] = useState<null | number>(null);
	const [openRating, setOpenRating] = useState(false);
	const open = Boolean(anchorEl);
	const [searchParams, setSearchParams] = useSearchParams();
	const [deleteGroup, setDeleteGroup] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleChangePage = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setOpenPage(value);
		handleOpenPage(value);
	};
	const handleOpenPage = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString);
		setSearchParams(searchParams);
		navigate(`/instructor/course?${searchParams.toString()}`);
	};
	const handleOpenSize = (value: number) => {
		const valueString = value.toString();
		searchParams.set('size', valueString);
		setSearchParams(searchParams);
		navigate(`/instructor/course?${searchParams.toString()}`);
	};

	const { data } = useGetCourseInstructorQuery({
		page: searchParams.toString(),
		size: searchParams.toString()
	});
	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					{data === undefined ? (
						<>
							<NotCreatedWithoutButton
								name="Мои курсы"
								text="У вас еще нет курсы !"
							/>
						</>
					) : (
						<>
							<h1 className={scss.title}>Курсы</h1>
							<ScrollArea
								type="always"
								scrollbars="xy"
								offsetScrollbars
								classNames={scss}
							>
								<Box>
									<div>
										<div className={scss.cards}>
											{
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
																				navigate(
																					`/instructor/course/${item.id}/materials`
																				);
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
																<div className={scss.block_button_div}>
																	<div onClick={handleClick}>
																		<button
																			className={scss.button_dots}
																			onClick={() => {
																				setSaveId(item.id);
																			}}
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
																			horizontal: 'left'
																		}}
																		PaperProps={{
																			style: {
																				boxShadow: 'none',
																				border: '1px solid gray'
																			}
																		}}
																	>
																		<MenuItem
																			style={{
																				display: 'flex',

																				gap: '10px'
																			}}
																			onClick={() => setDeleteGroup(true)}
																		>
																			<IconUsers />
																			Удалить группу с курса
																		</MenuItem>

																		<MenuItem
																			style={{ display: 'flex', gap: '10px' }}
																			onClick={() => {
																				setOpenRating(true);
																				handleClose();
																			}}
																		>
																			<IconChartDonut stroke={2} />
																			Распределение рейтинга
																		</MenuItem>
																	</Menu>
																</div>
															</div>
														))}
												</div>
											}
										</div>
									</div>
								</Box>
							</ScrollArea>
						</>
					)}
				</div>
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
			</div>
			<CreateCourse
				handleOpenCourse={handleOpenCourse}
				open={openCurse}
				handleClose={handleCloseCourses}
			/>
			<RatingModal
				open={openRating}
				handleClose={() => setOpenRating(false)}
				saveId={saveId}
			/>
			<ModalDeleteGroupOfCourse
				openModalEdit={deleteGroup}
				handleClose={() => setDeleteGroup(false)}
				saveId={saveId}
			/>
		</div>
	);
};

export default Course;
