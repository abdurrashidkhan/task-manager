import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/stores/tasks/action";
import {
  DndContext,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../components/tasks/TaskCard";

const SortableTask = ({ option }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option._id || option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard option={option} />
    </div>
  );
};

const TaskColumn = ({ id, title, taskList }) => {
  return (
    <div
      className={`bg-[#f5f5f5] shadow-2xl rounded w-full flex flex-col`}
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
        <SortableContext
          items={taskList.map((t) => t._id || t.id)}
          strategy={verticalListSortingStrategy}
        >
          {taskList?.map((task) => (
            <SortableTask key={task._id || task.id} option={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const AllTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const totalTasks = tasks?.task || [];

  const [columns, setColumns] = useState({
    "to-do": [],
    "in-process": [],
    "submitted": [],
    "done": [],
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    // task  column state
    setColumns({
      "to-do": totalTasks.filter((t) => t.status === "to-do"),
      "in-process": totalTasks.filter((t) => t.status === "in-process"),
      "submitted": totalTasks.filter((t) => t.status === "submitted"),
      "done": totalTasks.filter((t) => t.status === "done"),
    });
  }, [totalTasks]);

  // === handle drop ===
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find out which column was active.
    let activeColumn = null;
    let overColumn = null;

    Object.keys(columns).forEach((col) => {
      if (columns[col].find((task) => (task._id || task.id) === activeId)) {
        activeColumn = col;
      }
      if (columns[col].find((task) => (task._id || task.id) === overId)) {
        overColumn = col;
      }
    });

    if (!activeColumn) return;

    // === If the columns are the same, reorder will occur. ===
    if (activeColumn && overColumn && activeColumn === overColumn) {
      const oldIndex = columns[activeColumn].findIndex(
        (t) => (t._id || t.id) === activeId
      );
      const newIndex = columns[activeColumn].findIndex(
        (t) => (t._id || t.id) === overId
      );

      setColumns((prev) => ({
        ...prev,
        [activeColumn]: arrayMove(prev[activeColumn], oldIndex, newIndex),
      }));
    } else if (activeColumn && overColumn && activeColumn !== overColumn) {
      // === If the column is different, it will be pushed to another column. ===
      const activeTask = columns[activeColumn].find(
        (t) => (t._id || t.id) === activeId
      );

      setColumns((prev) => {
        const newActive = prev[activeColumn].filter(
          (t) => (t._id || t.id) !== activeId
        );
        const newOver = [...prev[overColumn], { ...activeTask, status: overColumn }];
        return {
          ...prev,
          [activeColumn]: newActive,
          [overColumn]: newOver,
        };
      });

      // === bSending update to ackend ===
      dispatch(updateTaskStatus({ taskId: activeId, newStatus: overColumn }));
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="grid grid-cols-4 gap-5 mt-2 px-2 items-start">
        {Object.keys(columns).map((colKey) => (
          <TaskColumn
            key={colKey}
            id={colKey}
            title={
              colKey === "to-do"
                ? "To Do"
                : colKey === "in-process"
                ? "In Progress"
                : colKey === "submitted"
                ? "In Reviews"
                : "Done"
            }
            taskList={columns[colKey]}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default AllTask;
