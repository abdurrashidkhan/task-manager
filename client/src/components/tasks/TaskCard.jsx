import { ChatBubbleLeftIcon, TrashIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
// import { removeTask, updateStatus } from '../../redux/task/task';
// import { useCreateTaskMutation } from '../../redux/stores/api/tasksBaseApi';

const TaskCard = ({ option }) => {
  // const dispatch = useDispatch()
  const task = {
    id: option?._id,
    title: option?.title,
    status: option?.status,
    description: option?.description,
    date: format(new Date(option?.assigneeDate), 'dd MMM yyyy, hh:mm a'),
    deadline: option.deadline,
    assignedTo: option?.assignee,
    priority: option?.priority,
    image: option?.attachment,
  };
  // console.log(task, 'task in task card');
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
      <div className="w-full h-[120px] flex items-center justify-center bg-gray-100 rounded">
        <img
          className="max-h-full max-w-full object-fill rounded-t"
          src={task?.image}
          alt={task?.title}
        />
      </div>

      {/* Priority Badge */}
      <p
        className={`inline-block px-2 py-1 text-center rounded text-xs font-semibold capitalize m-1 shadow-2xl
              ${task?.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${task?.priority === 'high' ? 'bg-red-100 text-red-700' : ''}
              ${task?.priority === 'low' ? 'bg-green-100 text-green-700' : ''}`}
      >
        {task?.priority}
      </p>
      <div className='p-[5px] pt-0'>
        <div className=''>
          {/* Title and Assigned To */}
          <div className=''>
            <div className="flex items-center gap-2">
              <input type="radio" name="" id="" />
              <h1
                title={task?.title}
                className='text-lg font-semibold text-gray-700 truncate'
              >
                {task?.title}
              </h1>
            </div>
            <p className='text-sm text-gray-600 mt-1'>
              Assigned to:
              <span className='font-medium capitalize text-gray-800'> {task?.assignedTo}</span>
            </p>
          </div>
          <p className='font-semibold text-xs text-gray-600'>Deadline: {task?.deadline}</p>
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center'>
          <p className='text-xs text-gray-400'>Date: {task?.date}</p>

          <div className='flex gap-1 justify-end items-center'>
            {/* Status Update Button */}
            <button
              onClick={() => dispatch(updateStatus({ id: task?.id, status: status }))}
              title={task?.status}
              disabled={task?.status === 'archiver'}
              className={`p-2 rounded-lg transition ${task.status === 'archiver' ? 'cursor-not-allowed opacity-40' : 'hover:hover:cursor-pointer'
                }`}
            >
              <Bars3BottomLeftIcon className='h-4 w-4 text-gray-700 ' />
            </button>
            {/* comment Button */}
            <button
              onClick={() => handelClick(task?.id)}
              title='Delete'
              disabled={task?.status === 'archiver'}
              className={` rounded-lg transition ${task?.status === 'archiver' ? 'cursor-not-allowed opacity-40' : 'hover:hover:cursor-pointer'
                }`}
            >
              <ChatBubbleLeftIcon className='h-4 w-4 text-gray-700' />
            </button>
            {/* Delete Button */}
            <button
              onClick={() => handelClick(task?.id)}
              title='Delete'
              disabled={task?.status === 'archiver'}
              className={`p-2 rounded-lg transition ${task?.status === 'archiver' ? 'cursor-not-allowed opacity-40' : 'hover:cursor-pointer'
                }`}
            >
              <TrashIcon className='h-4 w-4 text-red-500 ' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
