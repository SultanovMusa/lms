/* eslint-disable @typescript-eslint/no-unused-vars */
namespace LESSON {
	interface LessonType {
		_id: number;
		title: string;
		createdAt: number;
	}

	type GetCardsResponse = LessonType[];
	type GetCardsRequest = string | void;
	interface GetLessonType {
		_id: number;
		title: string;
		createdAt: number;
	}

	type GetLessonsResponse = GetLessonType[];
	type GetLessonssRequest = string | void;
}
