/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PRESENTATION {
	type getResponsePresentation = {
		id: number;
		title: string;
		file: string;
		description: string;
	}[];
	type getResponsePresentationFile = {
		id: number;
		title: string;
		file: string;
		description: string;
	};

	type getResponsePresentationNew = {
		id: number;
		title: string;
		file: string;
		description: string;
	}[];

	type getRequestPresentation = number;

	type CreateResponsePresentation = {
		lessonId: number;
		presentationData: {
			title: string;
			file: string | null;
			description: string;
		}[];
	};
	type CreateRequestPresentation = {
		lesson: number;
		presentationData: {
			title: string;
			file: string | null;
			description: string;
		};
	};
	type EditPresenTationResponse = {
		presentationId: number;
		newPresentation: {
			title: string;
			file: string | null;
			description: string;
		};
	};
	type EditPresenTationRequest = {
		presentationId: number;
		newPresentation: {
			title: string;
			file: string | null;
			description: string;
		};
	};
}
