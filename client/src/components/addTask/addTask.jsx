import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/stores/tasks/action';
import { useCreateTaskMutation, useGetTasksQuery } from '../../redux/stores/api/tasksBaseApi';
import { createTaskAPI } from '../../redux/stores/tasks/api';
import { XMarkIcon, ChevronDownIcon, PaperClipIcon } from "@heroicons/react/24/outline";

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Create Issue</h2>
          <button>
            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <div className="relative">
              <select {...register("project")} className="w-full border rounded-md px-3 py-2 pr-10 text-sm">
                <option>My Scrum Project</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Issue Type</label>
            <div className="relative">
              <select {...register("issueType")} className="w-full border rounded-md px-3 py-2 pr-10 text-sm">
                <option>Task</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Summary<span className="text-red-500">*</span></label>
            <input {...register("summary", { required: true })} className={`w-full border rounded-md px-3 py-2 text-sm ${errors.summary ? 'border-red-500' : ''}`} />
            {errors.summary && <p className="text-red-500 text-xs mt-1">Summary is required</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea {...register("description")} rows={4} className="w-full border rounded-md px-3 py-2 text-sm"></textarea>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <div className="relative">
              <select {...register("assignee")} className="w-full border rounded-md px-3 py-2 pr-10 text-sm">
                <option>Automatic</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input type="date" {...register("startDate")} className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input type="date" {...register("dueDate")} className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium mb-1">Attachments</label>
            <div className="border-dashed border-2 rounded-md p-4 flex items-center justify-center text-gray-500 cursor-pointer">
              <PaperClipIcon className="w-5 h-5 mr-2" />
              <span>Drop files here or click to upload</span>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <div className="relative">
              <select {...register("priority")} className="w-full border rounded-md px-3 py-2 pr-10 text-sm">
                <option>Medium</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 border-t pt-4">
            <button type="button" className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
