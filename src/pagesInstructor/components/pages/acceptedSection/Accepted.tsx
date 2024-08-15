import { useGetTaskResultQuery } from '@/src/redux/api/instructor/getTask';
import scss from './Accepted.module.scss';
import { Link, useParams } from 'react-router-dom';

const Accepted = () => {
	const page = { answerStatus: 'ACCEPTED' };
	const { courseId, lessonId, getTaskId } = useParams();
	const getTask = Number(getTaskId);
	const { data } = useGetTaskResultQuery({ getTask, page });
	return (
		<div className={scss.main_part}>
			<div className={scss.acceped}>
				{data?.map((item) => (
					<Link
						to={`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/answer/${item.answerTasId}`}
					>
						<div className={scss.card_container}>
							<p className={scss.card_link}>{item.studentName}</p>
							<div className={scss.button}></div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Accepted;
