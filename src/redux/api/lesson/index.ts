import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCard: builder.query<LESSON.GetCardsResponse, LESSON.GetCardsRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['lesson']
		}),
		getLesson: builder.query<
			LESSON.GetLessonsResponse,
			LESSON.GetLessonssRequest
		>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['lesson']
		})
	})
});

export const { useGetCardQuery, useGetLessonQuery } = api;
// https://api-v2.elchocrud.pro/api/v1/766410211a1543e59fb92144240751ef/lesson
