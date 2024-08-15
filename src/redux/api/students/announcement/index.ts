import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementStudent: builder.query<
			ANNOUNCEMENT.GetAnnouncementStudentResponse,
			ANNOUNCEMENT.GetAnnouncementStudentRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/announcement?${page}&${size}&isView=true`,
				method: 'GET'
			}),
			providesTags: ['announcementStudent']
		})
	})
});

export const { useGetAnnouncementStudentQuery } = api;
