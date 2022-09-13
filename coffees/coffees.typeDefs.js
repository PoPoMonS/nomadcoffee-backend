import { gql } from "apollo-server";

export default gql`
	type Coffee {
		id: Int!
		menuName: String!
		size: String!
		sugarLevel: Int!
		caffeine: Boolean!
		createdAt: String!
		updatedAt: String!
	}
	type Query {
		coffees: [Coffee]
		coffee(id: Int!): Coffee
	}
	type Mutation {
		createCoffee(
			menuName: String!
			size: String!
			sugarLevel: Int!
			caffeine: Boolean!
		): Coffee
		deleteCoffee(id: Int!): Coffee
	}
`;
