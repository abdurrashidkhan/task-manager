import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskManager from './taskManager';
import RightLayout from './RightLayout';
import { isMobile } from 'react-device-detect';

const MainLayout = () => {
  return (
    <div  className="">
      <div className="flex gap-0">
        <Sidebar />
        <TaskManager />
        {
          !isMobile && <RightLayout /> 
        }
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
