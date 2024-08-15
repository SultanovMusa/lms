import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getRatingStudentsForStudent: builder.query<
			RATING_STUDENT.GetRatingStudentsForStudentResponse,
			RATING_STUDENT.GetRatingStudentsForStudentRequest
		>({
			query: (courseId) => ({
				url: `/api/ratingApi/findAllRating/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['ratingStudents']
		}),

		getYourRatingStudent: builder.query<
			RATING_STUDENT.GetYourRatingStudentResponse,
			RATING_STUDENT.GetYourRatingStudentRequest
		>({
			query: (courseId) => ({
				url: `/api/ratingApi/findAllMyRating/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['ratingStudents']
		})
	})
});

export const {
	useGetRatingStudentsForStudentQuery,
	useGetYourRatingStudentQuery
} = api;
