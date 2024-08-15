/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TASK {
	type TaskResponse = {
		taskResponse: {
			id: number;
			title: string;
			description: string!;
			file: File | undefined;
			deadline: Dayjs | undefined;
		}[];
	};
	type TaskRequest = number;

	type CreateTaskResponse = {
		id: number;
		lessonId: number;
		newTask: {
			title: string;
			description: string!;
			file: File | undefined;
			deadline: Dayjs | undefined;
		};
	}[];
	type CreateTaskRequest = {
		newTask: object;
		lessonId: number | string | undefined;
	};
	type Base64Image = `data:image/${'jpeg' | 'png' | 'gif'};base64,${string}`;

	type UpdateTaskResponse = {
		getTask: number;
		newTask: {
			title: string;
			description: string!;
			file: string | null;
			deadline: Dayjs | undefined;
		};
	}[];
	type UpdateTaskRequest = {
		getTask: number;
		newTask: {
			title: string;
			description: string;
			file: string | null;
			deadline: Dayjs | undefined;
		};
	};
	type getTaskResponse = {
		resultTask: string | null;
		text: string;
		description: string;
		file: string | null;
		image: string;
		point: number;
		taskAnswerStatus: 'Late';
		answerId: number;
		comment: {
			author: string;
			role: string;
			content: string;
		}[];
	};

	type getTaskRequest = number;

	type patchTaskResponse = {
		answerId: number | string | undefined;
		newComment: {
			point: number | string;
			comment: string;
			isAccept: boolean;
		};
	};

	type answerResponse = {
		text: string;
		image: string;
		file: string;
		taskAnswerStatus: string;
		point: number;
		comment?: {
			author: string;
			role: string;
			content: string;
			dateTime: string;
		}[];
	};
	type answerRequest = number;
}
