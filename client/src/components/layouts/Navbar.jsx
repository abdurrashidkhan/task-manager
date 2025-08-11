import { BellIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import AddTaskForm from '../addTask/addTask'
import { MoonIcon } from '@heroicons/react/24/solid'
import { FiMoon } from 'react-icons/fi'


export default function Navbar() {
  const [taskModal, setTaskModal] = useState(false)
  return (
    <>
      <div className="navbar  shadow-sm sticky top-0 z-[999] bg-[#fff] mx-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-[#f3f3f3] rounded-lg pl-10 pr-3 py-2 text-base focus:outline-none shadow"
                />
              </div>
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
        <div className="navbar-end gap-5">
          <div className="">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
            </svg>

          </div>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
              <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setTaskModal(true)} disabled={taskModal ? true : false} className={`${taskModal ? 'bg-purple-400 hover:cursor-not-allowed' : 'bg-purple-500 hover:cursor-pointer hover:bg-purple-600'} flex items-center space-x-2  text-white px-4 py-2 rounded-lg `}>
              <PlusIcon className="w-5 h-5" />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </div>
      {
        taskModal && <AddTaskForm setTaskModal={setTaskModal} />
      }
    </>
  )
}
