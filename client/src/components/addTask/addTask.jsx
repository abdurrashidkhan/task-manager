import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/stores/tasks/action';
import { useCreateTaskMutation, useGetTasksQuery } from '../../redux/stores/api/tasksBaseApi';
import { createTaskAPI } from '../../redux/stores/tasks/api';

const AddTaskForm = ({ setTaskModal }) => {
  const dispatch = useDispatch();
  const { loading = false, error: createError = null } = useSelector((state) => state.tasks || {});

  // ✅ Ensure the hook exists and prevent crashes
  const { refetch } = useGetTasksQuery?.() || { refetch: () => {} };
  const [createTask, { isLoading, error, isError,isSuccess }] = useCreateTaskMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const taskData = {
      title: data?.title,
      description: data?.description,
      assignTo: data?.assignTo,
      deadline: data?.deadline,
      assignDate: new Date(),
      status: 'next-up',
      priority: data?.priority || 'High',
    };

    try {
      await dispatch(createTask(taskData));
      reset();
      setTaskModal(false);
      refetch(); // refresh RTK Query data
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };
if(error){
  console.log(error.message, 'Error creating task');
}
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-base-200 bg-opacity-50 shadow-2xl'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-lg p-6 rounded-lg w-96 space-y-4'
      >
        <h2 className='text-lg font-bold'>Add Task</h2>

        {/* Title */}
        <input
          type='text'
          placeholder='Title'
          {...register('title', { required: 'Title is required' })}
          className='input input-bordered w-full shadow border-gray-100 focus:shadow-xl transition-all'
        />
        {errors.title && (
          <span className="text-red-800 text-sm">{errors.title.message}</span>
        )}

        {/* Description */}
        <textarea
          placeholder='Description'
          {...register('description', { required: 'Description is required' })}
          className='textarea textarea-bordered w-full shadow border-gray-100 focus:shadow-xl transition-all'
        />
        {errors.description && (
          <span className="text-red-800 text-sm">
            {errors.description.message}
          </span>
        )}

        {/* Deadline */}
        <input
          type='date'
          {...register('deadline', { required: 'Deadline is required' })}
          className='input input-bordered w-full shadow border-gray-100 focus:shadow-xl transition-all'
        />
        {errors.deadline && (
          <span className="text-red-800 text-sm">
            {errors.deadline.message}
          </span>
        )}

        {/* Assignee */}
        <select
          {...register('assignTo', { required: 'Assignee is required' })}
          className='select select-bordered w-full shadow border-gray-100 focus:shadow-xl transition-all'
        >
          <option value=''>Assign to</option>
          <option value='rashidkhan'>Rashid Khan</option>
          <option value='Other'>Other</option>
        </select>
        {errors.assignTo && (
          <span className="text-red-800 text-sm">{errors.assignTo.message}</span>
        )}

        {/* Priority */}
        <select
          {...register("priority")}
          className="select select-bordered w-full shadow border-gray-100 focus:shadow-xl transition-all"
          defaultValue="High"
        >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>

        {/* API Error */}
        {createError && (
          <p className='text-red-600 text-sm'>
            {typeof createError === 'string'
              ? createError
              : createError?.message || 'Failed to create task'}
          </p>
        )}

        {/* Buttons */}
        <div className='flex justify-end space-x-2'>
          <button
            type='button'
            className='bg-red-700 hover:bg-red-800 text-white px-5 py-1 rounded shadow hover:shadow-xl'
            onClick={() => setTaskModal(false)}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-5 py-1 rounded shadow hover:shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setTaskModal(false)}
          >
            {isLoading ? 'Creating...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
