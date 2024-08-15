/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type getResponseLink = {
		objects: {
			id: number;
			title: string;
			url: string;
		}[];
	};
	type getRequestLink = number;

	type PostResponseLink = {
		lessonId;
		newLink: {
			title: string;
			url: string;
		};
	}[];
	type PostRequestLink = {
		lessonId;
		newLink: {
			title: string;
			url: string;
		};
	};

	type PutResponseLink = {
		linkId;
		newData: {
			title: string;
			url: string;
		};
	};
	type PutRequestLink = {
		linkId;
		newData: {
			title: string;
			url: string;
		};
	};
}
