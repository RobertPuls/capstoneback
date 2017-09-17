const monk = require('monk');
const db = monk(process.env.MONGODB_URI || "localhost/beats");

module.exports = db;
