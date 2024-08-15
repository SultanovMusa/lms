import {
	IconUser,
	IconDeviceDesktop,
	IconUsersGroup,
	IconUserCheck,
	IconCalendar,
	IconTrash,
	IconBellRinging2,
	IconChartHistogram
} from '@tabler/icons-react';

export const links = {
	admin: [
		{
			name: 'Аналитика',
			icon: <IconChartHistogram stroke={2} />,
			link: 'analytics'
		},
		{
			name: 'Курсы ',
			icon: <IconDeviceDesktop stroke={2} />,
			link: 'courses'
		},
		{
			name: 'Группы',
			icon: <IconUsersGroup stroke={2} />,
			link: 'group/page'
		},
		{
			name: 'Учителя',
			icon: <IconUserCheck stroke={2} />,
			link: 'teacher'
		},
		{
			name: 'Студенты',
			link: 'students',
			icon: <IconUser stroke={2} />
		},
		{
			name: 'Календарь',
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />,
			link: 'announcement'
		},
		{
			name: 'Корзина',
			icon: <IconTrash stroke={2} />,
			link: 'trash'
		}
	],
	student: [
		{
			name: 'Курсы',
			icon: <IconDeviceDesktop stroke={2} />,
			link: 'courses'
		},
		{
			name: 'Календарь',
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
		},
		{
			name: 'Объявление',
			icon: <IconBellRinging2 stroke={2} />,
			link: 'announcements'
		}
	],
	instructor: [
		{
			name: ' Курсы',
			icon: <IconDeviceDesktop stroke={2} />,
			link: 'course'
		},
		{
			name: 'Объявления',
			icon: <IconBellRinging2 stroke={2} />,
			link: 'announcement'
		},
		{
			name: 'Корзина',
			icon: <IconTrash stroke={2} />,
			link: 'trash'
		},
		{
			name: 'Календарь',
			icon: <IconCalendar stroke={2} />,
			link: 'calendar'
		}
	]
};
