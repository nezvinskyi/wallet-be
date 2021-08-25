const { model } = require('mongoose');
const { sessionSchema } = require('./schemas');

const Session = model('session', sessionSchema);

module.exports = Session;