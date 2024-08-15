/* eslint-disable @typescript-eslint/no-unused-vars */
namespace RATING {
	type GetRatingStudentsResponse = {
		studentResponses: {
			id: number;
			fullName: string;
			lessonRatingResponses: {
				id: number;
				title: string;
				taskRatingResponses: {
					id: number;
					taskTitle: string;
					answerTaskRatingResponses: {
						id: number;
						point: number;
					};
				}[];
				testRatingResponses: {
					testId: number;
					testTitle: string;
					studentTestRatingResponse: {
						resultTestId: number;
						point: number;
					};
				};
			}[];
			totalScore: number;
			completionPercentage: number;
		}[];
	};
	type GetRatingStudentsRequest = number;

	type CreateProcentsResponse = {
		saveId: number;
		newData: {
			taskPercentage: number;
			testPercentage: number;
			examPercentage: number;
		};
	};

	type CreateProcentsRequest = {
		saveId: number | null;
		newData: {
			taskPercentage: number;
			testPercentage: number;
			examPercentage: number;
		};
	};

	type GetRatingGroupsResponse = {
		id: number;
		groupName: string;
	}[];
	type GetRatingGroupsRequest = number | null;
}
