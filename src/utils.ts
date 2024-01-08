import { ZodError } from 'zod'
import { Readable } from 'stream'
import got from 'got'
import fs from 'fs'
import path from 'path'

import { promisify } from 'util'
import { pipeline } from 'stream'
import { ImageExtension } from './types.js'
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)

export const getErrorMessage = (error: unknown) => {
  console.log(error)
  let message: string
  if (error instanceof ZodError) {
    message = error.issues.map((issue) => issue.message).join('\n')
  } else if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }
  return message
}

export function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable()
  stream.push(buffer) // Push the buffer to the stream
  stream.push(null) // Indicate the end of the stream
  return stream
}

export const downloadImage = async (url: string, path: string) => {
  const pipe = promisify(pipeline)

  const response = got.stream(url)
  await pipe(response, fs.createWriteStream(path))
}

export const saveFileTemporarily = async (
  url: string,
  fileExtension: ImageExtension
) => {
  const tempDir = path.resolve(__dirname, '../tmp') // Absolute path to temp directory

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }
  const filename = Math.random().toString(36).substring(2, 15)
  const filePath = path.join(tempDir, `${filename}.${fileExtension}`)
  console.log('filePath', filePath)
  await downloadImage(url, filePath)
  return filePath
}
