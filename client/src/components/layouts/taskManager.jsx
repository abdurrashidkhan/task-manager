import React from 'react'
import TaskCard from '../tasks/TaskCard'
import { PlusIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import AllTask from '../../pages/AllTask'
import Navbar from './Navbar'

export default function TaskManager() {
  return (
      <main className="w-[100%]">
        <Navbar />
        <AllTask />
      </main>
  )
}
