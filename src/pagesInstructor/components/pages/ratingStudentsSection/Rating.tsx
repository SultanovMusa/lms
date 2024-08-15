/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './Rating.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetRatingStudentsQuery } from '@/src/redux/api/instructor/rating';
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { IconCaretDown, IconPlus, IconTrash } from '@tabler/icons-react';
import AddExam from '@/src/ui/InstructorModal/AddExam';
import {
	useDeleteExamMutation,
	useGetExamInstructorQuery,
	useUpdateExamPointMutation
} from '@/src/redux/api/instructor/examApi';
import { Preloader } from '@/src/ui/preloader/Preloader';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import RatingModal from '@/src/ui/customModal/ratingModal/RatingModal';

const Rating = () => {
	const { courseId } = useParams();
	const test = Number(courseId);
	const [openRating, setOpenRating] = useState(false);
	const { data: rating, isLoading } = useGetRatingStudentsQuery(test);
	const { data: exam = [] } = useGetExamInstructorQuery(test);
	const [deleteExam] = useDeleteExamMutation();
	const [openModal, setOpenModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const open2 = Boolean(anchorEl2);
	const [deleteExamId, setDeleteExamId] = useState<null | number>(null);

	const navigate = useNavigate();
	const [updateExamPoint] = useUpdateExamPointMutation();

	const course = Number(courseId);

	const [studentExamPoints, setStudentExamPoints] = useState<{
		[studentId: number]: { [examId: number]: number };
	}>({});

	const handleSavePoints = async (examId: number, studentId: number) => {
		const newPoint = {
			point: studentExamPoints[studentId]?.[examId] || 0
		};

		await updateExamPoint({ examId, studentId, newPoint });
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handleOpen = () => {
		setOpenModal(true);
		handleClose();
		handleClose2();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (anchorEl) {
			handleClose();
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl2(event.currentTarget);
	};

	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const deleteFunc = async () => {
		await deleteExam(deleteExamId);
		handleClose();
	};

	return (
		<div className={scss.rating}>
			{rating?.studentResponses !== undefined ? (
				<>
					<h1>Студенты</h1>
				</>
			) : null}
			<div className={scss.scroll_table}>
				{rating?.studentResponses.length === undefined ? (
					<>
						<NotCreated
							text=""
							name="Студенты"
							buttonClick={() => setOpenRating(true)}
							buttontText="Распределение рейтинга"
						/>
					</>
				) : (
					<>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className={scss.rating_container}>
								<table>
									<thead>
										<tr>
											<th className={scss.number} rowSpan={2}>
												№
											</th>
											<th
												className={scss.name}
												rowSpan={2}
												style={{ width: '200px', overflowWrap: 'normal' }}
											>
												Имя Фамилия
											</th>
											{rating?.studentResponses[0]?.lessonRatingResponses.map(
												(lesson) => (
													<th
														style={{
															minWidth: '170px',
															maxWidth: '170px',
															paddingLeft: '30px'
														}}
														colSpan={lesson.taskRatingResponses.length}
														key={lesson.id}
													>
														<Tooltip title={lesson.title}>
															<p
																style={{
																	width: '100%',
																	maxWidth: '100px',
																	textOverflow: 'ellipsis',
																	overflow: 'hidden',
																	whiteSpace: 'nowrap'
																}}
															>
																{lesson.title}
															</p>
														</Tooltip>
													</th>
												)
											)}
											<th
												style={{ minWidth: '180px', maxWidth: '180px' }}
												rowSpan={2}
											>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: '5px'
													}}
												>
													<p style={{ paddingLeft: '5px' }}>Экзамен</p>
													<Button
														variant="contained"
														size="medium"
														className={scss.button}
														onClick={handleClick}
													>
														<IconCaretDown stroke={2} />
													</Button>
												</div>
												<Menu
													id="positioned-menu"
													anchorEl={anchorEl}
													open={open}
													onClose={handleClose}
													anchorOrigin={{
														vertical: 'bottom',
														horizontal: 'right'
													}}
													transformOrigin={{ vertical: -4, horizontal: 150 }}
													PaperProps={{ style: { border: 'none' } }}
												>
													<MenuItem
														style={{ display: 'flex', gap: '10px' }}
														onClick={handleOpen}
													>
														<IconPlus stroke={2} />
														Добавить столбец
													</MenuItem>
												</Menu>
											</th>
											{exam[0]?.exams.map((item) => (
												<th
													style={{ minWidth: '170px', maxWidth: '170px' }}
													rowSpan={2}
													key={item.examId}
												>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '5px',
															flexDirection: 'column'
														}}
													>
														<p style={{ paddingLeft: '5px', flexWrap: 'wrap' }}>
															{item.examTitle}
														</p>
														<p>{item.examDate}</p>
														<Button
															variant="contained"
															size="small"
															onClick={handleClick2}
														>
															<IconCaretDown stroke={2} />
														</Button>
													</div>
													<Menu
														id="positioned-menu"
														anchorEl={anchorEl2}
														open={open2}
														onClose={handleClose2}
														MenuListProps={{
															'aria-labelledby': 'basic-button'
														}}
														elevation={0}
														anchorOrigin={{ vertical: 42, horizontal: 20 }}
														transformOrigin={{ vertical: 10, horizontal: 20 }}
														PaperProps={{
															style: {
																boxShadow: 'none',
																border: '1px solid gray',
																width: '200px',
																height: '90px'
															}
														}}
													>
														<MenuItem
															style={{ display: 'flex', gap: '10px' }}
															onClick={handleOpen}
														>
															<IconPlus stroke={2} />
															Добавить столбец
														</MenuItem>
														<MenuItem
															style={{ display: 'flex', gap: '10px' }}
															onClick={() => {
																deleteFunc();
																setDeleteExamId(exam[0].exams[0].examId);
															}}
														>
															<IconTrash stroke={2} />
															Удалить столбец
														</MenuItem>
													</Menu>
												</th>
											))}
											<th rowSpan={2}>Итого</th>
										</tr>
										<tr>
											{rating?.studentResponses[0]?.lessonRatingResponses.map(
												(lesson) => (
													<>
														{lesson.taskRatingResponses.length === 0 ? (
															<th key={lesson.id}>---</th>
														) : (
															lesson.taskRatingResponses.map((task) => (
																<th
																	style={{
																		minWidth: '170px',
																		maxWidth: '170px',
																		paddingLeft: '30px'
																	}}
																	key={task.id}
																>
																	<Tooltip title={task.taskTitle}>
																		<p
																			style={{
																				width: '100%',
																				maxWidth: '100px',
																				textOverflow: 'ellipsis',
																				overflow: 'hidden',
																				whiteSpace: 'nowrap'
																			}}
																		>
																			{task.taskTitle}
																		</p>
																	</Tooltip>
																</th>
															))
														)}
													</>
												)
											)}
										</tr>
									</thead>
									<tbody>
										{rating?.studentResponses.map((student, index) => (
											<tr key={student.id}>
												<td>{index + 1}</td>
												<td className={scss.fullName}>
													<h4>{student.fullName}</h4>
												</td>
												{student.lessonRatingResponses.map((lesson) =>
													lesson.taskRatingResponses.map((item) =>
														item.answerTaskRatingResponses.id === null ? (
															<td key={item.id}>0</td>
														) : (
															<td
																key={item.id}
																style={{
																	color: ' blue ',
																	textDecoration: 'underline'
																}}
																onClick={() =>
																	navigate(
																		`/instructor/course/${courseId}/materials/${lesson.id}/lesson/${item.id}/answer/${item.answerTaskRatingResponses.id}`
																	)
																}
															>
																{item.answerTaskRatingResponses.point}
															</td>
														)
													)
												)}

												<td>0</td>

												{exam &&
													exam[0]?.exams.map((item) => (
														<td key={item.examId}>
															<input
																style={{ border: 'none', outline: 'none' }}
																type="number"
																value={
																	studentExamPoints[student.id]?.[
																		item.examId
																	] || 0
																}
																onChange={(e) =>
																	setStudentExamPoints({
																		...studentExamPoints,
																		[student.id]: {
																			...studentExamPoints[student.id],
																			[item.examId]: +e.target.value
																		}
																	})
																}
																onBlur={() =>
																	handleSavePoints(item.examId, student.id)
																}
															/>
														</td>
													))}

												<td>{Math.floor(student.completionPercentage)}%</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</>
				)}
				<AddExam open={openModal} handleClose={() => setOpenModal(false)} />
			</div>
			<RatingModal
				open={openRating}
				handleClose={() => setOpenRating(false)}
				saveId={course}
			/>
		</div>
	);
};

export default Rating;
