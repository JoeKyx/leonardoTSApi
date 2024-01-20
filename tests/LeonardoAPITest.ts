// TODO: Add tests for LeonardoAPI
import dotenv from 'dotenv'

import LeonardoAPI from '../src/leonardoAPI.ts'
dotenv.config()

if (!process.env.LEONARDO_API_KEY || !process.env.LEO_WEBHOOK_API_KEY) {
  throw new Error('Missing LEONARDO_API_KEY environment variable')
}

const leoApi = new LeonardoAPI(
  process.env.LEONARDO_API_KEY,
  process.env.LEO_WEBHOOK_API_KEY
)

console.log(process.env.LEONARDO_API_KEY)
console.log(process.env.LEO_WEBHOOK_API_KEY)

leoApi
  .generateImages({
    prompt: 'A cute cat',
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
