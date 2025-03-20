import React from 'react'
import { Outlet } from 'react-router-dom'

const home = () => {
  return (
    <div>home



{/** message component**/}
    <section>
   <Outlet />
    </section>
    </div>
  )
}

export default home