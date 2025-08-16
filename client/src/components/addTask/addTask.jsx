import { useForm } from 'react-hook-form';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/stores/tasks/action';
const TaskModal = ({ setTaskModal }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    const taskImage = data?.taskImage[0];
    if (taskImage) {
      formData.append('file', taskImage);
      formData.append('upload_preset', 'images_preset'); // Update with your preset name
      const imageResponse = await fetch(`https://api.cloudinary.com/v1_1/dqsqaozc0/upload`, {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (imageResponse.secure_url) {
        let image = imageResponse.secure_url;
        const taskDetails = {
          project: data.project,
          title: data.title,
          description: data.description,
          status: data.status,
          type: data.workType,
          team: data.team,
          assignee: data.assignTo,
          priority: data.priority,
          labels: data.labels.split(',').map((label) => label.trim()),
          deadline: data.deadline,
          startDate: data.startDate,
          restrictions: data.restrictedTo,
          reporter: data.reporter,
          relation: data.relation,
          url: data.relatedUrl,
          isImpediment: data.flagged,
          attachment: image,
        };
        dispatch(addTask(taskDetails));
        reset();
        setTaskModal(false);
        console.log(image, 'image uploaded successfully');
      } else {
        throw new Error('Image upload failed');
      }
    }
  };

  const allFieldsRequired = (fieldName) => ({
    required: `${fieldName} is required`,
  });

  return (
    <div className='fixed inset-0 z-[1111] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-[#0000003b]'>
      <div className='relative w-full max-w-4xl mx-auto'>
        {/* Modal content */}
        <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-xl outline-none focus:outline-none max-h-[95vh] overflow-y-auto'>
          {/* Modal header */}
          <div className='flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t sticky top-0 bg-white z-10'>
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
              <div className=''>
                {/* Project Field */}
                <div>
                  <label htmlFor='project' className='block text-sm font-medium text-gray-700'>
                    Project <span className='text-red-500'>*</span>
                  </label>
                  <div className='mt-1'>
                    <select
                      id='project'
                      name='project'
                      {...register('project', allFieldsRequired('Project'))}
                      className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm'
                      defaultValue='My Scrum Project (SCRUM)'
                    >
                      <option value=''>Select a Project</option>
                      <option>My Scrum Project (SCRUM)</option>
                    </select>
                    {errors.project && (
                      <span className='mt-1 text-sm text-red-500'>{errors.project.message}</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Title <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Task Title'
                  {...register('title', allFieldsRequired('Title'))}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors.title && (
                  <span className='text-red-600 text-sm mt-1'>{errors.title.message}</span>
                )}
              </div>
              {/* Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder='Description of the task'
                  {...register('description', allFieldsRequired('Description'))}
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                />
                {errors.description && (
                  <span className='text-red-600 text-sm mt-1'>{errors.description.message}</span>
                )}
              </div>
              {/* Status Field */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <div className='mt-1'>
                    <select
                      id='status'
                      name='status'
                      {...register('status', allFieldsRequired('Status'))}
                      className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm'
                      defaultValue='Idea'
                    >
                      <option value=''>Select a Status</option>
                      <option value={'to-do'}>To Do</option>
                      <option value={'in-progress'}>In Progress</option>
                    </select>
                    {errors.status && (
                      <span className='mt-1 text-sm text-red-500'>{errors.status.message}</span>
                    )}
                    <p className='mt-2 text-sm text-gray-500'>
                      This is the initial status upon creation
                    </p>
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
                      {...register('workType', allFieldsRequired('Work type'))}
                      className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm'
                      defaultValue='Feature'
                    >
                      <option value=''>Select a Work type</option>
                      <option>Feature</option>
                      <option>Bug</option>
                      <option>Task</option>
                    </select>
                    {errors.workType && (
                      <span className='mt-1 text-sm text-red-500'>{errors.workType.message}</span>
                    )}
                    <a href='#' className='mt-2 text-sm text-gray-500 pt-2'>
                      Learn about work types
                    </a>
                  </div>
                </div>
              </div>
              {/* Grid for two-column fields */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Team */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Team <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('team', allFieldsRequired('Team'))}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                    defaultValue='none'
                  >
                    <option value='none' disabled>
                      None
                    </option>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                  </select>
                  {errors.team && (
                    <span className='text-red-600 text-sm mt-1'>{errors.team.message}</span>
                  )}
                </div>

                {/* Assignee */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Assign to <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('assignTo', allFieldsRequired('Assignee'))}
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
                  {errors.assignTo && (
                    <span className='text-red-600 text-sm mt-1'>{errors.assignTo.message}</span>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Priority */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Priority <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('priority', allFieldsRequired('Priority'))}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                    defaultValue='high'
                  >
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                  </select>
                  {errors.priority && (
                    <span className='text-red-600 text-sm mt-1'>{errors.priority.message}</span>
                  )}
                </div>
                {/* Labels */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Labels <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Enter labels (e.g., bug, feature)'
                    {...register('labels', allFieldsRequired('Labels'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.labels && (
                    <span className='text-red-600 text-sm mt-1'>{errors.labels.message}</span>
                  )}
                </div>
                {/* Parent */}
                {/* <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Parent <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Parent Task'
                    {...register('parent', allFieldsRequired('Parent'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.parent && (
                    <span className='text-red-600 text-sm mt-1'>{errors.parent.message}</span>
                  )}
                </div> */}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Deadline */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Deadline <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    {...register('deadline', allFieldsRequired('Deadline'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.deadline && (
                    <span className='text-red-600 text-sm mt-1'>{errors.deadline.message}</span>
                  )}
                </div>
                {/* Start Date */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Start Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    {...register('startDate', allFieldsRequired('Start Date'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.startDate && (
                    <span className='text-red-600 text-sm mt-1'>{errors.startDate.message}</span>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Restricted To */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Restricted To <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Restrict to a specific user or group'
                    {...register('restrictedTo', allFieldsRequired('Restricted To'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.restrictedTo && (
                    <span className='text-red-600 text-sm mt-1'>{errors.restrictedTo.message}</span>
                  )}
                </div>
                {/* Reporter */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Reporter <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Reporter name'
                    {...register('reporter', allFieldsRequired('Reporter'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.reporter && (
                    <span className='text-red-600 text-sm mt-1'>{errors.reporter.message}</span>
                  )}
                </div>
                {/* Sprint */}
                {/* <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Sprint <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('sprint', allFieldsRequired('Sprint'))}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                    defaultValue='none'
                  >
                    <option value='none' disabled>
                      None
                    </option>
                    <option value='sprint1'>Sprint 1</option>
                    <option value='sprint2'>Sprint 2</option>
                  </select>
                  {errors.sprint && (
                    <span className='text-red-600 text-sm mt-1'>{errors.sprint.message}</span>
                  )}
                </div> */}
              </div>

              {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                Story Points
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Story Points <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder='e.g., 5'
                    {...register('storyPoints', allFieldsRequired('Story Points'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.storyPoints && (
                    <span className='text-red-600 text-sm mt-1'>{errors.storyPoints.message}</span>
                  )}
                </div>
              </div> */}

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Relation */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Relation <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('relation', allFieldsRequired('Relation'))}
                    className='block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  >
                    <option value='setting' className='capitalize'>
                      setting
                    </option>
                    <option value='profile' className='capitalize'>
                      profile
                    </option>
                  </select>
                  {errors.relation && (
                    <span className='text-red-600 text-sm mt-1'>{errors.relation.message}</span>
                  )}
                </div>

                {/* Related URL */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Related URL <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='url'
                    placeholder='https://example.com'
                    {...register('relatedUrl', allFieldsRequired('Related URL'))}
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all'
                  />
                  {errors.relatedUrl && (
                    <span className='text-red-600 text-sm mt-1'>{errors.relatedUrl.message}</span>
                  )}
                </div>
              </div>

              {/* Flags & Create Another */}
              <div className=''>
                <h2 className='block text-base  font-medium text-gray-700'>Impediment</h2>
                <p className='text-[#6A7282] text-sm'>Allows to flag issues with impediments.</p>
                <label className='flex items-center space-x-2 text-gray-700 pt-2'>
                  <input
                    type='checkbox'
                    {...register('flagged')}
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded block'
                  />
                  <span>Impediment</span>
                </label>
                {/* <label className='flex items-center space-x-2 text-gray-700'>
                  <input
                    type='checkbox'
                    {...register('createAnother')}
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                  />
                  <span>Create another</span>
                </label> */}
              </div>

              {/* Attachment Section */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Attachment <span className='text-red-500'>*</span>
                </label>
                <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                  <div className='space-y-1 text-center'>
                    <CloudArrowUpIcon className='mx-auto h-12 w-12 text-gray-400' />
                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='taskImage'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='taskImage'
                          type='file'
                          className='sr-only'
                          {...register('taskImage', allFieldsRequired('Attachment'))}
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    {errors['taskImage'] && (
                      <span className='text-red-600 text-sm mt-1'>
                        {errors['taskImage'].message}
                      </span>
                    )}
                    <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Modal footer */}
          <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b sticky bottom-0 bg-white z-10'>
            {/* API Error */}
            {error?.message && (
              <p className='text-red-600 text-sm mr-auto'>
                {typeof error?.message === 'string'
                  ? error?.message
                  : error?.message || 'Failed to create task'}
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
                disabled={loading}
                className={`px-5 py-2 rounded font-semibold transition-colors ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Creating...' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
