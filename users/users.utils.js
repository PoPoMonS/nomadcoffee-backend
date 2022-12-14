import client from "../client";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
	try {
		if (!token) {
			return null;
		}
		// Verify user token
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		const user = await client.user.findUnique({ where: { id } });
		if (user) {
			return user;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};

export const protectedResolver =
	(ourResolver) => (root, args, context, info) => {
		if (!context.loggedInUser) {
			return {
				ok: false,
				error: "Please log in to perform this action.",
			};
		}
		return ourResolver(root, args, context, info);
	};
