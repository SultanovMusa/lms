/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENTSCOURSES {
	type Course = {
		id: number;
		title: string;
		description: string;
		image: string;
		dateOfEnd: string;
	};
	type GetStudentsResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: Course[];
	};
	type GetStudentsRequest = {
		page: string;
		size: string;
	};
}
