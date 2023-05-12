import app from '..'
import supertest from 'supertest'
import resizeImage from '../resize'

const request = supertest(app)

it('Expect resizeImage() result to equal value', async () => {
  const result = await resizeImage('Cat03', 200, 200)
  expect(result).toEqual(true)
})

describe('Test endpoint responses', () => {
  it('gets the api/images endpoint', async () => {
    await request.get('/api/images').expect(200)
  })
})
