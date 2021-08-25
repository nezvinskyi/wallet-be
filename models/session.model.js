const { model } = require('mongoose');
const { sessionSchema } = require('./schemas');

const SessionList = model('session', sessionSchema);

module.exports = SessionList;