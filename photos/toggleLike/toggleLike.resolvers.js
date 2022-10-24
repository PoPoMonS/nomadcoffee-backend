import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
	Mutation: {
		toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
			const photo = await client.photo.findUnique({
				where: { id },
			});

			if (!photo) {
				return {
					ok: false,
					error: "Photo not found.",
				};
			}

			const like = await client.like.findUnique({
				where: {
					userId_photoId: {
						userId: loggedInUser.id,
						photoId: id,
					},
				},
			});

			if (like) {
				await client.like.delete({
					where: {
						userId_photoId: {
							userId: loggedInUser.id,
							photoId: id,
						},
					},
				});
			} else {
				await client.like.create({
					data: {
						users: {
							connect: {
								id: loggedInUser.id,
							},
						},
						photos: {
							connect: {
								id,
							},
						},
					},
				});
			}

			return {
				ok: true,
			};
		}),
	},
};
