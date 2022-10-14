const express = require('express');

const router = express.Router();
const { createData, getData, editData } = require('../controllers/api');

//  swagger configurations

/**
 * @swagger
 * components:
 *   schemas:
 *     epikindifi:
 *       type: object
 *       required:
 *         - userName
 *         - fieldName
 *       properties:
 *         Iid:
 *           type: string
 *           description: The auto-generated id of the entity
 *         userName:
 *           type: string
 *           description: The user name of the entity
 *         fieldName:
 *           type: string
 *           description: The field name of the entity
 *       example:
 *         _id: 6347df0d8f16d5fe8d3e8c27
 *         userName: John Smith
 *         fieldName: I am in Chennai ,planning to move out
 */

/**
  * @swagger
  * tags:
  *   name: Epikindifi
  *   description: The Data Reference API
  */

// swagger post request configuration

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new data referencee
 *     tags: [Create a Data Reference]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/epikindifi'
 *     responses:
 *       200:
 *         description: The data has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/epikindifi'
 *       500:
 *         description: Some server error
 */
router.post('/create', createData);

// swagger configuration to get all the fields information

/**
 * @swagger
 * /api/fields:
 *   get:
 *     summary: Returns the list of all the fileds
 *     tags: [Get Data Reference]
 *     responses:
 *       200:
 *         description: The list of the all the fileds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

// route to get the list of all the fileds
router.get('/fields', getData);

// swagger configuration to edit the particular id entity

/**
 * @swagger
 * /api/edit/{id}:
 *  put:
 *    summary: Update the dataRefrence by the id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The entity id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/epikindifi'
 *    responses:
 *      200:
 *        description: The document was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/epikindifi'
 *      404:
 *        description: The dataRefrence was not found
 *      500:
 *        description: Some error happened
 *    tags: [Edit the Data Reference]
 */

// route to edit the data reference
router.put('/edit/:id', editData);

module.exports = router;
