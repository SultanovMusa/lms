// import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import { useGetTaskResultQuery } from '@/src/redux/api/instructor/getTask';
import scss from './NotAccepted.module.scss';
import { Link, useParams } from 'react-router-dom';

const NotAccepted = () => {
	const page = { answerStatus: 'REJECTED' };
	const { courseId, lessonId, getTaskId } = useParams();
	const getTask = Number(getTaskId);
	const { data } = useGetTaskResultQuery({ getTask, page });
	return (
		<div className={scss.main_part}>
			<div className={scss.not_accepted}>
				{data?.map((item) => (
					<Link
						onClick={() =>
							localStorage.setItem('taskId', String(item.answerTasId))
						}
						to={`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/answer/${item.answerTasId}`}
					>
						<div className={scss.card_container}>
							<p className={scss.card_link}>{item.studentName}</p>
							<div
								onClick={() => {
									localStorage.setItem('task', String(item.answerTasId));
								}}
								className={scss.button}
							></div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default NotAccepted;
