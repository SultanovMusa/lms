import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BACKEND_URL,

	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryExtended,
	refetchOnReconnect: true,
	refetchOnFocus: false,
	tagTypes: [
		'lesson',
		'teacher',
		'analyticsSections',
		'student',
		'groups',
		'trash',
		'courses',
		'announcement',
		'material',
		'videoLesson',
		'addTask',
		'presentation',
		'auth',
		'exam',
		'student',
		'materialsLesson',
		'link',
		'rating',
		'test',
		'ratingStudents',
		'notification',
		'send-task',
		'announcementStudent'
	],
	endpoints: () => ({})
});
