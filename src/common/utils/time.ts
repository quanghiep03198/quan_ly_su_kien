export type TimeObject = Record<'hours' | 'minutes' | 'seconds', number>

export const getCurrentDate = ({ hours, minutes, seconds }: TimeObject): Date => {
   const currentYear = new Date().getFullYear()
   const currentMonth = new Date().getMonth()
   const currentDay = new Date().getDate()
   return new Date(currentYear, currentMonth, currentDay, hours, minutes, seconds)
}

export const parseTime = (value: string): TimeObject => {
   const [hours, minutes, seconds] = value.split(':')
   return { hours: +hours, minutes: +minutes, seconds: +seconds }
}
