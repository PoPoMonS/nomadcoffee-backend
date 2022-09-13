import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
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

const resolvers = {
	Query: {
		coffees: () => client.coffee.findMany(),
		coffee: (_, { id }) => client.coffee.findUnique({ where: { id } }),
	},
	Mutation: {
		createCoffee: async (_, { menuName, size, sugarLevel, caffeine }) => {
			const createdCoffee = await client.coffee.create({
				data: {
					menuName,
					size,
					sugarLevel,
					caffeine,
				},
			});
			return createdCoffee;
		},
		deleteCoffee: async (_, { id }) => {
			const deletedCoffee = await client.coffee.delete({ where: { id } });
			return deletedCoffee;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(() => {
	console.log("Server ready at http://localhost:4000/");
});
