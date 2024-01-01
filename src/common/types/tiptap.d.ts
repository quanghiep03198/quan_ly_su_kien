export declare module '@tiptap/core' {
   interface Commands<ReturnType> {
      fontSize: {
         setFontSize: (size: number) => ReturnType
         unsetFontSize: () => ReturnType
      }
   }
}
