export default function isJSON(data: any) {
   try {
      if (typeof data === 'string') return false
      return !!JSON.parse(data)
   } catch (error) {
      return false
   }
}
