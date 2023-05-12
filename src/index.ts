import express from 'express'
import resizeImage from './resize'
import checkFileExist from './checkFileExist'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to my project image')
})

app.get('/api/images', async (req, res) => {
  try {
    let filename = ''
    let width = 200
    let height = 200

    if (req.query.width && !isNaN(+req.query.width)) {
      width = Number(req.query.width) || 200
    } else {
      throw 'Width must be number and not empty'
      // res.send('Width must be number and not empty')
    }

    if (req.query.height && !isNaN(+req.query.height)) {
      height = Number(req.query.height) || 200
    } else {
      // res.send('Height must be number and not empty')
      throw 'Height must be number and not empty'
    }

    if (req.query.filename) {
      filename = req.query.filename.toString()
      const isExist = await checkFileExist(filename)
      if (!isExist) {
        await resizeImage(filename, width, height)
      }
      res.sendFile(
        `${__dirname}/assets/thumb/${filename}-${width}-${height}.jpg`
      )
    } else {
      throw 'No file name no provide, Please check again!'
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

export default app
