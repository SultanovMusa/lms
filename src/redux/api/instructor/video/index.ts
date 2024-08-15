import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getVideoLesson: builder.query<
			VIDEO_LESSON.VideoLessonGetResponse,
			VIDEO_LESSON.VideoLessonGetRequest
		>({
			query: (lessonId) => ({
				url: `/api/videos/All/${lessonId}`,
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
		}),
		// !
		postVideoLesson: builder.mutation<
			VIDEO_LESSON.VideoLessonPostResponse,
			VIDEO_LESSON.VideoLessonPostRequest
		>({
			query: ({ postData, lesson }) => ({
				url: `/api/videos/${lesson}`,
				method: 'POST',
				body: postData
			}),
			invalidatesTags: ['videoLesson']
		}),
		patchVideoLesson: builder.mutation<
			VIDEO_LESSON.VideoLessonPatchResponse,
			VIDEO_LESSON.VideoLessonPatchRequest
		>({
			query: ({ newVideoLesson, saveIdElement }) => ({
				url: `/api/videos/${saveIdElement}`,
				method: 'PUT',
				body: newVideoLesson
			}),
			invalidatesTags: ['videoLesson']
		}),
		deleteVideoLesson: builder.mutation({
			query: (deleteId) => ({
				url: `/api/videos/delete/${deleteId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['videoLesson']
		})
	})
});

export const {
	useGetVideoLessonQuery,
	usePostVideoLessonMutation,
	usePatchVideoLessonMutation,
	useDeleteVideoLessonMutation,
	useGetIdVideoLessonQuery
} = api;
