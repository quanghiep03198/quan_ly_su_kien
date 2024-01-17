import { CloudinaryConfig } from '@/configs/cloudinary.config'
import axios from 'axios'
import { createFormData } from '../common/utils/form-data'

export class Cloudinary {
   protected static cloud_name = CloudinaryConfig.CLOUD_NAME
   protected static upload_preset = CloudinaryConfig.UPLOAD_PRESET
   protected static base_url = CloudinaryConfig.BASE_URL + '/' + CloudinaryConfig.CLOUD_NAME
   protected static api_key = CloudinaryConfig.API_KEY

   static async upload(file: File) {
      try {
         const formData = createFormData({
            file,
            cloud_name: this.cloud_name,
            upload_preset: this.upload_preset
         })
         console.log('Đang tải lên ảnh .....')
         const response = await axios.post(this.base_url + '/image/upload', formData)
         console.log('Đã tải lên ảnh thành công')

         return response.data?.url
      } catch (error) {
         console.log('Tải lên ảnh thất bại')
         throw error
      }
   }

   static async destroy(public_id: string) {
      try {
         return await axios.post(this.base_url + '/image/destroy', {
            data: {
               public_id,
               api_key: this.api_key,
               signature: '',
               timestamp: new Date().getTime()
            }
         })
      } catch (error) {
         throw error
      }
   }
}
