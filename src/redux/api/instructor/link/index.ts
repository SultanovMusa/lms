import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getLink: builder.query<MATERIALS.getResponseLink, MATERIALS.getRequestLink>(
			{
				query: (lessonId) => ({
					url: `/api/links/findAll/${lessonId}`,
					method: 'GET'
				}),
				providesTags: ['link']
			}
		),
		postLink: builder.mutation<
			MATERIALS.PostResponseLink,
			MATERIALS.PostRequestLink
		>({
			query: ({ lessonId, newLink }) => ({
				url: `/api/links/addLink/${lessonId}`,
				method: 'POST',
				body: newLink
			}),
			invalidatesTags: ['link']
		}),
		deleteLink: builder.mutation({
			query: (saveIdElement) => ({
				url: `/api/links/delete/${saveIdElement}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['link']
		}),
		editLink: builder.mutation<
			MATERIALS.PutResponseLink,
			MATERIALS.PutRequestLink
		>({
			query: ({ linkId, newData }) => ({
				url: `/api/links/updateLink/${linkId}`,
				method: 'PUT',
				body: newData
			}),
			invalidatesTags: ['link']
		})
	})
});

export const {
	useGetLinkQuery,
	usePostLinkMutation,
	useDeleteLinkMutation,
	useEditLinkMutation
} = api;
