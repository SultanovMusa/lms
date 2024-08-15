import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMaterials: builder.query<
			STUDENT_LESSON.MaterialsGetResponse,
			STUDENT_LESSON.MaterialsGetRequest
		>({
			query: ({ course, page, size }) => ({
				url: `/api/lessons/all/${course}?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		postMaterials: builder.mutation<
			STUDENT_LESSON.MaterialsPostResponse,
			STUDENT_LESSON.MaterialsPostRequest
		>({
			query: ({ postData, course }) => ({
				url: `/api/lessons/${course}`,
				method: 'POST',
				body: postData
			}),
			invalidatesTags: ['material']
		}),
		patchMaterial: builder.mutation<
			STUDENT_LESSON.MaterialsPatchResponse,
			STUDENT_LESSON.MaterialsPatchRequest
		>({
			query: ({ updateMaterial, deleteById }) => ({
				url: `/api/lessons/${deleteById}`,
				method: 'PATCH',
				body: updateMaterial
			}),
			invalidatesTags: ['material']
		}),
		deleteMaterial: builder.mutation<
			STUDENT_LESSON.MaterialsDeleteResponse,
			STUDENT_LESSON.MaterialsDeleteRequest
		>({
			query: (deleteById) => ({
				url: `/api/lessons/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['material']
		})
	})
});
export const {
	useGetMaterialsQuery,
	usePostMaterialsMutation,
	usePatchMaterialMutation,
	useDeleteMaterialMutation
} = api;
