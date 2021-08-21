const express = require('express');
const router = express.Router();
const { transactions: ctrl } = require('../controllers');

/**
 * @swagger
 * /api/v1/transactions:
 *  post:
 *    description: Use to post one transaction
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', ctrl.addTransaction);

module.exports = router;
