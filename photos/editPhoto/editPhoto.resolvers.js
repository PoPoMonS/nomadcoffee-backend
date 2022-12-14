import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
	Mutation: {
		editPhoto: protectedResolver(
			async (_, { id, caption }, { loggedInUser }) => {
				const oldPhoto = await client.photo.findFirst({
					where: {
						id,
						userId: loggedInUser.id,
					},
				});

				if (!oldPhoto) {
					return {
						ok: false,
						error: "Photo not found.",
					};
				}

				await client.photo.update({
					where: {
						id,
					},
					data: {
						hashtags: {
							disconnect: oldPhoto.hashtags,
							connectOrCreate: processHashtags(caption),
						},
						caption,
					},
				});

				return {
					ok: true,
				};
			}
		),
	},
};
