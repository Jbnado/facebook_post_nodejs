import * as express from 'express'

import { PostController } from '../controllers/post-controler'

const routes = express.Router()
const post = express.Router()

post.get('/post/:id', PostController.getMetrics)
post.post('/post', PostController.postToPage)

routes.use(post)

export default routes
