import { type NextApiRequest, type NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (typeof process.env.API_URL === 'undefined') {
    res.status(500)
    return
  }
  const { task } = req.query
  let statusCode = 200
  const token = await getToken({ req, raw: true })
  const headers: any = {
    uuid: req.headers.uuid as string,
    'Content-Type': 'application/json'
  }
  if (token !== null) {
    headers.JWT = token
  }
  fetch(
        `${process.env.API_URL}/ai-for-u/${task as string}`,
        {
          method: req.method,
          body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
          headers
        }
  ).then(async response => {
    statusCode = response.status
    if (response.status === 200) {
      return await response.json()
    }
    throw await response.text()
  }).then(data => {
    res.status(statusCode).json(data)
  }).catch((reason) => {
    console.log(reason)
    res.status(statusCode).json({ message: reason })
  })
}
