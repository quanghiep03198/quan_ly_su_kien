import { isValid } from 'date-fns'

export default function isValidDate(value: any) {
   return isValid(new Date(value))
}
