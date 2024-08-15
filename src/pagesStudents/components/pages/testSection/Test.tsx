import scss from './Test.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStudentTestQuery } from '@/src/redux/api/students/test';
import { Button, Tooltip } from '@mui/material';

const Test = () => {
	const navigate = useNavigate();
	const { coursesId, lessonId } = useParams();
	console.log(coursesId);

	const lesson = Number(lessonId);
	const { data } = useGetStudentTestQuery(lesson);

	return (
		<div className={scss.test_container}>
			<div className={scss.container}>
				{data?.testResponseForGetAll.map((question, index) => (
					<div className={scss.test_container_second}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_container_third}>
								<h4>{index + 1}</h4>
								<h4 className={scss.test_text}>
									<Tooltip title={question.title}>
										<p
											style={{
												width: '100%',
												maxWidth: '500px',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												whiteSpace: 'nowrap'
											}}
										>
											{question.title}
										</p>
									</Tooltip>
								</h4>
							</div>
							<div className={scss.test_container_forth}>
								<p className={scss.text_time}>
									Время: {question.hour}:{question.minute} минут
								</p>
							</div>
						</div>
						<div className={scss.test_buttons_container}>
							<Button
								variant="contained"
								size="small"
								onClick={() => {
									localStorage.setItem('hwTask', question.title);
									navigate(
										`/courses/${coursesId}/materials/${lessonId}/${question.testId}/showTest`
									);
								}}
							>
								Начать тест
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
