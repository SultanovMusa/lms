/* eslint-disable @typescript-eslint/no-unused-vars */
namespace AUTH {
	type PostFindResponse = {
		token: string;
		// login: string;
		// password: string;
	};
	type PostFindRequest = {
		login: string;
		password: string;
	};
	type PostForgotPasswordResponse = {
		email: string;
		link: string;
		// login: string;
		// password: string;
	};
	type PostForgotPasswordRequest = {
		email: string;
		link: string;
	};

	type CreateNewPasswordResponse = {
		password: string;
		confirm: string;
		uuid: number;
	};

	type CreateNewPasswordRequest = {
		password: string;
		confirm: string;
		uuid: number;
	};
}
