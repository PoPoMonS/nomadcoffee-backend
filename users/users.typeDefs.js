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
		photos: [Photo]
		following: [User]
		followers: [User]
		totalFollowers: Int!
		totalFollowing: Int!
		isMe: Boolean!
		isFollowing: Boolean!
	}
`;
