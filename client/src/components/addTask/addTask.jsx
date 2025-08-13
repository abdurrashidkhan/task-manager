import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/stores/tasks/action';
import { useCreateTaskMutation, useGetTasksQuery } from '../../redux/stores/api/tasksBaseApi';
import { createTaskAPI } from '../../redux/stores/tasks/api';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const AddTaskForm = ({ setTaskModal }) => {
  const dispatch = useDispatch();
  const { loading = false, error: createError = null } = useSelector((state) => state.tasks || {});

  // ✅ Ensure the hook exists and prevent crashes
  const { refetch } = useGetTasksQuery?.() || { refetch: () => {} };
  const [createTask, { isLoading, error, isError, isSuccess }] = useCreateTaskMutation();
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
      refetch();
      reset();
    } catch (err) {
      console.error('Task creation failed:', err);
    }
  };
  if (error) {
    console.log(error.message, 'Error creating task');
  }
  return (
    <div className='fixed  inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none bg-[#05050546] '>
      <div className='relative h-[80%] w-full max-w-3xl mx-auto overflow-y-auto rounded'>
        {/* Modal content */}
        <div className='relative flex flex-col w-full bg-white border-0 shadow-xl outline-none focus:outline-none rounded'>
          {/* Modal header */}
          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
            <h3 className='text-xl font-semibold text-gray-800'>Create Task</h3>
            <button
              className='p-1 ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
              onClick={() => setTaskModal(false)}
            >
              <XMarkIcon className='h-6 w-6 text-[#000] hover:text-[#fff] outline outline-[#c20404] hover:bg-[#990a0a]  shadow-2xl rounded transition duration-500 ease-in-out hover' />
            </button>
          </div>

          {/* Modal body */}
          <div className='relative p-6 flex-auto'>
            <form id='task-form' onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                  type='text'
                  placeholder='Title'
                  {...register('title', { required: true, minLength: 100 })}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors?.title && (
                  <span className='text-red-600 text-sm mt-1'>
                    {errors.title.message || 'This field is required'}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea
                  rows={4}
                  placeholder='Description'
                  {...register('description', { required: true, minLength: 100 })}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors?.description && (
                  <span className='text-red-600 text-sm mt-1'>
                    {errors.description.message || 'This field is required'}
                  </span>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Deadline</label>
                <input
                  type='date'
                  {...register('deadline', { required: true, minLength: 100 })}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors?.deadline && (
                  <span className='text-red-600 text-sm mt-1'>
                    {errors.deadline.message || 'This field is required'}
                  </span>
                )}
              </div>

              {/* Assignee */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Assign to</label>
                <select
                  {...register('assignTo', { required: true, minLength: 100 })}
                  className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  defaultValue=''
                >
                  <option value='' disabled>
                    Select Assignee
                  </option>
                  <option value='rashidkhan'>Rashid Khan</option>
                  <option value='Other'>Other</option>
                </select>
                {errors?.assignTo && (
                  <span className='text-red-600 text-sm mt-1'>
                    {errors.assignTo.message || 'This field is required'}
                  </span>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
                <select
                  {...register('priority', { required: true, minLength: 100 })}
                  className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  defaultValue='High'
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
              </div>

              {/* Attachment Section (styled to match the screenshot) */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Attachment</label>
                <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                  <div className='space-y-1 text-center'>
                    <CloudArrowUpIcon className='mx-auto h-12 w-12 text-gray-400' />
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500'
                      >
                        <span>Upload a file</span>
                        {/* Hidden file input for a custom upload button */}
                        <input id='file-upload' type='file' className='sr-only' />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Modal footer */}
          <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
            {/* API Error */}
            {createError && (
              <p className='text-red-600 text-sm mr-auto'>
                {typeof createError === 'string'
                  ? createError
                  : createError?.message || 'Failed to create task'}
              </p>
            )}
            <div className='flex space-x-2'>
              <button
                type='button'
                className='bg-white text-gray-600 px-5 py-2 rounded font-semibold border border-gray-300 hover:bg-gray-50'
                onClick={() => setTaskModal(false)}
              >
                Cancel
              </button>
              <button
                type='submit'
                form='task-form' // Link button to the form
                disabled={isLoading}
                className={`px-5 py-2 rounded font-semibold transition-colors ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Creating...' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
