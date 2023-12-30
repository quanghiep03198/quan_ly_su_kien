type ProviderList = Array<{
   provider: React.ElementType
   props: React.ComponentProps<ProviderList[number]['provider']>
}>

export default function buildProvider(providers: ProviderList) {
   // type FirstProviderProps = ProviderProps<(typeof providers)[number]>
   const InitialComponent: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>

   return providers.reduce((AccumulatedComponent, { provider: Provider, props }) => {
      return ({ children }) => (
         <AccumulatedComponent>
            <Provider {...props}>{children}</Provider>
         </AccumulatedComponent>
      )
   }, InitialComponent)
}
