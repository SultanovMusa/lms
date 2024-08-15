import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTrash: builder.query<
			INSTRUCTOR.GetCardsResponse,
			INSTRUCTOR.GetCardsRequest
		>({
			query: () => ({
				url: '/api/trash/findAll',
				method: 'GET'
			}),
			providesTags: ['trash']
		}),
		UpdatedTrash: builder.mutation({
			query: (id) => ({
				url: `/api/trash/restore/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['trash']
		}),
		DeleteTrash: builder.mutation({
			query: (id) => ({
				url: `/api/trash/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['trash']
		})
	})
});

export const {
	useGetTrashQuery,
	useUpdatedTrashMutation,
	useDeleteTrashMutation
} = api;
