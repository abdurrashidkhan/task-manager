import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function Navbar() {
    const [taskModal, setTaskModal] = useState(false)
    console.log(taskModal)
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="">
            <h1 className="font-semibold text-3xl">Tasks</h1>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg> */}
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul> */}
        </div>
      </div>
      <div className="navbar-center">
        {/* <a className="">daisyUI</a> */}
      </div>
      <div className="navbar-end">
        <div className="flex gap-5">
            <button className="border-2 border-secondary/20 hover:border-bluebg-blue-500 hover:bg-blue-500 rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all hover:cursor-pointer">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="border-2 border-secondary/20 hover:border-blue-500 hover:bg-blue-500 rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all hover:cursor-pointer">
              <BellIcon className="h-6 w-6" />
            </button>
            <button disabled={taskModal ? true : false} onClick={() => setTaskModal(true)} className={`${!taskModal ? 'bg-blue-700 hover:cursor-pointer' : ' bg-blue-400 hover:cursor-not-allowed'} rounded-xl h-10 px-4 grid place-content-center font-semibold  transition-all   text-white "`}>Add Task</button>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
          </div>
      </div>
    </div>
  )
}
