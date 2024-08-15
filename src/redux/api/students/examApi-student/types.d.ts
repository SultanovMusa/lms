/* eslint-disable @typescript-eslint/no-unused-vars */
namespace RATING_STUDENT {
	type GetRatingStudentsForStudentResponse = {
		studentsRatingResponseList: {
			id: number;
			fullName: string;
			completionPercentage: number;
		}[];
	};
	type GetRatingStudentsForStudentRequest = number;

	type AnswerTaskRatingResponses = {
		id: number;
		point: number;
	};

	type GetYourRatingStudentResponse = {
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
		}[];
		totalScore: number;
		completionPercentage: number;
	};

	type GetYourRatingStudentRequest = number;
}
