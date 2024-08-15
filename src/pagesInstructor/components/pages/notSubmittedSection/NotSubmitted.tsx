import { useParams } from 'react-router-dom';
import scss from './NotSubmitted.module.scss';
import { useGetNotSubmitedStudentQuery } from '@/src/redux/api/instructor/getTask';
const NotSubmitted = () => {
	const { getTaskId } = useParams();
	const getTask = Number(getTaskId);

	const { data } = useGetNotSubmitedStudentQuery(getTask);

	return (
		<div className={scss.main_part}>
			<div className={scss.not_submited}>
				{data?.map((item: string) => (
					<div className={scss.card_container}>
						<p className={scss.card_link}>{item}</p>
						<div className={scss.button}></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotSubmitted;
