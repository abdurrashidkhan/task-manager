import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
// import { removeTask, updateStatus } from '../../redux/task/task';
// import { useCreateTaskMutation } from '../../redux/stores/api/tasksBaseApi';

const TaskCard = ({ option }) => {
  // const dispatch = useDispatch()
  const task = {
    id: option?.id,
    title: option?.title,
    status: option?.status,
    description: option?.description,
    date: format(new Date(option?.assigneeDate), 'dd MMM yyyy, hh:mm a'),
    deadline: option.deadline,
    assignedTo: option?.assignee,
    priority: option?.priority,
    image: option?.attachment,
  };
  console.log(task, 'task in task card');
  // console.log(option, 'option in task card');
  // checking status and update status
  let status;
  if (task.status === 'to-do') {
    status = 'in-process';
  } else if (task.status === 'in-process') {
    status = 'submitted';
  } else if (task.status === 'submitted') {
    status = 'done';
  } else {
    status = 'archiver';
  }

  // const handelClick = (id) => {
  //   dispatch(removeTask(id))
  // }
  // const { data, isLoading, isError, error } = useCreateTaskMutation(task);
  // console.log(data , ' =============>')
  return (
    <div className='rounded bg-white shadow-lg hover:shadow-xl transition-all my-4 border border-gray-100'>
      <div className="w-full h-[180px] flex items-center justify-center bg-gray-100 rounded">
  <img 
    className="max-h-full max-w-full object-fill rounded-t" 
    src={task?.image} 
    alt={task?.title} 
  />
</div>


      <div className='p-5 pt-0'>
        <div className=''>
          {/* Title with priority color */}
          <h1 title={task?.title.length > 16 && task?.title}
            className={`text-lg font-bold mb-2 
              ${task?.priority === 'medium' ? 'text-yellow-500' : ''} 
              ${task?.priority === 'high' ? 'text-red-600' : ''} 
              ${task?.priority === 'low' ? 'text-green-600' : ''} capitalize`}
          >
            {task?.title.length > 16 ? task?.title.slice(0,16) + '...' : task?.title}
          </h1>

          {/* Description */}
          {/* <p className='text-gray-600 mb-3'>{task?.description}</p>  */}

          {/* Assigned to */}
          <p className='text-sm text-gray-500'>
            Assigned to:
            <span className='font-medium text-gray-700 capitalize'> {task?.assignedTo}</span>
          </p>
          <p className='font-semibold text-xs text-gray-600'>Deadline: {task?.deadline}</p>
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center mt-1'>
          <p className='text-xs text-gray-400'>Date: {task?.date}</p>

          <div className='flex gap-3'>
            {/* Delete Button */}
            <button
              onClick={() => handelClick(task?.id)}
              title='Delete'
              disabled={task?.status === 'archiver'}
              className={`p-2 rounded-lg transition ${
                task?.status === 'archiver' ? 'cursor-not-allowed opacity-40' : 'hover:bg-red-100'
              }`}
            >
              <TrashIcon className='h-5 w-5 text-red-500' />
            </button>

            {/* Status Update Button */}
            <button
              onClick={() => dispatch(updateStatus({ id: task?.id, status: status }))}
              title={task?.status}
              disabled={task?.status === 'archiver'}
              className={`p-2 rounded-lg transition ${
                task.status === 'archiver' ? 'cursor-not-allowed opacity-40' : 'hover:bg-blue-100'
              }`}
            >
              <ArrowRightIcon className='h-5 w-5 text-blue-500' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
