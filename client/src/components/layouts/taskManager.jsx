import React from 'react'
import TaskCard from '../tasks/TaskCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import AllTask from '../../pages/allTask'
import Navbar from './Navbar'

export default function TaskManager() {
  return (
      <main className="w-[100%]">
        <Navbar />
        <AllTask />

        {/* Right Sidebar */}
        {/* <aside className="w-80 bg-white shadow p-5 border-l">
          <h2 className="font-semibold mb-3">Project Overview</h2>
          <div className="text-sm text-gray-500 mb-4">
            <p>Timeline: Apr 14 - May 7</p>
            <p>Status: In Progress</p>
          </div>
          <hr className="my-4" />
          <p className="font-medium">Team Chat</p>
          <div className="mt-3 space-y-3 text-sm">
            <Message name="Rebeca Hosty" text="Have a great working week!" />
            <Message name="Devid Mackurat" text="Have a great working week!" />
            <Message name="Kate Watson" text="Okay, thanks for the tips!" /> 
          </div>
        </aside> */}
      </main>
  )
}
