/* eslint-disable @typescript-eslint/no-unused-vars */
namespace INSTRUCTOR {
	type TaskResponse = {
		id: number;
		title: string;
		description: string!;
		file: string;
		deadline: Dayjs | null | undefined;
	};
	type TaskRequest = number;

	type GetStudentResultResponse = {
		answerTasId: number;
		studentName: string;
		id: number;
	}[];
	type GetStudentResultRequest = {
		getTask: number;
		page: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	};
}

export type GetTaskResultResponse = TASK.ResultResponse;
