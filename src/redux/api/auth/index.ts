import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postLogin: builder.mutation<AUTH.PostFindResponse, AUTH.PostFindRequest>({
			query: (newData) => ({
				url: '/api/auth/signIn',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['auth']
		}),
		forgotPassword: builder.mutation<
			AUTH.PostForgotPasswordResponse,
			AUTH.PostForgotPasswordRequest
		>({
			query: (newData) => ({
				url: `/api/auth/forgotPassword?email=${encodeURIComponent(newData.email)}&link=${encodeURIComponent(newData.link)}`,
				method: 'PUT',
				body: newData
			}),
			invalidatesTags: ['auth']
		}),
		createPassword: builder.mutation<
			AUTH.CreateNewPasswordResponse,
			AUTH.CreateNewPasswordRequest
		>({
			query: (newData) => ({
				url: `/api/auth/createPassword?password=${encodeURIComponent(newData.password)}&confirm=${encodeURIComponent(newData.confirm)}&uuid=${encodeURIComponent(newData.uuid)}`,
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['auth']
		})

		// postForgot: builder.query<LOGIN.PostLoginResponse, LOGIN.PostLoginRequest>({
		// 	query: () => ({
		// 		url: '',
		// 		method: 'POST'
		// 	}),
		// 	providesTags: ['auth']
		// })
	})
});

export const {
	usePostLoginMutation,
	useForgotPasswordMutation,
	useCreatePasswordMutation
} = api;
