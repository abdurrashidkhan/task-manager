import { useForm } from 'react-hook-form';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const TaskModal = ({ setTaskModal, isLoading, createError, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      deadline: '',
      assignTo: '',
      priority: 'High',
      parent: '',
      labels: '',
      team: 'none',
      startDate: '',
      sprint: 'none',
      storyPoints: '',
      reporter: 'Rashid khan',
      relation: 'blocks',
      relatedUrl: '',
      restrictedTo: '',
      flagged: false,
      createAnother: false,
    },
  });

  return (
    <div className='fixed inset-0 z-[1111] flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none bg-[#0000003b] bg-opacity-50'>
      <div className='relative '>
        {/* Modal content */}
        <div className='relative flex flex-col bg-white border-0 rounded-lg shadow-xl outline-none focus:outline-none w-[50vw] mx-auto h-[95vh] overflow-y-auto'>
          {/* Modal header */}
          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
            <h3 className='text-xl font-semibold text-gray-800'>Create Task</h3>
            <button
              className='p-1 ml-auto bg-transparent border-0 text-gray-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
              onClick={() => setTaskModal(false)}
            >
              <XMarkIcon className='h-6 w-6 text-gray-500 hover:text-gray-900 transition-colors' />
            </button>
          </div>

          {/* Modal body */}
          <div className='relative p-6 flex-auto'>
            <form id='task-form' onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label htmlFor='project' className='block text-sm font-medium text-gray-700'>
                  Project <span className='text-red-500'>*</span>
                </label>
                <div className='mt-1'>
                  <select
                    id='project'
                    name='project'
                    {...register('project', { required: true })}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm'
                    defaultValue='My Scrum Project (SCRUM)'
                  >
                    <option>My Scrum Project (SCRUM)</option>
                    {/* Add more options here */}
                  </select>
                  {errors.project && (
                    <span className='mt-1 text-sm text-red-500'>This field is required</span>
                  )}
                </div>
              </div>

              {/* Work Type Field */}
              <div>
                <label htmlFor='workType' className='block text-sm font-medium text-gray-700'>
                  Work type <span className='text-red-500'>*</span>
                </label>
                <div className='mt-1'>
                  <select
                    id='workType'
                    name='workType'
                    {...register('workType', { required: true })}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm'
                    defaultValue='Feature'
                  >
                    <option>Feature</option>
                    <option>Bug</option>
                    <option>Task</option>
                    {/* Add more options here */}
                  </select>
                  {errors.workType && (
                    <span className='mt-1 text-sm text-red-500'>This field is required</span>
                  )}
                  <a href='#' className='mt-2 block text-sm text-blue-600 hover:text-blue-500'>
                    Learn about work types
                  </a>
                </div>
              </div>

              <hr className='my-6 border-gray-200' />

              {/* Status Field */}
              <div>
                <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
                  Status
                </label>
                <div className='mt-1'>
                  <select
                    id='status'
                    name='status'
                    {...register('status')}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm'
                    defaultValue='Idea'
                  >
                    <option>Idea</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                  <p className='mt-2 text-sm text-gray-500'>
                    This is the initial status upon creation
                  </p>
                </div>
              </div>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                  type='text'
                  placeholder='Task Title'
                  {...register('title', { required: 'Title is required' })}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors.title && (
                  <span className='text-red-600 text-sm mt-1'>{errors.title.message}</span>
                )}
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea
                  rows={4}
                  placeholder='Description of the task'
                  {...register('description', { required: 'Description is required' })}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors.description && (
                  <span className='text-red-600 text-sm mt-1'>{errors.description.message}</span>
                )}
              </div>

              {/* Grid for two-column fields */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Deadline */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Deadline</label>
                  <input
                    type='date'
                    {...register('deadline')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>

                {/* Assignee */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Assign to</label>
                  <select
                    {...register('assignTo')}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                    defaultValue=''
                  >
                    <option value='' disabled>
                      Select Assignee
                    </option>
                    <option value='rashidkhan'>Rashid Khan</option>
                    <option value='john'>John</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Priority */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
                  <select
                    {...register('priority')}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                    defaultValue='High'
                  >
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </select>
                </div>

                {/* Parent */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Parent</label>
                  <input
                    type='text'
                    placeholder='Parent Task'
                    {...register('parent')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Start Date */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
                  <input
                    type='date'
                    {...register('startDate')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>

                {/* Labels */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Labels</label>
                  <input
                    type='text'
                    placeholder='Enter labels (e.g., bug, feature)'
                    {...register('labels')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Team */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Team</label>
                  <select
                    {...register('team')}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  >
                    <option value='none'>None</option>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                  </select>
                </div>

                {/* Sprint */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Sprint</label>
                  <select
                    {...register('sprint')}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  >
                    <option value='none'>None</option>
                    <option value='sprint1'>Sprint 1</option>
                    <option value='sprint2'>Sprint 2</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Story Points */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Story Points
                  </label>
                  <input
                    type='number'
                    placeholder='e.g., 5'
                    {...register('storyPoints')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>

                {/* Reporter */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Reporter</label>
                  <input
                    type='text'
                    placeholder='Reporter name'
                    {...register('reporter')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Relation */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Relation</label>
                  <select
                    {...register('relation')}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  >
                    <option value='blocks'>Blocks</option>
                    <option value='relates'>Relates</option>
                  </select>
                </div>

                {/* Related URL */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Related URL
                  </label>
                  <input
                    type='url'
                    placeholder='https://example.com'
                    {...register('relatedUrl')}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                </div>
              </div>

              {/* Restricted To */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Restricted To
                </label>
                <input
                  type='text'
                  placeholder='Restrict to a specific user or group'
                  {...register('restrictedTo')}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
              </div>

              {/* Flags & Create Another */}
              <div className='flex items-center space-x-4'>
                <label className='flex items-center space-x-2 text-gray-700'>
                  <input
                    type='checkbox'
                    {...register('flagged')}
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                  />
                  <span>Flagged</span>
                </label>
                <label className='flex items-center space-x-2 text-gray-700'>
                  <input
                    type='checkbox'
                    {...register('createAnother')}
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                  />
                  <span>Create another</span>
                </label>
              </div>

              {/* Attachment Section */}
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

export default TaskModal;
