import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import RightSidebar from '../components/layouts/Members';


const AllTask = () => {

  const { tasks, removeTask } = useSelector((state) => state.tasks)


  const runningTask = tasks.filter(option => option.status === 'next-up')
  const inProcessTask = tasks.filter(option => option.status === 'in-process')
  const doneTask = tasks.filter(option => option.status === 'done')

  return (
    <div className="">
      <div className="">



        <div className="grid grid-cols-4 gap-5 mt-2 px-2 ">
          <div className={`${ runningTask.length > 0 && 'h-auto' } relative h-[65px] overflow-auto bg-[#f5f5f5] shadow-2xl rounded `}>
            <div className="flex sticky top-0 justify-between bg-[#fff] p-5 rounded shadow">
              <h1>Up Next</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                {runningTask.length}
              </p>
            </div>
            <div className="space-y-3 px-3 mb-5">
              {
                runningTask.map(option =>
                  <TaskCard option={option} removeTask={removeTask} />
                )
              }
            </div>
          </div>



          <div className={`${ inProcessTask.length > 0 && 'h-auto' } relative h-[65px] overflow-auto bg-[#fff] shadow-2xl rounded `}>
            <div className="flex sticky top-0 justify-between bg-[#fff] p-5 rounded shadow">
              <h1>In Progress</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                {inProcessTask.length}
              </p>
            </div>
            <div className="space-y-3 px-3 mb-5">
              {
                inProcessTask.map(option =>
                  <TaskCard option={option} removeTask={removeTask} />
                )
              }
            </div>
          </div>



          <div className={`${ doneTask.length > 0 && 'h-auto' } relative h-[65px] overflow-auto bg-[#fff] shadow-2xl rounded `}>
            <div className="flex sticky top-0 justify-between bg-[#fff] p-5 rounded shadow">
              <h1>Done</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                {doneTask.length}
              </p>
            </div>
            <div className="space-y-3 px-3 mb-5">
              {
                doneTask.map(option =>
                  <TaskCard option={option} removeTask={removeTask} />
                )
              }
            </div>
          </div>
          
        </div>
      </div>
      {/* <div className="col-span-3 border-l-2 border-secondary/20 px-10 pt-10">
        <RightSidebar />
      </div> */}
    </div>
  );
};

export default AllTask;
