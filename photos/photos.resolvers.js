import client from "../client";

export default {
	Photo: {
		user: async ({ userId }) => {
			return await client.user.findUnique({ where: { id: userId } });
		},

		hashtags: async ({ id }) => {
			return await client.hashtag.findMany({
				where: {
					photos: {
						some: { id },
					},
				},
			});
		},
		totalLikes: ({ id }) =>
			client.like.count({
				where: {
					photoId: id,
				},
			}),
	},

	Hashtag: {
		photos: async ({ id }, { page }) => {
			await client.hashtag
				.findUnique({
					where: { id },
				})
				.photos({
					take: 5,
					skip: 5 * (page - 1),
				});
		},
		totalPhotos: ({ id }) =>
			client.photo.count({
				where: {
					hashtags: {
						some: { id },
					},
				},
			}),
	},
};
