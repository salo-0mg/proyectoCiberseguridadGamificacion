import { Router } from "express";
import * as productsController from "../controllers/products.controller"
import {authJwt} from "../middlewares"

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsController.createProduct) // Crear un protucto

router.get('/', productsController.getProducts) // obetener todos los productos

router.get('/:productId', productsController.getProductById) // obetener un producto por id

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.updateProductById) // actualizar un producto 

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsController.deleteProductById) // eliminar un produto

export default router;