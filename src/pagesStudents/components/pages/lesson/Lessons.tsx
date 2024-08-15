import scss from './Lessons.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneTaskNameQuery } from '@/src/redux/api/students/materials';
import { Tooltip } from '@mui/material';

const Lesson = () => {
	const { coursesId, lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetOneTaskNameQuery(lesson);
	const navigate = useNavigate();

	return (
		<div className={scss.list_lessons}>
			<div className={scss.container}>
				<div className={scss.card}>
					{data?.taskResponse.map((item) => (
						<div
							className={scss.cards}
							onClick={() => {
								localStorage.setItem('taskName', String(item.title));
								setTimeout(() => {
									navigate(
										`/courses/${coursesId}/materials/${lessonId}/lesson/${item.id}`
									);
								}, 1000);
							}}
							key={item.id}
						>
							<Tooltip title={item.title}>
								<p
									style={{
										width: '100%',
										maxWidth: '250px',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap'
									}}
								>
									<a href="#" className={scss.name_home_work}>
										{item.title}
									</a>
								</p>
							</Tooltip>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Lesson;
