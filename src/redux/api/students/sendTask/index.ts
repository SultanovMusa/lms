import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postStudentTask: builder.mutation<
			STUDENT_TASK.SendTaskResponse,
			STUDENT_TASK.SendTaskRequest
		>({
			query: ({ newTask, getTask }) => ({
				url: `/api/answer/send-answer/${getTask}`,
				method: 'POST',
				body: newTask
			}),
			invalidatesTags: ['send-task']
		}),
		editSendTask: builder.mutation({
			query: ({ newTask, getTask }) => ({
				url: `/api/answer/${getTask}`,
				method: 'PATCH',
				body: newTask
			}),
			invalidatesTags: ['send-task']
		})
	})
});

export const { usePostStudentTaskMutation, useEditSendTaskMutation } = api;
