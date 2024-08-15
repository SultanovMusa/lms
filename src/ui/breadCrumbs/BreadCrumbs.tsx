import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';
import { Tooltip } from '@mui/material';

export default function BasicBreadcrumbs() {
	const { pathname } = useLocation();
	const { courseId, lessonId, coursesId, getTaskId, testId } = useParams();
	// const { data } = useGetCardQuery(coursesId);
	// const { data: lessonOne = [] } = useGetLessonQuery();

	// useEffect(() => {
	// 	const filterData = data?.find((item) => item._id === +coursesId!);
	// 	setCourse(filterData!);
	// }, [data]);
	// useEffect(() => {
	// 	const filterData = lessonOne?.find((item) => item._id === +getTask!);
	// 	setLesson(filterData!);
	// }, [lessonOne]);

	const item = localStorage.getItem('item');
	const taskName = localStorage.getItem('taskName');
	const hwTask = localStorage.getItem('hwTask');

	return (
		<div role="presentation">
			{pathname.startsWith('/admin') && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight width={20} stroke={2} />}
					>
						<Link style={{ color: '#1976d2' }} to="/admin/courses">
							Курсы
						</Link>
						<Link style={{ color: 'black' }} to={`#`}>
							{item}
						</Link>
					</Breadcrumbs>
				</>
			)}

			{/* //! instructor breadCrumbs*/}
			{pathname.startsWith(`/instructor/course/${courseId}/materials`) && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} width={20} />}
					>
						<Link
							style={{ fontSize: '14px', color: '#1976d2' }}
							to="/instructor/course"
						>
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px', color: '#1976d2' }}
							to={`/instructor/course/${courseId}/materials`}
						>
							{item}
						</Link>
						<Link
							style={
								pathname === `/instructor/course/${courseId}/materials`
									? { fontSize: '14px', color: 'black' }
									: { fontSize: '14px', color: '#1976d2' }
							}
							to={`/instructor/course/${courseId}/materials`}
						>
							Материалы
						</Link>
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/video` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight stroke={2} width={20} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Видеоурок
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/presentation` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Презентация
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/lesson` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Задание
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/link` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Ссылка
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/test` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Тест
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/createTest` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link
									style={{ fontSize: '14px', color: '#1976d2' }}
									to={`/instructor/course/${courseId}/materials/${lessonId}/test`}
								>
									Тест
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Создать тест
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/${getTaskId}/editTest` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight width={20} stroke={2} />}
							>
								<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
									<Tooltip title={taskName}>
										<p
											style={{
												width: '100%',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{taskName}
										</p>
									</Tooltip>
								</Link>
								<Link
									style={{ fontSize: '14px', color: '#1976d2' }}
									to={`/instructor/course/${courseId}/materials/${lessonId}/test`}
								>
									Тест
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Редактировать тест
								</Link>
							</Breadcrumbs>
						)}
						{pathname.startsWith(
							`/instructor/course/${courseId}/materials/${lessonId}/lesson`
						) &&
							pathname !==
								`/instructor/course/${courseId}/materials/${lessonId}/lesson` && (
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link style={{ fontSize: '14px', color: '#1976d2' }} to={'#'}>
										<Tooltip title={taskName}>
											<p
												style={{
													width: '100%',
													maxWidth: '200px',
													textOverflow: 'ellipsis',
													overflow: 'hidden'
												}}
											>
												{taskName}
											</p>
										</Tooltip>
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/instructor/course/${courseId}/materials/${lessonId}/lesson`}
									>
										Задание
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
										{hwTask}
									</Link>
								</Breadcrumbs>
							)}
					</Breadcrumbs>
				</>
			)}
			{pathname === `/instructor/course/${courseId}/rating` && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight width={20} stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/instructor/course">
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px' }}
							to={`/instructor/course/${courseId}/materials`}
						>
							Курсы
						</Link>
						<Link
							style={{ fontSize: '14px', color: 'black' }}
							to={`/instructor/course/${courseId}/materials`}
						>
							Рейтинг
						</Link>
					</Breadcrumbs>
				</>
			)}

			{/* //! student breadCrumbs*/}
			{pathname.startsWith(`/courses/${coursesId}`) && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight width={20} stroke={2} />}
					>
						<Link
							style={{ fontSize: '14px', color: '#1976d2' }}
							to={`/courses`}
						>
							Мои курсы
						</Link>
						{pathname === `/courses/${coursesId}/materials` && (
							<>
								<Link
									style={{ fontSize: '14px', color: 'black' }}
									to={`/courses/${coursesId}/materials`}
								>
									{item}
								</Link>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/video` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										Видеоурок
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname === `/courses/${coursesId}/rating` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: 'black' }}
										to={`/courses/${coursesId}/materials`}
									>
										Рейтинг
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}/send-task` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link
										style={{ fontSize: '14px', color: 'black' }}
										to={`/courses/${coursesId}/materials/${lessonId}/lesson`}
									>
										Задание
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										{taskName}
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/lesson`}
									>
										Задание
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										{taskName}
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/presentation` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										Презентация
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/lesson` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										Задание
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/link` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										Ссылка
									</Link>
								</Breadcrumbs>
							</>
						)}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/${testId}/showTest` ||
							(pathname ===
								`/courses/${coursesId}/materials/${lessonId}/${testId}/resultTest` && (
								<>
									<Breadcrumbs
										aria-label="breadcrumb"
										separator={<IconChevronRight width={20} stroke={2} />}
									>
										<Link
											style={{ fontSize: '14px', color: '#1976d2' }}
											to={`/courses/${coursesId}/materials`}
										>
											{item}
										</Link>
										<Link
											style={{ fontSize: '14px', color: '#1976d2' }}
											to={`/courses/${coursesId}/materials/${lessonId}/video`}
										>
											Материалы
										</Link>
										<Link
											style={{ fontSize: '14px', color: '#1976d2' }}
											to={`/courses/${coursesId}/materials/${lessonId}/video`}
										>
											{taskName}
										</Link>
										<Link
											style={{ fontSize: '14px', color: '#1976d2' }}
											to={`#`}
										>
											Тест
										</Link>
										<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
											{hwTask}
										</Link>
									</Breadcrumbs>
								</>
							))}
						{pathname ===
							`/courses/${coursesId}/materials/${lessonId}/test` && (
							<>
								<Breadcrumbs
									aria-label="breadcrumb"
									separator={<IconChevronRight width={20} stroke={2} />}
								>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials`}
									>
										{item}
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										Материалы
									</Link>
									<Link
										style={{ fontSize: '14px', color: '#1976d2' }}
										to={`/courses/${coursesId}/materials/${lessonId}/video`}
									>
										{taskName}
									</Link>
									<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
										Тест
									</Link>
								</Breadcrumbs>
							</>
						)}
					</Breadcrumbs>
				</>
			)}

			{pathname.startsWith(
				`/instructor/course/${courseId}/materials/${lessonId}}`
			) && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/courses">
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px' }}
							to={`instructor/course/${courseId}/materials`}
						>
							{item}
						</Link>
						<Link
							style={{ fontSize: '14px' }}
							to={`/instructor/course/${courseId}/materials`}
						>
							<Tooltip title={taskName}>
								<p
									style={{
										width: '100%',
										maxWidth: '200px',
										textOverflow: 'ellipsis',
										overflow: 'hidden'
									}}
								>
									{taskName}
								</p>
							</Tooltip>
						</Link>
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}}/presentation` && (
							<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
								Презентация
							</Link>
						)}
						{pathname ===
							`/instructor/course/${courseId}/materials/${lessonId}/video` && (
							<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
								Видеоурок
							</Link>
						)}
					</Breadcrumbs>
				</>
			)}
		</div>
	);
}
