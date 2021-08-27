const moment = require('moment');
const { sessions: sesService } = require('../../services');
// const sessionEnd = require('../../helpers/sessionEndHelper')
// const { user: Service } = require('../../services');

const logout = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization').replace(/^Bearer\s+/, "");
    // console.log(accessToken)
    const session = await sesService.getOne({ accessToken });
    const { _id } = session;
    console.log(_id);

    await sesService.updateById(_id,
      {
        validToken: false,
        logoutTime: moment(new Date).format('HH-mm-ss, YYYY-MM-DD')
      }
    );

    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content'
    })
  } catch (error) {
    next(error)
  }
};

module.exports = logout;