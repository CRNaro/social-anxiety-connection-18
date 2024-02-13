const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/activities'; // I think i need to rename the route

connect(connectionString);

module.exports = connection; 