import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCourseInstructor: builder.query<
			InstructorCourses.CoursesResponse,
			InstructorCourses.CoursesRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/course/myCourse?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['courses']
		})
	})
});

export const { useGetCourseInstructorQuery } = api;
