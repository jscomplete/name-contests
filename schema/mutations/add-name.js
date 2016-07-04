const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const pgdb = require('../../database/pgdb');
const NameType = require('../types/name');

const NameInputType = new GraphQLInputObjectType({
  name: 'NameInput',

  fields: {
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    contestId: { type: GraphQLID },
    label: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  }
});

module.exports = {
  type: NameType,
  args: {
    input: { type: new GraphQLNonNull(NameInputType) }
  },
  resolve(obj, { input }, { pgPool }) {
    return pgdb(pgPool).addNewName(input);
  }
};
