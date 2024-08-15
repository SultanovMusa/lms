/* eslint-disable @typescript-eslint/no-unused-vars */
namespace INSTRUCTOR {
	interface TrashType {
		id: Key | null | undefined;
		id: number;
		name: string;
		dateOfDelete: string;
	}

	type GetCardsResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: TrashType[];
	};
	type GetCardsRequest = {
		page: string;
		size: string;
	};
}
