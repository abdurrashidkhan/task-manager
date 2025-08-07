import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import RightSidebar from '../components/layouts/Members';


const AllTask = () => {

  const { tasks } = useSelector((state) => state.tasks)




  return (
    <div className="">
      <div className="">



        <div className="grid grid-cols-4 gap-5 mt-10">
          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Up Next</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                0
              </p>
            </div>
            <div className="space-y-3">
              <TaskCard />
            </div>
          </div>



          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>In Progress</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                0
              </p>
            </div>
            <div className="space-y-3">
              <TaskCard />
              <TaskCard />
            </div>
          </div>



          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Done</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                0
              </p>
            </div>
            <div className="space-y-3">
              <TaskCard />
            </div>
          </div>
          <div className="relative h-[800px] overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Tested</h1>
              <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
                0
              </p>
            </div>
            {/* <div className="space-y-3">
              <MyTasks />
            </div> */}
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
