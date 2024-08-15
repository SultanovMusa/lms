/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TRASH {
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
