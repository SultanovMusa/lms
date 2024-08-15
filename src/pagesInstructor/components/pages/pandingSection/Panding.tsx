import { useGetTaskResultQuery } from '@/src/redux/api/instructor/getTask';
import scss from './Panding.module.scss';
import { Link, useParams } from 'react-router-dom';

const Panding = () => {
	const page = { answerStatus: 'WAITING' };
	const { courseId, lessonId, getTaskId } = useParams();

	const getTask = Number(getTaskId);
	const { data } = useGetTaskResultQuery({ getTask, page });

	return (
		<div className={scss.main_part}>
			<div className={scss.panding}>
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

export default Panding;
