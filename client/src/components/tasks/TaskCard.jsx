import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../redux/task/task';

const TaskCard = ({ option }) => {

  const task = {
    id: option?.id,
    status: option?.status,
    description: option?.description,
    date: option?.assignDate.toString(),
    assignedTo: option?.assignTo,
    priority: option?.status,
  };

  // checking status and update status
  let status;
  if (task.status === 'next-up') {
    status = 'in-process'
  } else if (task.status === 'in-process') {
    status = 'done'
  } else{
    status = 'archiver'
  }

  const dispatch = useDispatch()
  return (
    <div className=" rounded-md p-5 bg-[#fff] shadow-md my-3">
      <h1
        className={`text-lg font-semibold mb-3  ${task.priority === 'high' ? 'text-red-500' : ''
          } ${task.priority === 'medium' ? 'text-yellow-500' : ''} ${task.priority === 'low' ? 'text-green-500' : ''
          }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignedTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button onClick={() => useDispatch(removeTask({ id: task.id, state: removeTask }))} title="Delete" disabled={task.status==='archiver' ? true : false} className='hover:cursor-pointer '>
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button
            onClick={() =>
              dispatch(updateStatus({ id: task.id, status: status }))
            }
            title={task.status}
            disabled={task.status === 'archiver'} className={`${task.status === 'archiver' ? 'cursor-not-allowed' : 'hover:cursor-pointer'} `}
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
