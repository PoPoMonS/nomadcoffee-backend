import client from "../client";

export default {
	Query: {
		getAccount: async (_, { id }) =>
			await client.user.findUnique({ where: { id } }),
	},
};
