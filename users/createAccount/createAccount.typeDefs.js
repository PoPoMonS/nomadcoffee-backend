import { gql } from "apollo-server";

export default gql`
	type createAccountResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		createAccount(
			userName: String!
			email: String!
			name: String!
			password: String!
		): createAccountResult!
	}
`;
