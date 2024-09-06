import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { useEffect } from "react";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "Let's start",
  inprogress: "Working on it",
  done: "Mission completed!",
};

function Column({ id, todos, index }: Props) {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  const columnBgColor =
    id === "todo"
      ? "bg-red-100"
      : id === "inprogress"
      ? "bg-yellow-100"
      : id === "done"
      ? "bg-green-100"
      : "bg-white/50";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/*render*/}
          <Droppable droppableId={index.toString()} type="card">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? columnBgColor : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}

                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                    {searchString
                      ? todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length
                      : todos.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided: DraggableProvided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                  <div className="flex justify-center items-center w-full bg-[#8ba6e7] hover:bg-[#728dce] p-2 rounded-md space-y-2 drop-shadow-md">
                    <button
                      className=" text-white/90 font-semibold hover:text-white w-full p-2 justify-center items-center"
                      aria-label="Create task"
                      onClick={handleAddTodo}
                    >
                      <div className="flex flex-row justify-center items-center gap-2">
                        <PlusCircleIcon className="h-5 w-5" />
                        <p className="">Add new task</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
