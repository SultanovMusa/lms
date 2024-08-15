/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TEST {
	type GetResultTestResponse = {
		id: number;
		studentTestResponses: {
			resultTestId: number;
			fullName: string;
			point: number;
			isPassed: boolean;
		}[];
	};
	type GetResultTestRequest = number;
	type getTestResultResponse = {
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
	type getTestResultRequest = number | boolean;

	type GetResultTestInstructorResponse = {
		testId: number;
		testTitle: string;
		answerQuestionResponses: [
			{
				questionId: number;
				questionTitle: string;
				questionType: string;
				answerOptionResponses: [
					{
						optionId: 0;
						option: string;
						yourChoice: number;
						true: true;
					}
				];
				point: 0;
			}
		];
		totalPoint: 0;
	};

	type GetResultTestInstructorRequest = number | boolean;
}
