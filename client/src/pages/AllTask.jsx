import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/stores/tasks/action';

const AllTask = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const totalTasks = tasks?.task;

  console.log(totalTasks, 'totalTasks in allTask');
  useEffect(() => {
    dispatch(fetchTasks());
    if (loading) {
      setIsLoading(true);
    }else{
      setIsLoading(false);
    }
  }, []);

  const runningTask = totalTasks?.filter((option) => option?.status=== 'to-do');
  const inProcessTask = totalTasks?.filter((option) => option?.status === 'in-process');
  const submittedTask = totalTasks?.filter((option) => option?.status === 'submitted');
  const doneTask = totalTasks?.filter((option) => option?.status === 'done');

  // Reusable column component
  const TaskColumn = ({ title, taskList }) => (
    <div className='bg-[#f5f5f5] shadow-2xl rounded w-[100%] flex flex-col'>
      {/* Header */}
      <div className='flex sticky top-0 justify-between bg-white p-5 rounded-t shadow'>
        <h1>{title}</h1>
        <p className='bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md'>
          {taskList?.length}
        </p>
      </div>

      {/* Scrollable content */}
      <div
        className='space-y-3 px-3 overflow-y-auto'
        style={{ maxHeight: 'calc(95vh - 100px)' }} // subtract header height
      >
        {taskList?.map((option) => (
          <TaskCard option={option} key={option?._id}/>
        ))}
      </div>
    </div>
  );
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.massage}</h1>;
  }
  return (
    <div className='grid grid-cols-4 gap-5 mt-2 px-2 items-start'>
      <TaskColumn title='To Do' taskList={runningTask} />
      <TaskColumn title='In Progress' taskList={inProcessTask} />
      <TaskColumn title='In Reviews' taskList={submittedTask} />
      <TaskColumn title='Done' taskList={doneTask} />
    </div>
  );
};

export default AllTask;
