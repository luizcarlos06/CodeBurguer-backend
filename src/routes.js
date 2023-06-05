import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)
routes.post('/products', upload.single('file'),ProductController.store)
routes.get('/products',ProductController.index)
routes.put('/products/:id',upload.single('file'),ProductController.update)

routes.post('/categories',upload.single('file'),CategoryController.store)
routes.get('/categories',CategoryController.index)
routes.put('/categories',upload.single('file'),CategoryController.update)

routes.post('/orders',OrderController.store)
routes.get('/orders',OrderController.index)
routes.put('/orders/:id',OrderController.update)

export default routes