import React from 'react'
import MyTasks from '../tasks/MyTasks'
import Chat from '../../pages/Chat'

export default function RightLayout() {
  return (
    <div className='w-[25%] shadow-2xl p-2'>
      <aside className=" bg-white border-l border-[#fff] ">
          <div className="mb-6">
            <h2 className="font-semibold">Project Overview</h2>
            <p className="text-sm text-gray-500">Apr 14 – May 7 · In Progress</p>
          </div>

          <MyTasks />
          <Chat />
        </aside>
    </div>
  )
}
