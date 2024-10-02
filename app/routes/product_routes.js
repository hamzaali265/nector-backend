const express = require("express");
const productController = require("../controllers/product_controller");
const upload = require("../../config/multar"); // Import multer configuration

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product with image upload
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *               - stock
 *               - category
 *               - brand
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               volume:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               detail:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image file
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images (multiple)
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  productController.createProduct
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product with image upload
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *               - stock
 *               - category
 *               - brand
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               volume:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               detail:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image file
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images (multiple)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  productController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProduct);

/**
 * @swagger
 * /products/{id}/reviews:
 *   patch:
 *     summary: Add a review to a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - rating
 *               - message
 *             properties:
 *               user:
 *                 type: string
 *               rating:
 *                 type: number
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.patch("/:id/reviews", productController.addReview);

module.exports = router;
