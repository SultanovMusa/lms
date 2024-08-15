import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getRatingStudents: builder.query<
			RATING.GetRatingStudentsResponse,
			RATING.GetRatingStudentsRequest
		>({
			query: (courseId) => ({
				url: `/api/ratingApi/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		}),
		getRatingGroups: builder.query<
			RATING.GetRatingGroupsResponse,
			RATING.GetRatingGroupsRequest
		>({
			query: (saveId) => ({
				url: `/api/course/getAllGroupOfCourse/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		}),
		deleteGroups: builder.mutation({
			query: ({ saveId, selectedId }) => ({
				url: `/api/course/deleteGroupOfCourse/${saveId}/${selectedId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['rating']
		}),
		postProcents: builder.mutation<
			RATING.CreateProcentsResponse,
			RATING.CreateProcentsRequest
		>({
			query: ({ newData, saveId }) => ({
				url: `/api/ratingApi/${saveId}`,
				method: 'POST',
				params: {
					...newData
				}
			}),
			invalidatesTags: ['rating']
		}),

		getResultRating: builder.query({
			query: (answerId) => ({
				url: `/api/resultTask/${answerId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		})
	})
});

export const {
	useGetRatingStudentsQuery,
	useGetRatingGroupsQuery,
	usePostProcentsMutation,
	useGetResultRatingQuery,
	useDeleteGroupsMutation
} = api;
