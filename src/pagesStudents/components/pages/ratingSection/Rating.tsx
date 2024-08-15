/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './Rating.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetRatingStudentsForStudentQuery,
	useGetYourRatingStudentQuery
} from '@/src/redux/api/students/examApi-student';
import React from 'react';
import { useGetExamInstructorQuery } from '@/src/redux/api/instructor/examApi';
import { Box, ScrollArea } from '@mantine/core';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const Rating: React.FC = () => {
	const { coursesId } = useParams<{ coursesId: string }>();
	const test = Number(coursesId);
	const { data: students } = useGetRatingStudentsForStudentQuery(test);
	const { data } = useGetYourRatingStudentQuery(test);
	const { data: exam = [] } = useGetExamInstructorQuery(test);
	const navigate = useNavigate();

	const truncateString = (str: string, num: number) => {
		if (!str || str.trim() === '') {
			return '...';
		}
		if (str.length <= num) {
			return str;
		}
		return str.slice(0, num) + '...';
	};

	return (
		<div className={scss.rating}>
			{data?.lessonRatingResponses !== undefined && (
				<>
					<h1>Студенты</h1>
				</>
			)}
			<div>
				{data?.lessonRatingResponses === undefined ? (
					<>
						<NotCreatedWithoutButton
							name="Студенты"
							text="Необходимо распределить % рейтинг!"
						/>
					</>
				) : (
					<>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className={scss.rating_container}>
								<ScrollArea>
									<Box>
										<table className={scss.Table}>
											<thead>
												<tr>
													<th className={scss.number} rowSpan={2}>
														№
													</th>
													<th className={scss.name} rowSpan={2}>
														Имя Фамилия
													</th>
													{data?.lessonRatingResponses.map((lesson) => (
														<th
															style={{ minWidth: '170px', maxWidth: '170px' }}
															colSpan={lesson.taskRatingResponses.length}
															key={lesson.id}
														>
															<p>{lesson.title}</p>
														</th>
													))}
													{exam[0]?.exams.map((item) => (
														<th rowSpan={2} key={item.examId}>
															{item.examTitle}
														</th>
													))}
													<th rowSpan={2}>Итого</th>
												</tr>
												<tr>
													{data?.lessonRatingResponses.map((lesson) => (
														<React.Fragment key={lesson.id}>
															{lesson.taskRatingResponses.length === 0 ? (
																<th>---</th>
															) : (
																lesson.taskRatingResponses.map((task) => (
																	<th
																		style={{
																			minWidth: '170px',
																			maxWidth: '170px'
																		}}
																		key={task.id}
																	>
																		{truncateString(task.taskTitle, 7)}
																	</th>
																))
															)}
														</React.Fragment>
													))}
												</tr>
											</thead>
											<tbody>
												{data && (
													<tr
														key={data.id}
														className={scss.TableContainerSecond}
													>
														<td className={scss.number}>1</td>
														<td>{data.fullName}</td>
														{data.lessonRatingResponses.map((lesson) => (
															<React.Fragment key={lesson.id}>
																{lesson.taskRatingResponses.length === 0 ||
																lesson.taskRatingResponses.every(
																	(el) =>
																		el.answerTaskRatingResponses.id === null
																) ? (
																	<td
																		key={lesson.id}
																		style={{ color: 'black' }}
																	>
																		0
																	</td>
																) : (
																	lesson.taskRatingResponses.map((el) => (
																		<td
																			key={el.id}
																			style={{
																				cursor: 'pointer',
																				color: 'blue'
																			}}
																			onClick={() => {
																				navigate(
																					`/courses/${coursesId}/materials/${lesson.id}/lesson/${el.id}`
																				);
																			}}
																		>
																			{el.answerTaskRatingResponses?.point}
																		</td>
																	))
																)}
															</React.Fragment>
														))}
														{exam[0]?.exams.map((item) => (
															<td rowSpan={2} key={item.examId}>
																{item.point}
															</td>
														))}
														{/* <td>{data.totalScore | data.completionPercentage}</td> */}
														<td
															style={{
																height: '40px'
															}}
														>
															{Math.ceil(data.completionPercentage)} %
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</Box>
								</ScrollArea>
								<div>
									<table className={scss.Table}>
										<thead>
											<tr>
												<th
													style={{
														textAlign: 'center',
														width: '3.1%',
														height: '40px'
													}}
												>
													ID
												</th>
												<th
													style={{
														textAlign: 'start',
														height: '40px',
														paddingLeft: '10px'
													}}
												>
													Имя Фамилия
												</th>
												<th
													style={{
														textAlign: 'center',
														width: '8.4%',
														height: '40px'
													}}
												>
													Всего
												</th>
											</tr>
										</thead>
										<tbody>
											{students?.studentsRatingResponseList.map(
												(item, index) => (
													<tr
														key={item.id}
														className={scss.TableContainerSecond}
													>
														<td
															className={scss.rating}
															style={
																index % 2
																	? {
																			textAlign: 'center',
																			background: '#eff0f4',
																			height: '40px'
																		}
																	: { textAlign: 'center' }
															}
														>
															{index + 1}
														</td>
														<td
															style={
																index % 2
																	? {
																			textAlign: 'start',
																			background: '#eff0f4',
																			height: '40px'
																		}
																	: { textAlign: 'start' }
															}
														>
															{item.fullName}
														</td>
														<td
															style={
																index % 2
																	? {
																			textAlign: 'center',
																			background: '#eff0f4',
																			height: '40px'
																		}
																	: { textAlign: 'center' }
															}
														>
															{Math.ceil(item.completionPercentage)}%
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Rating;
