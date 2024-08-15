import { Route, Routes } from 'react-router-dom';
import scss from './LayoutInstructor.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import CalendarPage from '../pages/CalendarPage';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import SupHeader from '@/src/ui/supHeader/SupHeader';
import MyCoursePage from '../pages/MyCoursePage';
import InternalInstructorStudentsPage from '../pages/InternalInstructorStudentsPage';
import MaterialsPage from '../pages/MaterialsPage';
import LessonPage from '../pages/LessonPage';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SubHeaderMobile';
import AddTaskPage from '../pages/AddTaskPage';
import EditTask from '../pages/editTaskSection/EditTask';
import GetTestInstructor from '../pages/getTestSection/GetTestInstructor';
import Answer from '../pages/answerSection/Answer';
import RatingStudentsPage from '../pages/RatingStudentsPage';
import BasicBreadcrumbs from '@/src/ui/breadCrumbs/BreadCrumbs';
import SupHeaderCourses from '@/src/ui/supheaderCourses/SupHeaderCourses';
import EditTest from '../pages/editTest/EditTest';
import ResultTest from '../pages/resultTest/ResultTest';
import CreateTest from '../pages/createTestSection/CreateTest';
import TrashPage from '../pages/TrashPage';
import AnnouncementPage from '../pages/AnnouncementPage';

const LayoutInstructor = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const changeIsMobile = () => {
			if (window.innerWidth < 1000) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		changeIsMobile();
		window.addEventListener('resize', changeIsMobile);

		return () => {
			window.removeEventListener('resize', changeIsMobile);
		};
	}, []);
	useEffect(() => {
		if (localStorage.getItem('isOpenNavBar') === 'false') {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	}, []);

	return (
		<>
			<div className={scss.Layout}>
				{!isMobile && (
					<>
						<Header isOpen={isOpen} setIsOpen={setIsOpen} />
					</>
				)}
				<main style={{ width: '100%', overflowY: 'auto' }}>
					{!isMobile && (
						<>
							<Routes>
								<Route path="/course/:courseId/*" element={<SupHeader />} />
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					{isMobile && (
						<>
							<Routes>
								<Route
									path="/course/:courseId/*"
									element={<SupHeaderMobile />}
								/>
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					<div style={{ paddingInline: '20px', paddingTop: '24px' }}>
						<Routes>
							<Route
								path="/course/:courseId/materials/:lessonId/:getTaskId/*"
								element={<BasicBreadcrumbs />}
							/>
						</Routes>
					</div>

					<Routes>
						<Route path={'/course'} element={<MyCoursePage />} />
						<Route path="/calendar" element={<CalendarPage />} />

						<Route
							path="/course/:courseId/student"
							element={<InternalInstructorStudentsPage />}
						/>
						<Route
							path="/course/:courseId/materials"
							element={<MaterialsPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/video"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/link"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/panding"
							element={<LessonPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/accepted"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notAccepted"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/late"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notSubmitted"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/answer/:answerId"
							element={<Answer />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/addTask"
							element={<AddTaskPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/update"
							element={<EditTask />}
						/>
						<>
							<Route
								path="/course/:courseId/materials/:lessonId"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/video"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/presentation"
								element={<LessonPage />}
							/>

							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/accepted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notAccepted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/late"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notSubmitted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/answer/:answerId"
								element={<Answer />}
							/>

							<Route
								path="/course/:courseId/materials/:lessonId/lesson"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/:getTaskId/editTest"
								element={<EditTest />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/addTask"
								element={<AddTaskPage />}
							/>
						</>
						<Route
							path="/course/:courseId/rating"
							element={<RatingStudentsPage />}
						/>
						<Route path="/announcement" element={<AnnouncementPage />} />
						<Route path="trash" element={<TrashPage />} />
						<Route
							path="/course/:courseId/materials/:lessonId/test"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/createTest"
							element={<CreateTest />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/:testId/showTest"
							element={<GetTestInstructor />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/:testId/resultTest"
							element={<ResultTest />}
						/>
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutInstructor;
