import { api as index } from '../..';
export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementTable: builder.query<
			ANNOUNCEMENT.GetAnnouncementResponse,
			ANNOUNCEMENT.GetAnnouncementRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/announcement/search?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['announcement']
		}),
		getAnnouncementGroups: builder.query<
			ANNOUNCEMENT.GetAnnouncementGroupsResponse,
			ANNOUNCEMENT.GetAnnouncementGroupsRequest
		>({
			query: () => ({
				url: '/api/groups/getAll',
				method: 'GET'
			}),
			providesTags: ['announcement']
		}),
		// ! post
		postAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.PostAnnouncementPropsResponse,
			ANNOUNCEMENT.PostAnnouncementPropsRequest
		>({
			query: (newAnnouncement) => ({
				url: '/api/announcement',
				method: 'POST',
				body: newAnnouncement
			}),
			invalidatesTags: ['announcement']
		}),
		// ! delete
		deleteAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.DeleteAnnouncementPropsResponse,
			ANNOUNCEMENT.DeleteAnnouncementPropsRequest
		>({
			query: (id) => ({
				url: `/api/announcement/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['announcement']
		}),
		// ! patch
		editAnnouncement: builder.mutation<
			ANNOUNCEMENT.EditAnnouncementResponse,
			ANNOUNCEMENT.EditAnnouncementRequest
		>({
			query: ({ editAnnouncementData, saveIdElement }) => ({
				url: `/api/announcement/${saveIdElement}`,
				method: 'PATCH',
				body: editAnnouncementData
			}),
			invalidatesTags: ['announcement']
		}),
		showAnnouncement: builder.mutation<
			ANNOUNCEMENT.ShowAnnouncementResponse,
			ANNOUNCEMENT.ShowAnnouncementRequest
		>({
			query: ({ testId, isPublished }) => ({
				url: `/api/announcement/${testId}?isPublished=${isPublished}`,
				method: 'PUT'
			}),
			invalidatesTags: ['announcement']
		})
	})
});
export const {
	useGetAnnouncementTableQuery,
	useGetAnnouncementGroupsQuery,
	usePostAnnouncementTableMutation,
	useDeleteAnnouncementTableMutation,
	useEditAnnouncementMutation,
	useShowAnnouncementMutation
} = api;
