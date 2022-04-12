import express from 'express'

import routes from './routes/routes'

class Server {
	public express: express.Application

	public constructor() {
		this.express = express()
		this.middlewares()
	}

	private async middlewares() {
		this.express.use(express.json())
		this.express.use(express.urlencoded({ extended: true }))
		this.express.use(routes)
		this.express.listen(3000 || process.env.PORT)
	}
}

export default new Server().express
