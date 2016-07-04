const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Name',

  fields: () => {
    const UserType = require('./user');
    const TotalVotes = require('./total-votes');
    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, { loaders }) {
          return loaders.usersByIds.load(obj.createdBy);
        }
      },
      totalVotes: {
        type: TotalVotes,
        resolve(obj, args, { loaders }) {
          return loaders.totalVotesByNameIds.load(obj.id);
        }
      }
    };
  }
});
