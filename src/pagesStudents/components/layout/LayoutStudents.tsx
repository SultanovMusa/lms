import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import CalendarPage from '../pages/CalendarPage';
import SupHeader from '@/src/ui/supHeader/SupHeader';
import CoursesPage from '../pages/CoursesPage';
import LessonListPage from '../pages/LessonListPage';
import LessonsStudentPage from '../pages/LessonsStudentPage';
import RatingPage from '../pages/RatingPage';
import BasicBreadcrumbs from '@/src/ui/breadCrumbs/BreadCrumbs';
import GetTest from '../pages/getTestSection/GetTest';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SubHeaderMobile';
import SupHeaderCourses from '@/src/ui/supheaderCourses/SupHeaderCourses';
import GetOneTask from '../pages/getOneTask/GetOneTask';
import ResultTest from '../pages/resultTest/ResultTest';
import SendOneTask from '../pages/sendOneTask/SendOneTask';
import AnnouncementPage from '../pages/AnnouncementPage';
import EditSendTask from '../pages/editSendtask/EditSendTask';

const LayoutStudents = () => {
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
								<Route path="/courses/:courseId/*" element={<SupHeader />} />
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					{isMobile && (
						<>
							<Routes>
								<Route
									path="/courses/:courseId/*"
									element={<SupHeaderMobile />}
								/>
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					<div style={{ paddingInline: '20px', paddingTop: '20px' }}>
						<Routes>
							<Route
								path="/courses/:coursesId/*"
								element={<BasicBreadcrumbs />}
							/>
							<Route
								path="/courses/:coursesId/materials/:lessonId/*"
								element={<BasicBreadcrumbs />}
							/>
							<Route
								path="/courses/:coursesId/materials/:lessonId/lesson/:getTaskId/*"
								element={<BasicBreadcrumbs />}
							/>
							<Route
								path="/courses/:coursesId/materials/:lessonId/:testId/*"
								element={<BasicBreadcrumbs />}
							/>
						</Routes>
					</div>
					<Routes>
						<Route path="/courses" element={<CoursesPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/announcements" element={<AnnouncementPage />} />
						<Route
							path="/courses/:coursesId/materials"
							element={<LessonListPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId"
							element={<LessonsStudentPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/video"
							element={<LessonsStudentPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/lesson/:getTaskId"
							element={<GetOneTask />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/lesson/:getTaskId/send-task"
							element={<SendOneTask />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/lesson/:getTaskId/edit-task"
							element={<EditSendTask />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/lesson"
							element={<LessonsStudentPage />}
						/>

						<Route
							path="/courses/:coursesId/materials/:lessonId/presentation"
							element={<LessonsStudentPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/test"
							element={<LessonsStudentPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/:testId/showTest"
							element={<GetTest />}
						/>
						<Route
							path="/courses/:coursesId/materials/:lessonId/:testId/resultTest"
							element={<ResultTest />}
						/>
						<Route path="/courses/:coursesId/rating" element={<RatingPage />} />
						<Route
							path="/courses/:courseId/materials/:lessonId/link"
							element={<LessonsStudentPage />}
						/>
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutStudents;
