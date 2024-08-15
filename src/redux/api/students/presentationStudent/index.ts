import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPresentationForStudent: builder.query<
			PRESENTATION.getResponsePresentation,
			PRESENTATION.getRequestPresentation
		>({
			query: (lessonId) => ({
				url: `/api/presentation/All/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		getFileForStudent: builder.query<
			PRESENTATION.getResponsePresentation,
			PRESENTATION.getRequestPresentation
		>({
			query: (saveId) => ({
				url: `/api/presentation/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		})
	})
});
export const { useGetPresentationForStudentQuery, useGetFileForStudentQuery } =
	api;
