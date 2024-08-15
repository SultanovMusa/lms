import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentMaterialsWork: builder.query<
			STUDENTLESSONMATERIALS.MaterialsWorkGetResponse,
			STUDENTLESSONMATERIALS.MaterialsWorkGetRequest
		>({
			query: (lessonId) => ({
				url: `/api/lessons/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['materialsLesson']
		}),
		getStudentMaterialsHomeWork: builder.query<
			STUDENTLESSONMATERIALS.MaterialsHomeWorkGetResponse,
			STUDENTLESSONMATERIALS.MaterialsHomeWorkGetRequest
		>({
			query: (lessonId) => ({
				url: `/api/tasks/taskOfLesson/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['materialsLesson']
		})
	})
});
export const {
	useGetStudentMaterialsWorkQuery,
	useGetStudentMaterialsHomeWorkQuery
} = api;
