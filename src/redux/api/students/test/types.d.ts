/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENTTEST {
	type TestGetResponse = {
		testResponseForGetAll: {
			testId: number;
			title: string;
			hour: number;
			minute: number;
		}[];
	};
	type TestGetRequest = number;

	type TestGetResultResponse = {
		testId: number;
		testTitle: string;
		answerQuestionResponses: {
			questionId: number;
			questionTitle: string;
			questionType: string;
			answerOptionResponses: {
				optionId: number;
				option: string;
				yourChoice: number;
				true: boolean;
			}[];

			point: number;

			totalPoint: number;
		}[];
	};
	type TestGetResultRequest = number;
	interface TestPostResultResponse {
		test: number;
		newData: {
			optionId: number[];
		};
	}
	interface TestPostResultRequest {
		test: number;
		newData: {
			optionId: number[];
		};
	}
}
