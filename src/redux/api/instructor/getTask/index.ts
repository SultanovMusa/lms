import { api as index } from '../../../api';
import { INSTRUCTOR } from './types';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTaskInstructorA: builder.query<
			INSTRUCTOR.TaskResponse,
			INSTRUCTOR.TaskRequest
		>({
			query: (getTaskId) => ({
				url: `/api/tasks/${getTaskId}`,
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		getTaskResult: builder.query<
			INSTRUCTOR.GetStudentResultResponse,
			INSTRUCTOR.GetStudentResultRequest
		>({
			query: ({ getTask, page }) => ({
				url: `/api/resultTask/all/${getTask}`,
				params: {
					answerStatus: page.answerStatus
				},
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		getNotSubmitedStudent: builder.query({
			query: (getTask) => ({
				url: `/api/resultTask/notAnswered/${getTask}`,

				method: 'GET'
			}),
			providesTags: ['addTask']
		})
	})
});

export const {
	useGetTaskInstructorAQuery,
	useGetTaskResultQuery,
	useGetNotSubmitedStudentQuery
} = api;
