/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TEST {
	type Test = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
	};
	type getTestResponse = {
		testResponseForGetAll: Test[];
	};
	type getTestRequest = number;

	type getTestInsideResponse = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
		questionResponseList: {
			questionId: number;
			title: string;
			point: number;
			questionType: string;
			optionResponses: {
				optionId: number;
				option: string;
				isTrue: boolean;
			}[];
		}[];
	};

	interface QuestionResponseList {
		questionId: number;
		title: string;
		point: number;
		questionType: string;
		optionResponses: OptionResponse[];
	}

	interface OptionResponse {
		optionId: number;
		option: string;
		isTrue: boolean;
	}

	type getTestInsideRequest = number;

	type CreateTestResponse = {
		lessonId: number;
		newTest: {
			title: string;
			hour: number;
			minute: number;
			questionRequests: [
				{
					title: string;
					point: number;
					questionType: string;
					optionRequests: [
						{
							option: string;
							isTrue: boolean;
						}
					];
				}
			];
		};
	}[];
	type CreateTestRequest = {
		lessonId: number;
		newTest: {
			title: string;
			hour: number;
			minute: number;
			questionRequests: [
				{
					title: string;
					point: number;
					questionType: string;
					optionRequests: [
						{
							option: string;
							isTrue: boolean;
						}
					];
				}
			];
		};
	};
}
