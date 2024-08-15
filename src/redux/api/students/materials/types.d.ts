/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
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
		course: number;
		objects: Lesson[];
	};
	type MaterialsGetRequest = {
		course: number;
		page: string;
		size: string;
	};

	type MaterialsPostResponse = {
		title: string;
		createdAt: string;
	};

	type MaterialsPostRequest = {
		title: string;
		createdAt: string;
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

	type GetOneTaskResponse = {
		taskResponse: {
			id: number;
			title: string;
			description: string;
		}[];
	};
	type GetOneTaskRequest = number;
}
