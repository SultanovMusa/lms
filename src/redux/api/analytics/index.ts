import { api as index } from '../';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAnalyticsGroups: builder.query<
			ANALYTIC.AnalyticsResponse,
			ANALYTIC.AnalyticsRequest
		>({
			query: () => ({
				url: '/api/analytics/getAllAnalytics',
				method: 'GET'
			}),
			providesTags: ['analyticsSections']
		})
	})
});

export const { useGetAnalyticsGroupsQuery } = api;
