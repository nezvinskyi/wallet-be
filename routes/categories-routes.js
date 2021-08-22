const express = require('express');
const router = express.Router();
const { categories: ctrl } = require('../controllers');

/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    description: Use to get all categories
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    description: Use to post one category
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', ctrl.addCategory);

/**
 * @swagger
 * /api/v1/categories/:categoryId:
 *  delete:
 *    description: Use to post one category
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:categoryId', ctrl.delCategory);

module.exports = router;
