/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADMINCOURSES {
	type Courses = {
		id: number;
		image: string | null;
		title: string;
		description: string;
		dateOfEnd: string;
	};
	type CoursesAdminResponse = {
		page?: string;
		size?: string;
		totalPages: number;
		totalObjects: number;
		objects: Courses[];
	};
	type CoursesAdminRequest = {
		page: string;
		size: string;
	};
	type CreateAdminCourseResponse = {
		newCourse: {
			image: string | null;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	}[];
	type CreateAdminCourseRequest = {
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: string;
	};
	type UpdateCourseResponse = {
		saveId: number | null;
		newCourses: {
			image: string | null;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	}[];
	type UpdateCourseRequest = {
		saveId: number | null;
		newCourses: {
			image: string | null;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	};

	type Student = {
		id: number;
		fullName: string;
		courseName: string;
		specializationOrStudyFormat: string;
		phoneNumber: string;
		email: string;
		isBlock: false;
	};

	type GetInstructorCourseResponse = {
		page: string;
		size: string;
		totalPages: number;
		totalObjects: number;
		saveId: number | null;
		objects: Student[];
	};
	type GetInstructorCourseRequest = {
		course: number;
		pages: {
			page: string;
			size: string;
			role: string;
		};
	};
}
