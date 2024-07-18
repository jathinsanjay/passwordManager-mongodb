import React from 'react'
import Nav from '../components/nav.jsx'
import Add from '../components/add.jsx'

const home = () => {
 
    return (
        <>
        
        <div className=" absolute inset-0 -z-10 h-full w-full  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-auto">
       
    <Nav/>
    <Add/>
       </div>
        </>
      )
}

export default home