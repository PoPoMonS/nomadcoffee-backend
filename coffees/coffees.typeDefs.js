import { gql } from "apollo-server";

export default gql`
	type User {
		id: Int!
		userName: String!
		email: String!
		name: String!
		location: String
		password: String!
		avatarURL: String
		githubUserName: String
		createdAt: String!
		updatedAt: String!
	}
	type createAccountResult {
		ok: Boolean!
		error: String
	}
	type Query {
		getAccount(id: Int!): User
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
