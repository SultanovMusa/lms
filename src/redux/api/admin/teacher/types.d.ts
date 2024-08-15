/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TABLE {
	type Teacher = {
		id: number | null;
		fullName: string;
		login: string;
		specialization: string;
		email: string;
		phoneNumber: string;
	};

	type GetTeachersResponse = {
		objects: Teacher[];
		totalPages: number;
		totalObjects: number;
		page: string;
		size: string;
	};
	type GetTeacherRequest = {
		page: string;
		size: string;
	};

	type CreateTeachersResponse = {
		firstName: string;
		lastName: string;
		specialization: string;
		email: string;
		phoneNumber: string;
		linkForPassword: string;
	}[];
	type CreateTeachersRequest = {
		firstName: string;
		lastName: string;
		specialization: string;
		email: string;
		phoneNumber: string;
		linkForPassword: string;
	};
	type ChangeTeachersResponse = {
		updateTeacher: {
			firstName: string;
			lastName: string;
			specialization: string;
			email: string;
			phoneNumber: string;
			courseIds: string;
		};
	}[];

	type ChangeTeachersRequest = {
		link: {
			linkForPassword: string;
		};
		deleteById: number | null;
		updateTeacher: {
			firstName: string;
			lastName: string;
			specialization: string;
			email: string;
			phoneNumber: string;
			courseIds: string[];
		};
	};
	type DeleteTeacherResponse = void;
	type DeleteTeacherRequest = number;

	type appointAllTeacherResponse = {
		Id: number;
		instructorName: string;
	}[];
	type appointAllTeacherRequest = void;
	type appointAllCoursesResponse = {
		id: number;
		courseName: string;
	}[];
	type appointAllCousesRequest = void;

	type getInstructorForEditResponse = {
		id: number;
		fullName: string;
		specialization: string;
		phoneNumber: string;
		email: string;
		courseNames: string;
	};
	type getInstructorForEditRequests = number;
}
