import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		editProfile: protectedResolver(
			async (
				_,
				{
					userName,
					email,
					name,
					location,
					password: newPassword,
					avatarURL,
					githubUserName,
				},
				{ loggedInUser }
			) => {
				// Hashing password if there is changing
				let uglyPassword = null;
				if (newPassword) {
					uglyPassword = await bcrypt.hash(newPassword, 10);
				}
				// Change information
				const updatedUser = await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						userName,
						email,
						name,
						location,
						...(uglyPassword && { password: uglyPassword }),
						avatarURL,
						githubUserName,
					},
				});

				if (updatedUser.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Could not update profile.",
					};
				}
			}
		),
	},
};
