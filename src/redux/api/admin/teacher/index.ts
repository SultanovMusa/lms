import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/instructors?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeachersRequest
		>({
			query: (newTeacher) => ({
				url: `/api/instructors?linkForPassword=${encodeURIComponent(newTeacher.linkForPassword)}`,
				method: 'POST',
				body: newTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		patchTeacher: builder.mutation<
			TABLE.ChangeTeachersResponse,
			TABLE.ChangeTeachersRequest
		>({
			query: ({ updateTeacher, deleteById, link }) => ({
				url: `/api/instructors/${deleteById}?linkForPassword=${encodeURIComponent(link.linkForPassword)}`,
				method: 'PATCH',
				body: updateTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		deleteTeacher: builder.mutation<
			TABLE.DeleteTeacherResponse,
			TABLE.DeleteTeacherRequest
		>({
			query: (deleteById) => ({
				url: `/api/instructors/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['teacher', 'courses']
		}),
		appointTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: (instructorId) => ({
				url: `/api/instructors/${instructorId}`,
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		appointAllTeacher: builder.query<
			TABLE.appointAllTeacherResponse,
			TABLE.appointAllTeacherRequest
		>({
			query: () => ({
				url: `/api/instructors/allInstructorsName`,
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		getAllAllCoursesWithoutPagination: builder.query<
			TABLE.appointAllCoursesResponse,
			TABLE.appointAllCousesRequest
		>({
			query: () => ({
				url: `/api/course/getAllCourseWithOutPagination`,
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		getInsructorsForEdit: builder.query<
			TABLE.getInstructorForEditResponse,
			TABLE.getInstructorForEditRequests
		>({
			query: (test) => ({
				url: `/api/instructors/${test}`,
				method: 'GET'
			})
		})
	})
});

export const {
	useGetTeacherQuery,
	usePostTeacherMutation,
	usePatchTeacherMutation,
	useDeleteTeacherMutation,
	useAppointAllTeacherQuery,
	useGetAllAllCoursesWithoutPaginationQuery,
	useGetInsructorsForEditQuery
} = api;
