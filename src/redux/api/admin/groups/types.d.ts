/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GROUPS {
	type GroupResponses = {
		id: number;
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	};

	type GroupsRequest = {
		page?: string;
		size?: string;
	};
	type GroupsResponse = {
		objects: GroupResponses[];
		page: string;
		size: string;
		totalPages: number;
		totalObjects: number;
	};
	type CreateGroupResponse = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	}[];
	type CreateGroupRequest = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	};
	type UpdateGroupResponse = {
		saveId: number | null;
		newGroup: {
			title: string;
			dateOfEnd: string;
			description: string;
			image: string | null;
		};
	}[];
	type UpdateGroupRequest = {
		saveId: number | null;
		newGroup: {
			title: string;
			dateOfEnd: string;
			description: string;
			image: string | null;
		};
	};

	type CreateGroupFileResponse = {
		fileName: string;
		urlFile: string;
	}[];
	type CreateGroupFileRequest = {
		fileName: string;
		urlFile: string;
	};

	type Students = {
		id: 5;
		fullName: string;
		phoneNumber: string;
		groupName: string;
		studyFormat: string;
		email: string;
		isBlock: false;
	};

	type GetStudentsGroupResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: Students[];
	};
	type GetStudentsGroupRequest = {
		group: number;
		pages: {
			page: string;
			size: string;
		};
	};
}
