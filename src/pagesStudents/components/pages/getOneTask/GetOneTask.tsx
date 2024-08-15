/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useAnswerTaskStudentQuery,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';
import scss from './GetOneTask.module.scss';
import profile from '@/src/assets/profile.png';
import { Button } from '@mui/material';

const GetOneTask = () => {
	const { coursesId, lessonId, getTaskId } = useParams();
	const getTask = Number(getTaskId);

	const { data: taskData } = useGetTaskInstructorQuery(getTask);
	const { data: response, status } = useAnswerTaskStudentQuery(getTask);

	const navigate = useNavigate();

	useEffect(() => {
		if (
			(response === undefined && status === 'fulfilled') ||
			status === 'rejected'
		) {
			navigate(
				`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}/send-task`
			);
		}
	}, [response, status, navigate, coursesId, lessonId, getTaskId]);

	const formatDeadline = (deadline: any) => {
		const [date, time] = deadline.split('T');
		return `${date} / ${time}`;
	};

	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{taskData?.taskResponse.map((item, index) => {
					const formattedDeadline = formatDeadline(item.deadline);
					return (
						<div key={index} className={scss.card}>
							<h2 className={scss.task_teacher}>Задание учителя:</h2>
							<div className={scss.text}>
								<p>Срок сдачи: {formattedDeadline}</p>
								<p>{item.title}</p>
							</div>
							<div
								className={scss.inner_html}
								dangerouslySetInnerHTML={{ __html: item.description }}
							/>
						</div>
					);
				})}

				{response && (
					<div className={scss.comment}>
						<div className={scss.student_comment}>
							<div className={scss.your_task}>
								<h2>Your Task:</h2>
							</div>
							<div dangerouslySetInnerHTML={{ __html: response.text }}></div>
						</div>

						<div className={scss.comments_container}>
							{response?.comment?.map((item) => (
								<>
									{item.role === 'STUDENT' ? (
										<div className={scss.student}>
											<div className={scss.user}>
												<img src={profile} alt="profile" />
												<p>
													<h4>{item.author}</h4>
												</p>
											</div>

											{item.content && (
												<div className={scss.correct_hw}>
													<p>{item.content}</p>
													<p className={scss.data}>{item.dateTime}</p>
												</div>
											)}
										</div>
									) : (
										<div className={scss.admin_teacher}>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													gap: '10px'
												}}
											>
												<div className={scss.teacher}>
													<img src={profile} alt="profile" />
													<p>
														<h4>{item.author}</h4>
													</p>
												</div>
												<div className={scss.correct_hw}>
													<p>
														<span>{item.content}</span>
													</p>
													<p className={scss.data}>{item.dateTime}</p>
												</div>
											</div>
										</div>
									)}
								</>
							))}
						</div>

						{response.point === 0 ? (
							<div className={scss.getHw}>
								<h3>Ваше ДЗ рассматривается</h3>
								<Button
									variant="contained"
									onClick={() => {
										navigate(
											`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}/edit-task`
										);
									}}
									disabled={false}
									type="button"
									style={{ textTransform: 'none', borderRadius: '8px' }}
								>
									Редактировать задание
								</Button>
							</div>
						) : (
							<div className={scss.notGetHw}>
								<h3>Ваше ДЗ успешно принято</h3>
								<div className={scss.accepted_status}>
									<p>{response.point}</p>
									<p className={scss.data}>12.13.2024</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default GetOneTask;
