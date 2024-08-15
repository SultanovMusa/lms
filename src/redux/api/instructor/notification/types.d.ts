/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NOTIFICATION {
	type NotificationGetRequest = void;
	type NotificationGetResponse = {
		notificationId: number;
		courseId: number;
		lessonId: number;
		taskId: number;
		notificationTitle: string;
		notificationDescription: string;
		notificationSendDate: string;
		answerTaskId: number;
		isView: boolean;
	}[];
}
