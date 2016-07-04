const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'User',

  fields: () => {
    const ContestType = require('./contest');
    const ActivityType = require('./activity');

    return {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      fullName: {
        type: GraphQLString,
        resolve: obj => `${obj.firstName} ${obj.lastName}`
      },
      email: { type: new GraphQLNonNull(GraphQLString) },
      createdAt: { type: GraphQLString },
      contests: {
        type: new GraphQLList(ContestType),
        resolve(obj, args, { loaders }) {
          return loaders.contestsForUserIds.load(obj.id);
        }
      },
      contestsCount: {
        type: GraphQLInt,
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
        }
      },
      namesCount: {
        type: GraphQLInt,
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
        }
      },
      votesCount: {
        type: GraphQLInt,
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mdb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
        }
      },
      activities: {
        type: new GraphQLList(ActivityType),
        resolve(obj, args, { loaders }) {
          return loaders.activitiesForUserIds.load(obj.id);
        }
      }
    };
  }
});
