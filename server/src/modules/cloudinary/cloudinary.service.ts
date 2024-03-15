// cloudinary.service.ts

import { Injectable } from '@nestjs/common'
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: this.configService.get<string>('CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUD_API_KEY'),
      api_secret: this.configService.get<string>('CLOUD_API_SECRET'),
    })
  }

  async uploadImages(files: any[]): Promise<UploadApiResponse[]> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<UploadApiResponse>((resolve, reject) => {
          v2.uploader.upload(
            file.path,
            { folder: 'hafiyacu/products', use_filename: true },
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) {
                reject(error)
              } else {
                resolve(result)
              }
            },
          )
        }),
    )

    return Promise.all(uploadPromises)
  }
}
