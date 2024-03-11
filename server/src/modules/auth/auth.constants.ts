import { AuthPayload } from '../interfaces/auth.payload'

export const jwtConstants = {
  secret: 'ysdfhskdfsfdssdfnsdft2737r8047384dsjfsgufsbdf8734',
}

// Create a custom request interface that extends the Express.Request interface
export interface CustomRequest extends Request {
  user: AuthPayload
}
