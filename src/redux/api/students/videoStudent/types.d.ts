/* eslint-disable @typescript-eslint/no-unused-vars */
namespace VIDEO_LESSON {
	type VideoLessonGetResponse = {
		id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	}[];

	type VideoLessonGetRequest = void;

	type VideoIDGetResponse = {
		id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	};

	type VideoIDGetRequest = void;
}
