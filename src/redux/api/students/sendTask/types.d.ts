/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENT_TASK {
	type SendTaskResponse = {
		getTask: number;
		newTask: {
			text: string;
			file: string;
			comment: string;
		};
	};
	type SendTaskRequest = {
		getTask: number;
		newTask: {
			text: string;
			file: string | null;
			comment: string;
		};
	};
}
