import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/stores/tasks/action"; 
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import TaskCard from "../components/tasks/TaskCard";

const DraggableTask = ({ option }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: option._id || option.id, // MongoDB id বা fallback
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-move"
    >
      <TaskCard option={option} />
    </div>
  );
};

const TaskColumn = ({ id, title, taskList }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#f5f5f5] shadow-2xl rounded w-full flex flex-col transition ${
        isOver ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Header */}
      <div className="flex sticky top-0 justify-between bg-white p-5 rounded-t shadow">
        <h1>{title}</h1>
        <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
          {taskList?.length}
        </p>
      </div>

      {/* Tasks */}
      <div
        className="space-y-3 px-3 overflow-y-auto"
        style={{ maxHeight: "calc(95vh - 100px)" }}
      >
        {taskList?.map((task) => (
          <DraggableTask key={task._id || task.id} option={task} />
        ))}
      </div>
    </div>
  );
};

const AllTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const totalTasks = tasks?.task || [];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // === handle drop ===
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;

    console.log("Moved Task:", taskId, "→", newStatus);

    dispatch(updateTaskStatus({taskId, newStatus}));
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-5 mt-2 px-2 items-start">
        <TaskColumn
          id="to-do"
          title="To Do"
          taskList={totalTasks.filter((t) => t.status === "to-do")}
        />
        <TaskColumn
          id="in-process"
          title="In Progress"
          taskList={totalTasks.filter((t) => t.status === "in-process")}
        />
        <TaskColumn
          id="submitted"
          title="In Reviews"
          taskList={totalTasks.filter((t) => t.status === "submitted")}
        />
        <TaskColumn
          id="done"
          title="Done"
          taskList={totalTasks.filter((t) => t.status === "done")}
        />
      </div>
    </DndContext>
  );
};

export default AllTask;
