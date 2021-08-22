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
router.get('/', ctrl.getAllCategories);

/**
 * @swagger
 * /api/v1/categories/:categoryId:
 *  get:
 *    description: Use to get one category by categoryId
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:categoryId', ctrl.getCategoryById);

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
 *    description: Use to delete one category by categoryId
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/:categoryId', ctrl.updateCategoryById);

/**
 * @swagger
 * /api/v1/categories/:categoryId:
 *  delete:
 *    description: Use to delete one category by categoryId
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:categoryId', ctrl.delCategory);

module.exports = router;
