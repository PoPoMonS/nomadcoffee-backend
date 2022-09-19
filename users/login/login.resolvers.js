import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		login: async (_, { email, password }) => {
			// check email that exist in database
			const user = await client.user.findFirst({ where: { email } });
			if (!user) {
				return {
					ok: false,
					error: "Email Not Found.",
				};
			}
			// compare password
			const passwordOK = await bcrypt.compare(password, user.password);
			if (!passwordOK) {
				return {
					ok: false,
					error: "Incorrect password",
				};
			}
			// issue token to user
			const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
		},
	},
};
