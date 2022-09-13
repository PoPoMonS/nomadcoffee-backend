import client from "../client";

export default {
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
