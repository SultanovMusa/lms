import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getExamInstructor: builder.query<EXAM.GetExamResponse, EXAM.GetExamRequest>(
			{
				query: (test) => ({
					url: `/api/exam/${test}`,
					method: 'GET'
				}),
				providesTags: ['exam']
			}
		),
		createExamInstructor: builder.mutation<
			EXAM.PostExamResponse,
			EXAM.PostExamRequest
		>({
			query: ({ course, examData }) => ({
				url: `/api/exam/${course}`,
				method: 'POST',
				body: examData
			}),
			invalidatesTags: ['exam']
		}),
		deleteExam: builder.mutation({
			query: (deleteExamId) => ({
				url: `/api/exam/${deleteExamId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['exam']
		}),

		updateExamPoint: builder.mutation<
			EXAM.PatchExamResultPointResponse,
			EXAM.PatchExamResultPointRequest
		>({
			query: ({ examId, studentId, newPoint }) => ({
				url: `/api/exam/editExamPoint/${studentId}/${examId}`,
				method: 'PATCH',
				body: newPoint
			}),
			invalidatesTags: ['exam']
		})
	})
});

export const {
	useCreateExamInstructorMutation,
	useGetExamInstructorQuery,
	useDeleteExamMutation,
	useUpdateExamPointMutation
} = api;
