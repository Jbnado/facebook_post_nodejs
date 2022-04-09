import { Request, Response } from 'express'
import https from 'https'
import querystring from 'querystring'

import { logger } from '../utils/logger'
import config from '../config/config'
import moment from 'moment'

const { pageId, accessToken } = config

export class PostController {
	static async postToPage(request: Request, response: Response) {
		const { text, image } = request.body
		const now = new Date()
		// const data = new URLSearchParams({
		// 	access_token: accessToken,
		// 	url: image,
		// 	message: text,
		// })

		const data = querystring.stringify({
			access_token: accessToken,
			url: image,
			message: text + ' on ' + moment(now).format('DD-MMM-YYYY h:mm A'),
		})

		// const options = {
		// 	method: 'POST',
		// 	hostname: 'graph.facebook.com',
		// 	path: `/${pageId}/photos`,
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 		'Content-Length': Array.from(data).length,
		// 	},
		// }

		const options = {
			method: 'POST',
			hostname: 'graph.facebook.com',
			path: `/${pageId}/photos`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': data.length,
			},
		}

		const req = https.request(options, (res) => {
			res.on('data', (chunk) => {
				logger.info(JSON.parse(chunk))
				return response.status(res.statusCode).send(JSON.parse(chunk))
			}).on('error', (error) => {
				logger.error(error)
				return response.status(res.statusCode).send(error.message)
			})
		})

		req.on('error', (error) => {
			logger.error(error)
			return response.send(error.message)
		})

		req.write(data)
		req.end()
	}
}
