import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getGroup: builder.query<GROUPS.GroupsResponse, GROUPS.GroupsRequest>({
			query: ({ page, size }) => ({
				url: `/api/groups?${page}&${size}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			providesTags: ['groups']
		}),
		createGroup: builder.mutation<
			GROUPS.CreateGroupResponse,
			GROUPS.CreateGroupRequest
		>({
			query: (newGroup) => ({
				url: '/api/groups',
				method: 'POST',
				body: newGroup
			}),
			invalidatesTags: ['groups']
		}),
		updateGroup: builder.mutation<
			GROUPS.UpdateGroupResponse,
			GROUPS.UpdateGroupRequest
		>({
			query: ({ newGroup, saveId }) => ({
				url: `/api/groups/${saveId}`,
				method: 'PATCH',
				body: newGroup
			}),
			invalidatesTags: ['groups']
		}),
		deleteGroup: builder.mutation({
			query: (deleteById) => ({
				url: `/api/groups/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['groups']
		}),
		getGroupStudent: builder.query<
			GROUPS.GetStudentsGroupResponse,
			GROUPS.GetStudentsGroupRequest
		>({
			query: ({ pages, group }) => ({
				url: `/api/students/studentsOfGroup/${group}?${pages.page}&${pages.size}`,
				method: 'GET'
			}),
			providesTags: ['groups']
		}),
		createGroupFile: builder.mutation({
			query: (formData) => ({
				url: '/file',
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			invalidatesTags: ['groups']
		})
	})
});

export const {
	useGetGroupQuery,
	useCreateGroupMutation,
	useUpdateGroupMutation,
	useDeleteGroupMutation,
	useGetGroupStudentQuery,
	useCreateGroupFileMutation
} = api;
