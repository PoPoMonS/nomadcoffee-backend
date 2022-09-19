import client from "../../client";

export default {
	Mutation: {
		createAccount: async (_, { userName, email, name, password }) => {
			try {
				const existingUser = await client.user.findFirst({
					where: { OR: [{ userName }, { email }] },
				});
				if (existingUser) {
					return {
						ok: false,
						error: "There is an user that already exist.",
					};
				} else {
					const uglyPassword = await bcrypt.hash(password, 10);
					await client.user.create({
						data: {
							userName,
							email,
							name,
							password: uglyPassword,
						},
					});
					return {
						ok: true,
					};
				}
			} catch (e) {
				console.log(e);
				return {
					ok: false,
					error: "Not defined error. Please check server console.",
				};
			}
		},
	},
};
