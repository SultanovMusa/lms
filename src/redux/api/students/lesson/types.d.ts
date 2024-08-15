/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENTLESSONMATERIALS {
	type MaterialsWorkGetResponse = {
		id: number;
		title: string;
		createdAt: string;
		lessonId: number;
	};
	type MaterialsWorkGetRequest = void;

	type MaterialsHomeWorkGetResponse = {
		id: number;
		title: string;
		description: string;
		file: string;
		image: string;
		code: string;
		deadline: string;
		links: string;
	};

	type MaterialsHomeWorkGetRequest = {
		id: number;
		title: string;
		description: string;
		file: string;
		image: string;
		code: string;
		deadline: string;
		links: string[];
	};
}
