import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentsTable: builder.query<
			STUDENTS.TablesStudentResponse,
			STUDENTS.TableStudentRequest
		>({
			query: ({ course, page, size }) => ({
				url: `/api/course/findAllInstructorsAndStudentsOfCourse/${course}?${page}&${size}&role=STUDENT`,
				method: 'GET'
			}),
			providesTags: ['student']
		}),
		getGroupTable: builder.query<
			STUDENTS.TableStudentResponse,
			STUDENTS.TableStudentRequest
		>({
			query: () => ({
				url: `/api/groups/getAll`,
				method: 'GET'
			}),
			providesTags: ['student']
		}),
		postGroupTable: builder.mutation<
			STUDENTS.PostStudentToGroupPropsResponse,
			STUDENTS.PostStudentToGroupPropsRequest
		>({
			query: ({ selectedIds, course }) => ({
				url: `/api/course/assignInGroupToCourse/${selectedIds}/${course}`,
				method: 'POST'
			}),
			invalidatesTags: ['student']
		})
	})
});

export const {
	useGetStudentsTableQuery,
	useGetGroupTableQuery,
	usePostGroupTableMutation
} = api;
