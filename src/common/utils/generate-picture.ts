const generatePicture = (name: string | undefined) => {
   return 'https://ui-avatars.com/api/?name=' + name?.charAt(0) ?? 'A'
}

export default generatePicture
