import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotification: builder.query<
			NOTIFICATION.NotificationGetResponse,
			NOTIFICATION.NotificationGetRequest
		>({
			query: () => ({
				url: `/api/notifications/findAll?isView=false`,
				method: 'GET'
			}),
			providesTags: ['notification']
		}),
		getNotificationTrue: builder.query<
			NOTIFICATION.NotificationGetResponse,
			NOTIFICATION.NotificationGetRequest
		>({
			query: () => ({
				url: `/api/notifications/findAll?isView=true`,
				method: 'GET'
			}),
			providesTags: ['notification']
		}),
		getViewNotification: builder.query({
			query: (notificationId) => ({
				url: `/api/notifications/${notificationId}`,
				method: 'GET'
			}),
			providesTags: ['notification']
		})
	})
});
export const {
	useGetNotificationQuery,
	useGetViewNotificationQuery,
	useGetNotificationTrueQuery
} = api;
