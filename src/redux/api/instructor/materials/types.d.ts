/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENT_LESSON {
	type Lesson = {
		[x: string]: number | null;
		id: number;
		title: string;
		createdAt: string;
	};
	type MaterialsGetResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: Lesson[];
	};
	type MaterialsGetRequest = {
		course: number;
		page: string;
		size: string;
	};

	type MaterialsPostResponse = {
		course: number;
		postData: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsPostRequest = {
		course: number;
		postData: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsPatchResponse = {
		updateMaterial: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsPatchRequest = {
		deleteById: number | null;
		updateMaterial: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsDeleteResponse = void;
	type MaterialsDeleteRequest = number | null;
}
