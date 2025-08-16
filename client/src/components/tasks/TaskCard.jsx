import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { removeTask, updateStatus } from '../../redux/task/task';
// import { useCreateTaskMutation } from '../../redux/stores/api/tasksBaseApi';


const TaskCard = ({ option }) => {
  // const dispatch = useDispatch()
  const task = {
    id: option?.id,
    status: option?.status,
    description: option?.description,
    date: option?.assignDate.toString(),
    assignedTo: option?.assignTo,
    priority: option?.status,
  };
// console.log(option, 'option in task card');
  // checking status and update status
  let status;
  if (task.status === 'next-up') {
    status = 'in-process'
  } else if (task.status === 'in-process') {
    status = 'submitted'
  } else if (task.status === 'submitted') {
    status = 'done'
  } else {
    status = 'archiver'
  }

  // const handelClick = (id) => {
  //   dispatch(removeTask(id))
  // }
  // const { data, isLoading, isError, error } = useCreateTaskMutation(task);
  // console.log(data , ' =============>')
  return (
    <div className="rounded-xl p-5 bg-white shadow-lg hover:shadow-xl transition-all my-4 border border-gray-100">
  {/* Title with priority color */}
  <h1
    className={`text-lg font-bold mb-2 
      ${task.priority === "high" ? "text-red-600" : ""} 
      ${task.priority === "medium" ? "text-yellow-500" : ""} 
      ${task.priority === "low" ? "text-green-600" : ""}`}
  >
    {task?.title}
  </h1>

  {/* Description */}
  <p className="text-gray-600 mb-3">{task?.description}</p>

  {/* Assigned to */}
  <p className="text-sm text-gray-500 italic">
    Assigned to: <span className="font-medium text-gray-700">{task?.assignedTo}</span>
  </p>

  {/* Footer */}
  <div className="flex justify-between items-center mt-4">
    <p className="text-xs text-gray-400">{task?.date}</p>

    <div className="flex gap-3">
      {/* Delete Button */}
      <button
        onClick={() => handelClick(task.id)}
        title="Delete"
        disabled={task.status === "archiver"}
        className={`p-2 rounded-lg transition ${
          task.status === "archiver"
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-red-100"
        }`}
      >
        <TrashIcon className="h-5 w-5 text-red-500" />
      </button>

      {/* Status Update Button */}
      <button
        onClick={() => dispatch(updateStatus({ id: task.id, status: status }))}
        title={task.status}
        disabled={task.status === "archiver"}
        className={`p-2 rounded-lg transition ${
          task.status === "archiver"
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-blue-100"
        }`}
      >
        <ArrowRightIcon className="h-5 w-5 text-blue-500" />
      </button>
    </div>
  </div>
</div>
   
  );
};

export default TaskCard;
