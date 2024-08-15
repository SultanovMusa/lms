import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getVideoLessonForStudent: builder.query<
			VIDEO_LESSON.VideoLessonGetResponse,
			VIDEO_LESSON.VideoLessonGetRequest
		>({
			query: (lesson) => ({
				url: `/api/videos/All/${lesson}`,
				method: 'GET'
			}),
			providesTags: ['videoLesson']
		}),
		// !
		getIdVideoLesson: builder.query<
			VIDEO_LESSON.VideoIDGetResponse,
			VIDEO_LESSON.VideoIDGetRequest
		>({
			query: (saveId) => ({
				url: `/api/videos/ById/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['videoLesson']
		})
	})
});

export const { useGetVideoLessonForStudentQuery, useGetIdVideoLessonQuery } =
	api;
