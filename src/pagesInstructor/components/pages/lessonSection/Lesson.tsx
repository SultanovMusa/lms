import { Tab, Tabs } from '@mui/material';
import scss from './Lesson.module.scss';
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
import VideoLessonPage from '../VideoLessonPage';

import PresentationPage from '../PresentationPage';
import { Box, ScrollArea } from '@mantine/core';
import CrateTask from '../createTaskSection/CrateTask';
import GetTask from '../getTaskSection/GetTask';
import Test from '../testSection/TestInstructor';
import Link from '../linkSection/Link';
import classes from './Lesson.module.scss';

const Lesson = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { courseId, lessonId, getTaskId } = useParams();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const openInstructorPresentation = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/presentation`
		);
	};

	const handleOpenVideo = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/video`);
	};
	const handleOpenLink = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/link`);
	};
	const openLesson = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/lesson`);
	};

	const handleOpenTest = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/test`);
	};

	useEffect(() => {
		if (
			pathname ===
			`/instructor/course/${courseId}/materials/${lessonId}/presentation`
		) {
			setValue(1);
		} else if (
			pathname === `/instructor/course/${courseId}/materials/${lessonId}/lesson`
		) {
			setValue(2);
		} else if (
			pathname === `/instructor/course/${courseId}/materials/${lessonId}/link`
		) {
			setValue(3);
		} else if (
			pathname === `/instructor/course/${courseId}/materials/${lessonId}/test`
		) {
			setValue(4);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					background: '#fff',
					borderRadius: '10px',
					width: '100%',
					height: '100vh !important',
					maxHeight: '100vh',
					minHeight: '100vh'
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
							<ScrollArea type="always" scrollbars="xy" classNames={classes}>
								<Box>
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example"
										className={scss.tabs}
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
											onClick={openInstructorPresentation}
										/>

										<Tab
											icon={<IconFile stroke={2} />}
											label="Задание"
											id="simple-tab-2"
											className={scss.tab}
											aria-controls="simple-tabpanel-2"
											onClick={openLesson}
										/>

										<Tab
											icon={<IconLink stroke={2} />}
											label="Ссылка"
											className={scss.tab}
											onClick={handleOpenLink}
											id="simple-tab-3"
											aria-controls="simple-tabpanel-3"
										/>

										<Tab
											icon={<IconAB2 stroke={2} />}
											label="Тест"
											id="simple-tab-4"
											className={scss.tab}
											aria-controls="simple-tabpanel-4"
											onClick={handleOpenTest}
										/>
									</Tabs>
								</Box>
							</ScrollArea>
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/video` && (
								<>
									<VideoLessonPage />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/presentation` && (
								<>
									<PresentationPage />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson` && (
								<>
									<CrateTask />
								</>
							)}

							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/test` && (
								<>
									<Test />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/link` && (
								<>
									<Link />
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lesson;
