import React from "react";
import { useForm } from "react-hook-form";

const AddTaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const taskData = {
      title : data.title,
      description: data.description,
      assignTo:data.assignTo,
      deadline:data.deadline,
      assignDate: new Date()
    }
    console.log("Form submitted:", taskData);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-200 bg-opacity-50 shadow-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-lg font-bold">Add Task</h2>

        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="input input-bordered w-full shadow focus:shadow-xl border-gray-100 transition-all ease-in-out duration-500"
        />
        {errors.title && (
          <span className="text-error text-sm">{errors.title.message}</span>
        )}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered w-full shadow focus:shadow-xl border-gray-100 transition-all ease-in-out duration-500"
        />
        {errors.description && (
          <span className="text-error text-sm">
            {errors.description.message}
          </span>
        )}

        <input
          type="date"
          {...register("deadline", { required: "Deadline is required" })}
          className="input input-bordered w-full shadow focus:shadow-xl border-gray-100 transition-all ease-in-out duration-500"
        />
        {errors.deadline && (
          <span className="text-error text-sm">{errors.deadline.message}</span>
        )}

        <select
          {...register("assignTo", { required: "Assignee is required" })}
          className="select select-bordered w-full shadow focus:shadow-xl border-gray-100 transition-all ease-in-out duration-500 hover:cursor-pointer"
        >
          <option className="hover:cursor-pointer" value="">Assign to</option>
          <option className="hover:cursor-pointer" value="rashidkhan">Rashid khan</option>
          <option className="hover:cursor-pointer" value="Other">Other</option>
        </select>
        {errors.assignTo && (
          <span className="text-error text-sm">{errors.assignTo.message}</span>
        )}

        <select
          {...register("priority")}
          className="select select-bordered w-full shadow focus:shadow-xl border-gray-100 transition-all ease-in-out duration-500 hover:cursor-pointer"
          defaultValue="High"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button type="button" className=" bg-red-700 hover:bg-red-800 text-[#fff] px-5 py-1 rounded shadow hover:shadow-xl hover:cursor-pointer" onClick={() => reset()} >
            Cancel
          </button>
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-[#fff] px-5 py-1 rounded shadow hover:shadow-xl  hover:cursor-pointer">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
