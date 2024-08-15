/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type GetAnnouncementStudentResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: {
			announcementId: number;
			content: string;
			author: string;
			isView: boolean;
		}[];
	};

	type GetAnnouncementStudentRequest = {
		size: string;
		page: string;
	};
}
