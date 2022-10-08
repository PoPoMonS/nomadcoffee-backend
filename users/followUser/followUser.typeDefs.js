import { gql } from "apollo-server";

export default gql`
	type followUserResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		followUser(userName: String!): followUserResult!
	}
`;
