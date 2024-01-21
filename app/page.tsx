'use client'
import React from 'react'
import Main from './Main'

export default function Page() {

  return <>
      <Main />
  </>

}


// export default function Page() {
//   const [queryClient] = React.useState(() => new QueryClient())

//   return <QueryClientProvider client={queryClient}>
//         <Main />
//     </QueryClientProvider>
// }
