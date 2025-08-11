import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskManager from './taskManager';
import RightLayout from './RightLayout';

const MainLayout = () => {
  return (
    <div  className="">
      <div className="flex gap-0">
        <Sidebar />
        <TaskManager />
        <RightLayout />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
