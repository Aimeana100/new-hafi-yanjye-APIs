import { diskStorage } from 'multer'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const multerConfigOptions: MulterOptions = {
  // return {
  fileFilter: (req, file, callback) => {
    // Check for allowed file types
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(
        new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'),
        false,
      )
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 5 MB
  },
  storage: diskStorage({
    destination: `./uploads`,
    filename: (req, file, cb) => {
      return cb(null, file.originalname)
    },
  }),
}
//   }
// }
