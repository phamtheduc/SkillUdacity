import { accessSync, constants } from 'fs'

const checkFileExist = async (filename: string): Promise<boolean> => {
  try {
    accessSync(filename, constants.R_OK)
    return Promise.resolve(true)
  } catch (error) {
    console.log(error)
    return Promise.resolve(false)
  }
}

export default checkFileExist
