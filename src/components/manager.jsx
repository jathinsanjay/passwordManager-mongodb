import React from 'react';
import Typewriter from 'typewriter-effect';


const Manager = () => {
  return (
    <div className='max-w-2xl h-auto  mx-auto my-20 text-white font-black '>
        <div className='  mx-auto text-[1.5rem] lg:text-[3rem] font-serif '>Secure Your Digital World</div>
      <div className='text-white text-[1.25rem] lg:text-[2.5rem] font-thin mx-4 text-pretty'>
      <Typewriter
        options={{
          strings: ['Make your passwords secured!', 'Fetch them anytime needed', 'Create your password vault with us'],
          autoStart: true,
          loop: true,
        }}
      />
      </div>
     <a href='/add'><button className='lg:w-[500px] mx-auto my-10 text-2xl lg:text-5xl text-black bg-white border-1 border-blue-600 p-4 rounded-xl flex justify-center hover:rounded-2xl hover:bg-slate-400'>
        <div> <lord-icon
     src="https://cdn.lordicon.com/stxfyhky.json"
    trigger="hover"
     colors="primary:#black,secondary:#black"
     style={{width:"4.5rem",height:"3.5rem"}}
     
     
  >
</lord-icon></div>
     Add a password</button></a> 
    
    </div>
  );
}

export default Manager;
 