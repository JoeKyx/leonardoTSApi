// TODO: Add tests for LeonardoAPI
import dotenv from 'dotenv'

import LeonardoAPI from '../src/leonardoAPI.ts'
dotenv.config()

if (!process.env.LEONARDO_API_KEY || !process.env.LEO_WEBHOOK_API_KEY) {
  throw new Error('Missing LEONARDO_API_KEY environment variable')
}

const leoApi = new LeonardoAPI(
  process.env.LEONARDO_API_KEY,
  true,
  undefined,
  process.env.LEO_WEBHOOK_API_KEY
)

const leoApiPolling = new LeonardoAPI(process.env.LEONARDO_API_KEY, false)

console.log(process.env.LEONARDO_API_KEY)
console.log(process.env.LEO_WEBHOOK_API_KEY)

// leoApi
//   .generateImages({
//     prompt: 'A cute cat',
//   })
//   .then((result) => {
//     console.log('Webhook result:')
//     console.log(result)
//   })
//   .catch((error) => {
//     console.log('Webhook error:')
//     console.error(error)
//   })

leoApiPolling
  .generateImages({
    prompt: 'A cute cat',
  })
  .then((result) => {
    console.log('Polling result:')
    console.log(result)
    console.log('Variation...')
    if (result.success) {
      leoApiPolling
        .upscaleImage(result.result.images[0].id)
        .then((variationResult) => {
          console.log('Polling variation result:')
          console.log(variationResult)
        })
        .catch((error) => {
          console.log('Polling variation error:')
          console.error(error)
        })
    }
  })
  .catch((error) => {
    console.log('Polling error:')
    console.error(error)
  })
