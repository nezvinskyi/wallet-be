const moment = require('moment');
const { sessions: sesService } = require('../services');

const sessionEnd = async (token) => {
  const session = await sesService.getOne({ usedToken: token });
  const { _id } = session;
  console.log(_id);

  await sesService.updateById(_id,
    {
      validToken: false,
      logoutTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD')
    }
  );
}

module.exports = sessionEnd;