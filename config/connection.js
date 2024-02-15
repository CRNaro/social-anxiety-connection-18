const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/social_anxiety_connection_db'; // I think i need to rename the route

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
});

module.exports = connection; 