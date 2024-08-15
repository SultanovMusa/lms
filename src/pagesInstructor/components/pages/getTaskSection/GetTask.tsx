import { FC, useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { useGetTaskInstructorAQuery } from '@/src/redux/api/instructor/getTask';
import Late from '../lateSection/Late';
import Panding from '../pandingSection/Panding';
import Accepted from '../acceptedSection/Accepted';
import NotAccepted from '../notAcceptedSection/NotAccepted';
import NotSubmitted from '../notSubmittedSection/NotSubmitted';
import scss from './GetTask.module.scss';

const GetTask: FC = () => {
	const { courseId, lessonId, getTaskId } = useParams();
	const navigate = useNavigate();
	const { data } = useGetTaskInstructorAQuery(Number(getTaskId));
	const [value, setValue] = useState(0);
	const { pathname } = useLocation();

	useEffect(() => {
		switch (pathname) {
			case `/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding`:
				setValue(0);
				break;
			case `/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted`:
				setValue(1);
				break;
			case `/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late`:
				setValue(3);
				break;
			case `/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted`:
				setValue(2);
				break;
			case `/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted`:
				setValue(4);
				break;
			default:
				break;
		}
	}, [pathname, courseId, lessonId, getTaskId]);

	const handleOpenPanding = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding`
		);
	};
	const handleOpenAccepted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted`
		);
	};
	const handleOpenNotAccepted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted`
		);
	};
	const handleOpenLate = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late`
		);
	};
	const handleOpenNotSubmitted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted`
		);
	};

	let datePart = '';
	let timePart = '';
	if (data?.deadline) {
		const datetime = new Date(data.deadline);
		datePart = datetime.toLocaleDateString();
		timePart = datetime.toLocaleTimeString();
	}

	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{data && (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{data?.title}</h2>
							<div className={scss.datetimeContainer}>
								<div className={scss.date}>{datePart}</div>
								<div className={scss.time}>{timePart}</div>
							</div>
						</div>
						<div className={scss.result_task}>
							<a
								href={`https://lms-b12.s3.eu-central-1.amazonaws.com/${data?.file}`}
								type=""
							>
								{data?.file}
							</a>
							<div
								className={scss.inner_html}
								dangerouslySetInnerHTML={{ __html: data?.description }}
							/>
						</div>
					</div>
				)}
				<ScrollArea
					scrollbars="xy"
					offsetScrollbars
					classNames={scss}
					type="always"
				>
					<Box className={scss.box}>
						<Tabs
							style={{ borderBottom: '1px solid #dde9f9', display: 'flex' }}
							value={value}
							onChange={(_, newValue) => setValue(newValue)}
							aria-label="basic tabs example"
						>
							<Tab
								label="Ожидание"
								id="simple-tab-0"
								className={scss.tab}
								aria-controls="simple-tabpanel-0"
								onClick={handleOpenPanding}
							/>
							<Tab
								label="Принято"
								id="simple-tab-1"
								className={scss.tab}
								aria-controls="simple-tabpanel-1"
								onClick={handleOpenAccepted}
							/>
							<Tab
								label="Не Принято"
								onClick={handleOpenNotAccepted}
								id="simple-tab-2"
								className={scss.tab}
								aria-controls="simple-tabpanel-2"
							/>
							<Tab
								label="Опоздание"
								className={scss.tab}
								id="simple-tab-3"
								aria-controls="simple-tabpanel-3"
								onClick={handleOpenLate}
							/>
							<Tab
								label="Не сдавшие"
								id="simple-tab-4"
								className={scss.tab}
								aria-controls="simple-tabpanel-4"
								onClick={handleOpenNotSubmitted}
							/>
						</Tabs>
					</Box>
				</ScrollArea>
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding` && (
					<Panding />
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted` && (
					<Accepted />
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted` && (
					<NotAccepted />
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted` && (
					<NotSubmitted />
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late` && (
					<Late />
				)}
			</div>
		</div>
	);
};

export default GetTask;
