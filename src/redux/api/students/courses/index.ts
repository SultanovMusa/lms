import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentsCourse: builder.query<
			STUDENTSCOURSES.GetStudentsResponse,
			STUDENTSCOURSES.GetStudentsRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/course/myCourse?${page}&${size}`,
				method: 'GET'
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem('token')}`
				// }
			}),
			providesTags: ['courses']
		})
	})
});

export const { useGetStudentsCourseQuery } = api;
