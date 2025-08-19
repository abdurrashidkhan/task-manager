import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/stores/tasks/action"; 
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import TaskCard from "../components/tasks/TaskCard";

const AllTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const totalTasks = tasks?.task || [];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // === Handle drop ===
  const handleDragEnd = ({ active, over }) => {
    if (over) {
      console.log("Moved Task", active.id, "→", over.id);
      // ✅ Update task status in Redux
      dispatch(updateTaskStatus(active.id, over.id));
    }
  };

  // === Draggable wrapper ===
  const DraggableTask = ({ option }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: option._id || option.id, // unique task id
    });

    return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
        <TaskCard option={option} />
      </div>
    );
  };

  // === Droppable Column ===
  const TaskColumn = ({ id, title, taskList }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
      <div
        ref={setNodeRef}
        className={`bg-[#f5f5f5] shadow-2xl rounded w-full flex flex-col 
          ${isOver ? "ring-2 ring-blue-500" : ""}`}
      >
        {/* Header */}
        <div className="flex sticky top-0 justify-between bg-white p-5 rounded-t shadow">
          <h1>{title}</h1>
          <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
            {taskList?.length}
          </p>
        </div>

        {/* Scrollable content */}
        <div
          className="space-y-3 px-3 overflow-y-auto"
          style={{ maxHeight: "calc(95vh - 100px)" }}
        >
          {taskList?.map((option) => (
            <DraggableTask key={option._id || option.id} option={option} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  // Group tasks by status
  const runningTask = totalTasks.filter((t) => t.status === "to-do");
  const inProcessTask = totalTasks.filter((t) => t.status === "in-process");
  const submittedTask = totalTasks.filter((t) => t.status === "submitted");
  const doneTask = totalTasks.filter((t) => t.status === "done");

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-5 mt-2 px-2 items-start">
        <TaskColumn id="to-do" title="To Do" taskList={runningTask} />
        <TaskColumn id="in-process" title="In Progress" taskList={inProcessTask} />
        <TaskColumn id="submitted" title="In Reviews" taskList={submittedTask} />
        <TaskColumn id="done" title="Done" taskList={doneTask} />
      </div>
    </DndContext>
  );
};

export default AllTask;
