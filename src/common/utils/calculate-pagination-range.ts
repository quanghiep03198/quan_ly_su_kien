export const calculatePaginationRange = (currentPage: number, totalPages: number): number[] => {
   const range = 2
   let start = Math.max(1, currentPage - range)
   let end = Math.min(totalPages, currentPage + range)

   if (end - start < range * 2) {
      if (start === 1) {
         end = Math.min(totalPages, start + range * 2)
      } else {
         start = Math.max(1, end - range * 2)
      }
   }
   return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
