import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAdmin.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import Material from '@/src/ui/material/Material';
import CalendarPage from '../pages/CalendarPage';
import AnalyticsPage from '@/src/pagesAdmin/components/pages/AnalyticsPage.tsx';
import TrashPage from '../pages/TrashPage';
import TeacherPage from '../pages/TeacherPage.tsx';
import CoursesPage from '../pages/CoursePage.tsx';
import StudentsPage from '../pages/StudentsPage.tsx';
import InternalStudentsPage from '../pages/InternalStudentsPage.tsx';
import SupHeader from '@/src/ui/supHeader/SupHeader.tsx';
import AnnouncementPage from '../pages/AnnouncementPage.tsx';
import InternalCoursesPage from '../pages/InternalCourseStudentPage.tsx';
import CoursesTeacher from '../pages/coursesTeacher/CoursesTeacher.tsx';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SubHeaderMobile.tsx';
import Groups from '../pages/groupSection/Group.tsx';
import SupHeaderCourses from '@/src/ui/supheaderCourses/SupHeaderCourses.tsx';

const LayoutAdmin = () => {
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

					<Routes>
						<Route path="/analytics" element={<AnalyticsPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/teacher" element={<TeacherPage />} />

						<Route path="/trash" element={<TrashPage />} />

						<Route
							path="/courses/:coursesId/:matelials"
							element={<Material />}
						/>

						<Route path={'/students'} element={<StudentsPage />} />
						<Route path={'/courses'} element={<CoursesPage />} />
						<Route
							path="/courses/:courseId/student"
							element={<InternalCoursesPage />}
						/>

						<Route
							path="/courses/:courseId/teacher"
							element={<CoursesTeacher />}
						/>
						<Route path="/group" element={<Groups />} />
						<Route path="/group/:groupId" element={<InternalStudentsPage />} />
						<Route path="/group/page" element={<Groups />} />
						<Route path="/announcement" element={<AnnouncementPage />} />
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutAdmin;
