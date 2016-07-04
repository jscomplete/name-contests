const {
  GraphQLUnionType
} = require('graphql');

const ContestType = require('./contest');
const NameType = require('./name');

module.exports = new GraphQLUnionType({
  name: 'Activity',

  types: [ContestType, NameType],
  resolveType(value) {
    return value.activityType === 'contest' ? ContestType : NameType;
  }
});
