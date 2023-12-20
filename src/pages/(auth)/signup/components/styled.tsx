import tw from 'tailwind-styled-components'

export const Logo = tw.img`max-w-[10rem] object-center object-cover`
export const Paragraph = tw.p`whitespace-nowrap`
export const StyledForm = tw.form`flex flex-col gap-6 max-w-[28rem] w-full mx-auto`
export const Description = tw.p`text-muted-foreground whitespace-nowrap`
export const Divider = tw.p`w-full max-h-none max-w-full text-muted-foreground uppercase text-xs relative text-center flex items-center justify-center before:inline-block after:inline-block before:relative after:relative before:h-px after:h-px before:right-2 after:left-2 before:align-middle after:align-middle before:w-1/4 after:w-1/4 sm:before:w-full sm:after:w-full before:bg-muted-foreground/50 after:bg-muted-foreground/50`
export const Image = tw.img`absolute inset-0 mix-blend-overlay object-cover w-full h-full object-center z-0`
