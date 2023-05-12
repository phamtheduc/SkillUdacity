import sharp from 'sharp'

const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    const result = await sharp(`src/assets/full/${filename}.jpg`)
      .resize({ width: width, height: height, fit: 'cover' })
      .toFile(`src/assets/thumb/${filename}-${width}-${height}.jpg`)
      .then(() => {
        return Promise.resolve(true)
      })
      .catch(() => {
        return Promise.reject(false)
      })

    if (result) {
      return Promise.resolve(true)
    } else {
      return Promise.reject(false)
    }
  } catch (error) {
    console.log(error)
    throw 'File name can be wrong. Please check again!'
  }
}

export default resizeImage
