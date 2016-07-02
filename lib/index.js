const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

// Read the query from the command line arguments
const query = process.argv[2];

const ncSchema = require('../schema');
const { graphql } = require('graphql');

// Execute the query against the defined server schema
graphql(ncSchema, query).then(result => {
  console.log(result);
});
