import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: ({ course, page, size }) => ({
				url: `/api/lessons/all/${course}?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		getOneTaskName: builder.query<
			MATERIALS.GetOneTaskResponse,
			MATERIALS.GetOneTaskRequest
		>({
			query: (lesson) => ({
				url: `/api/tasks/taskOfLesson/${lesson}`,
				method: 'GET'
			}),
			providesTags: ['lesson']
		})
	})
});

export const { useGetStudentMaterialsQuery, useGetOneTaskNameQuery } = api;
