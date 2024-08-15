// import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Late.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useGetTaskResultQuery } from '@/src/redux/api/instructor/getTask';

const Late = () => {
	const { courseId, lessonId, getTaskId } = useParams();
	const page = { answerStatus: 'LATE' };
	const getTask = Number(getTaskId);
	const { data } = useGetTaskResultQuery({ getTask, page });
	return (
		<div className={scss.main_part}>
			<div className={scss.late}>
				{data?.map((item) => (
					<Link
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

export default Late;
