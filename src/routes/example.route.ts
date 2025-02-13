import { ExampleController } from '@/controllers/example.controller';
import validationSchema from '@/middlewares/validation-schema-middleware';
import {
  createExampleSchema,
  getExampleListSchema,
  updateExampleSchema,
} from '@/validation-schema/example.schema';
import { Router } from 'express';

const router = Router();
const exampleController = new ExampleController();

/**
 * @swagger
 * /api/v1/example:
 *   post:
 *     summary: Create new item
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: example-id
 *                     name:
 *                       type: string
 *                       example: Example Item
 *                     description:
 *                       type: string
 *                       example: Example description
 *                     createdAt:
 *                       type: string
 *                       example: 2024-03-10T14:30:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2024-03-10T14:30:00.000Z
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Name is required
 */
router.post('/', validationSchema(createExampleSchema), exampleController.create);

/**
 * @swagger
 * /api/v1/example:
 *   get:
 *     summary: Get list with filters
 *     tags: [Example]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: example-id
 *                           name:
 *                             type: string
 *                             example: Example Item
 *                           description:
 *                             type: string
 *                             example: Example description
 *                           createdAt:
 *                             type: string
 *                             example: 2024-03-10T14:30:00.000Z
 *                           updatedAt:
 *                             type: string
 *                             example: 2024-03-10T14:30:00.000Z
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 100
 *                         pages:
 *                           type: number
 *                           example: 10
 *                         currentPage:
 *                           type: number
 *                           example: 1
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 */
router.get('/', validationSchema(getExampleListSchema), exampleController.getList);

/**
 * @swagger
 * /api/v1/example/{id}:
 *   get:
 *     summary: Get single item
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', exampleController.getOne);

/**
 * @swagger
 * /api/v1/example/{id}:
 *   delete:
 *     summary: Delete item
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       400:
 *         description: Bad Request
 */
router.delete('/:id', exampleController.delete);

/**
 * @swagger
 * /api/v1/example/{id}:
 *   put:
 *     summary: Update item
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: example-id
 *                     name:
 *                       type: string
 *                       example: Example Item
 *                     description:
 *                       type: string
 *                       example: Example description
 *                     createdAt:
 *                       type: string
 *                       example: 2024-03-10T14:30:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2024-03-10T14:30:00.000Z
 */
router.put('/:id', validationSchema(updateExampleSchema), exampleController.update);

export default router;
