import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPresentation: builder.query<
			PRESENTATION.getResponsePresentationNew,
			PRESENTATION.getRequestPresentation
		>({
			query: (lessonId) => ({
				url: `/api/presentation/All/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		getFile: builder.query<
			PRESENTATION.getResponsePresentationFile,
			PRESENTATION.getRequestPresentation
		>({
			query: (saveId) => ({
				url: `/api/presentation/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		postPresentation: builder.mutation<
			PRESENTATION.CreateResponsePresentation,
			PRESENTATION.CreateRequestPresentation
		>({
			query: ({ presentationData, lesson }) => ({
				url: `/api/presentation/${lesson}`,
				method: 'POST',
				body: presentationData
			}),
			invalidatesTags: ['presentation']
		}),
		deletePresentation: builder.mutation({
			query: (saveIdElement) => ({
				url: `/api/presentation/${saveIdElement}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['presentation']
		}),
		editPresentation: builder.mutation<
			PRESENTATION.EditPresenTationResponse,
			PRESENTATION.EditPresenTationRequest
		>({
			query: ({ newPresentation, presentationId }) => ({
				url: `/api/presentation/${presentationId}`,
				method: 'PATCH',
				body: newPresentation
			}),
			invalidatesTags: ['presentation']
		}),
		createPresentationFile: builder.mutation({
			query: (fileObj) => ({
				url: '/file',
				method: 'POST',
				body: fileObj,
				responseHandler: 'text',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			invalidatesTags: ['presentation']
		})
	})
});
export const {
	useGetPresentationQuery,
	usePostPresentationMutation,
	useDeletePresentationMutation,
	useEditPresentationMutation,
	useGetFileQuery,
	useCreatePresentationFileMutation
} = api;
