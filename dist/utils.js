import fs from 'fs'
import got from 'got'
import path from 'path'
import { Readable, pipeline } from 'stream'
import { promisify } from 'util'
import { ZodError } from 'zod'
export const getErrorMessage = (error) => {
  let message
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
export function bufferToStream(buffer) {
  const stream = new Readable()
  stream.push(buffer) // Push the buffer to the stream
  stream.push(null) // Indicate the end of the stream
  return stream
}
export const downloadImage = async (url, path) => {
  const pipe = promisify(pipeline)
  const response = got.stream(url)
  await pipe(response, fs.createWriteStream(path))
}
export const saveFileTemporarily = async (url, fileExtension) => {
  const tempDir = path.resolve(process.cwd(), './tmp') // Absolute path to temp directory
  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }
  const filename = Math.random().toString(36).substring(2, 15)
  const filePath = path.join(tempDir, `${filename}.${fileExtension}`)
  await downloadImage(url, filePath)
  return filePath
}
