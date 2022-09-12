import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server";

const typeDefs = gql`
	type Book {
		title: String
		author: String
	}
	type Query {
		books: [Book]
	}
`;

const resolvers = {
	Query: {
		books: () => books,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(() => {
	console.log("Server ready at http://localhost:4000/");
});
