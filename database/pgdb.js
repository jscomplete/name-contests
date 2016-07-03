const humps = require('humps');

module.exports = pgPool => {
  return {
    getUserById(userId) {
      return pgPool.query(`
        select * from users
        where id = $1
      `, [userId]).then(res => {
        return humps.camelizeKeys(res.rows[0]);
      });
    },

    getUserByApiKey(apiKey) {
      return pgPool.query(`
        select * from users
        where api_key = $1
      `, [apiKey]).then(res => {
        return humps.camelizeKeys(res.rows[0]);
      });
    },

    getContests(user) {
      return pgPool.query(`
        select * from contests
        where created_by = $1
      `, [user.id]).then(res => {
        return humps.camelizeKeys(res.rows);
      });
    },

    getNames(contest) {
      return pgPool.query(`
        select * from names
        where contest_id = $1
      `, [contest.id]).then(res => {
        return humps.camelizeKeys(res.rows);
      });
    }
  };
};
