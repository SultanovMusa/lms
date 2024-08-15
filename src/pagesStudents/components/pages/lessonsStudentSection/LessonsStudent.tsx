import { Tab, Tabs } from '@mui/material';
import scss from './LessonsStudent.module.scss';
import { useEffect, useState } from 'react';
import {
	IconAB2,
	IconBrandYoutubeKids,
	IconDeviceDesktop,
	IconFile,
	IconLink
} from '@tabler/icons-react';
import 'keen-slider/keen-slider.min.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import StudentVideoLessonPage from '../StudentVideoLessonPage';
import { Box, ScrollArea } from '@mantine/core';
import StudentPresentationPage from '../StudentPresentationPage';
import TestSection from '../TestSection';
import Lesson from '../lesson/Lessons';
import LinkPage from '../LinkPage';

const LessonsStudent = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();

	const { pathname } = useLocation();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const { coursesId, lessonId } = useParams();

	const handleOpenVideo = () => {
		navigate(`/courses/${coursesId}/materials/${lessonId}/video`);
	};

	const openStudentPresentation = () => {
		navigate(`/courses/${coursesId}/materials/${lessonId}/presentation`);
	};
	const OpenTest = () => {
		navigate(`/courses/${coursesId}/materials/${lessonId}/test`);
	};
	const OpenLesson = () => {
		navigate(`/courses/${coursesId}/materials/${lessonId}/lesson`);
	};
	const OpenLink = () => {
		navigate(`/courses/${coursesId}/materials/${lessonId}/link`);
	};

	useEffect(() => {
		if (pathname === `/courses/${coursesId}/materials/${lessonId}`) {
			navigate(`/courses/${coursesId}/materials/${lessonId}/video`);
		}
	}, [pathname]);

	useEffect(() => {
		if (
			pathname === `/courses/${coursesId}/materials/${lessonId}/presentation`
		) {
			setValue(1);
		} else if (
			pathname === `/courses/${coursesId}/materials/${lessonId}/lesson`
		) {
			setValue(2);
		} else if (
			pathname === `/courses/${coursesId}/materials/${lessonId}/link`
		) {
			setValue(3);
		} else if (
			pathname === `/courses/${coursesId}/materials/${lessonId}/test`
		) {
			setValue(4);
		} else if (
			pathname === `/courses/${coursesId}/materials/${lessonId}/video`
		) {
			setValue(0);
		}
	});
	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					background: '#fff',
					borderRadius: '10px',
					width: '100%',
					height: '100vh',
					minHeight: '100vh',
					maxHeight: '100vh'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start'
					}}
				>
					<div className={scss.container}>
						<div className={scss.content}>
							<ScrollArea type="always" offsetScrollbars classNames={scss}>
								<Box>
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example"
									>
										<Tab
											icon={<IconBrandYoutubeKids stroke={2} />}
											label="Видеоурок"
											id="simple-tab-0"
											className={scss.tab}
											aria-controls="simple-tabpanel-0"
											onClick={handleOpenVideo}
										/>
										<Tab
											icon={<IconDeviceDesktop stroke={2} />}
											label="Презентация"
											id="simple-tab-1"
											className={scss.tab}
											aria-controls="simple-tabpanel-1"
											onClick={openStudentPresentation}
										/>
										<Tab
											icon={<IconFile stroke={2} />}
											label="Задание"
											id="simple-tab-2"
											className={scss.tab}
											aria-controls="simple-tabpanel-2"
											onClick={OpenLesson}
										/>
										<Tab
											icon={<IconLink stroke={2} />}
											onClick={OpenLink}
											label="Ссылка"
											className={scss.tab}
											id="simple-tab-3"
											aria-controls="simple-tabpanel-3"
										/>
										<Tab
											icon={<IconAB2 stroke={2} />}
											label="Тест"
											id="simple-tab-4"
											className={scss.tab}
											aria-controls="simple-tabpanel-4"
											onClick={OpenTest}
										/>
									</Tabs>
								</Box>
							</ScrollArea>
							{pathname ===
								`/courses/${coursesId}/materials/${lessonId}/video` && (
								<>
									<StudentVideoLessonPage />
								</>
							)}
							{pathname ===
								`/courses/${coursesId}/materials/${lessonId}/presentation` && (
								<>
									<StudentPresentationPage />
								</>
							)}
							{pathname ===
								`/courses/${coursesId}/materials/${lessonId}/test` && (
								<>
									<TestSection />
								</>
							)}
							{pathname ===
								`/courses/${coursesId}/materials/${lessonId}/lesson` && (
								<>
									<p>
										<Lesson />
									</p>
								</>
							)}
							{pathname ===
								`/courses/${coursesId}/materials/${lessonId}/link` && (
								<>
									<p>
										<LinkPage />
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonsStudent;
