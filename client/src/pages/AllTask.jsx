import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/stores/tasks/action";
import {
  DndContext,
  rectIntersection,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../components/tasks/TaskCard";
import Loading from "../components/layouts/Loading";

/** ========== Sortable Task ========== */
const SortableTask = ({ task, placeholder }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: placeholder ? "60px" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard option={task} />
    </div>
  );
};

/** ========== Column Component ========== */
const TaskColumn = ({ id, title, tasks, placeholderId }) => (
  <div className="bg-[#f5f5f5] shadow-2xl rounded w-full flex flex-col">
    {/* Header */}
    <div className="flex sticky top-0 justify-between bg-white p-5 rounded-t shadow z-10">
      <h1>{title}</h1>
      <p className="bg-blue-500 text-white w-6 h-6 grid place-content-center rounded-md">
        {tasks.length}
      </p>
    </div>

    {/* Task list */}
    <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
      <div className="space-y-3 px-3 overflow-y-auto" style={{ maxHeight: "calc(95vh - 100px)" }}>
        {tasks.map((task) => (
          <SortableTask
            key={task._id}
            task={task}
            placeholder={placeholderId === task._id}
          />
        ))}
      </div>
    </SortableContext>
  </div>
);

/** ========== Main Board ========== */
const AllTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const totalTasks = tasks?.task || [];

  const [columns, setColumns] = useState({
    "to-do": [],
    "in-process": [],
    submitted: [],
    done: [],
  });

  const [activeTask, setActiveTask] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);

  /** Load tasks from API */
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  /** Organize tasks by status */
  useEffect(() => {
    setColumns({
      "to-do": totalTasks.filter((t) => t.status === "to-do"),
      "in-process": totalTasks.filter((t) => t.status === "in-process"),
      submitted: totalTasks.filter((t) => t.status === "submitted"),
      done: totalTasks.filter((t) => t.status === "done"),
    });
  }, [totalTasks]);

  /** Helpers */
  const findColumn = (taskId) =>
    Object.keys(columns).find((col) => columns[col].some((t) => t._id === taskId));

  /** Drag Start */
  const handleDragStart = ({ active }) => {
    const task = totalTasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  /** Drag Over (live preview reordering + moving) */
  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    
    

    if (!activeColumn || !overColumn) return;

    // Same column reorder
    if (activeColumn === overColumn) {
      const oldIndex = columns[activeColumn].findIndex((t) => t._id === activeId);
      const newIndex = columns[overColumn].findIndex((t) => t._id === overId);

      if (oldIndex !== newIndex) {
        setColumns((prev) => ({
          ...prev,
          [activeColumn]: arrayMove(prev[activeColumn], oldIndex, newIndex),
        }));
      }
      setPlaceholder(overId);
    }
    // Move across columns
    else {
      const movingTask = columns[activeColumn].find((t) => t._id === activeId);
      const newSource = columns[activeColumn].filter((t) => t._id !== activeId);

      const overIndex = columns[overColumn].findIndex((t) => t._id === overId);
      const newDestination =
        overIndex === -1
          ? [...columns[overColumn], movingTask]
          : [
              ...columns[overColumn].slice(0, overIndex),
              movingTask,
              ...columns[overColumn].slice(overIndex),
            ];

      setColumns((prev) => ({
        ...prev,
        [activeColumn]: newSource,
        [overColumn]: newDestination,
      }));

      setPlaceholder(movingTask._id);
    }
  };

  /** Drag End (commit changes to DB) */
  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);
    setPlaceholder(null);

    if (!over) return;

    const activeId = active.id;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(over.id);
console.log('active Column:',activeColumn,',', 'active Column:',overColumn, ' ==============>');


    // if (activeColumn && overColumn && activeColumn !== overColumn) {
      dispatch(updateTaskStatus({ taskId: activeId, newStatus: overColumn }));
    // }
  };

  /** Render */
  if (loading) return <Loading />;
  if (error) return <h1>Error: {error}</h1>;

  const columnTitles = {
    "to-do": "To Do",
    "in-process": "In Progress",
    submitted: "In Review",
    done: "Done",
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div className="grid grid-cols-4 gap-5 mt-2 px-2 items-start">
        {Object.entries(columns).map(([colKey, taskList]) => (
          <TaskColumn
            key={colKey}
            id={colKey}
            title={columnTitles[colKey]}
            tasks={taskList}
            placeholderId={placeholder}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard option={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default AllTask;
