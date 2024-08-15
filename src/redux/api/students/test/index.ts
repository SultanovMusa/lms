import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentTest: builder.query<
			STUDENTTEST.TestGetResponse,
			STUDENTTEST.TestGetRequest
		>({
			query: (lesson) => ({
				url: `/api/test/findAll/${lesson}`,
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		getTestResultStudents: builder.query<
			STUDENTTEST.TestGetResultResponse,
			STUDENTTEST.TestGetResultRequest
		>({
			query: (test) => ({
				url: `/api/answerTest/myResultTest/${test}`,
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		postTestResultStudents: builder.mutation<
			STUDENTTEST.TestPostResultResponse,
			STUDENTTEST.TestPostResultRequest
		>({
			query: ({ newData, test }) => ({
				url: `/api/answerTest/${test}`,
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['test']
		})
	})
});

export const {
	useGetStudentTestQuery,
	useGetTestResultStudentsQuery,
	usePostTestResultStudentsMutation
} = api;
