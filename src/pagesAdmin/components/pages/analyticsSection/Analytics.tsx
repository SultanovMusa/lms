import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import scss from './Analytics.module.scss';
import { useGetAnalyticsGroupsQuery } from '@/src/redux/api/analytics';
import { Preloader } from '@/src/ui/preloader/Preloader';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		borderColor: string;
		borderWidth: number;
	}[];
}

function Analytics() {
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [
			{
				label: 'Users Gained',
				data: [],
				backgroundColor: [
					'#4bc0c0',
					'#ecf0f1',
					'#50AF95',
					'#f3ba2f',
					'#2a71d0'
				],
				borderColor: 'black',
				borderWidth: 2
			}
		]
	});

	const { data, isLoading } = useGetAnalyticsGroupsQuery();

	useEffect(() => {
		if (data && data.length) {
			const labels = data.map((item) => item.year.toString());
			const userStudents = data.map((item) => item.groups);
			const userGraduated = data.map((item) => item.courses);
			const userGroup = data.map((item) => item.instructors);
			const userCourse = data.map((item) => item.students);
			const userInstructors = data.map((item) => item.graduated);

			setChartData({
				labels: labels,
				datasets: [
					{
						label: 'Groups',
						data: userGroup,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Course',
						data: userCourse,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Instructor',
						data: userInstructors,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: ' Students',
						data: userStudents,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Graduated',
						data: userGraduated,
						backgroundColor: [
							'#ff6384',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					}
				]
			});
		}
	}, [data]);

	if (isLoading)
		return (
			<div>
				<Preloader />
			</div>
		);

	return (
		<div className={scss.chart}>
			{chartData && chartData.datasets.length > 0 && (
				<Bar
					options={{
						responsive: true,
						plugins: {
							legend: {
								position: 'top'
							},
							title: {
								display: true,
								text: 'User Statistics'
							}
						}
					}}
					data={chartData}
				/>
			)}
		</div>
	);
}

export default Analytics;
