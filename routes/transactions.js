const express = require('express');
const router = express.Router();
const { transactions: ctrl } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * /api/v1/transactions:
 *  get:
 *    description: Use to get all user transactions
 *    tags: [transactions]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', authMiddleware, ctrl.getAllTransactions);

/**
 * @swagger
 * /api/v1/transactions:
 *  post:
 *    description: Use to post one transaction
 *    tags: [transactions]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', authMiddleware, ctrl.addTransaction);

/**
 * @swagger
 * /api/v1/transactions/:transactionId:
 *  delete:
 *    description: Use to delete one transaction by id
 *    tags: [transactions]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:transactionId', ctrl.delTransaction);

module.exports = router;
