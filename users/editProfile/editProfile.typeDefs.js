import { gql } from "apollo-server";

export default gql`
	type editProfileResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		editProfile(
			userName: String
			email: String
			name: String
			location: String
			password: String
			avatarURL: String
			githubUserName: String
		): editProfileResult!
	}
`;
