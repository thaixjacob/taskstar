interface Board {
  columns: Map<TypedColumns, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createAt: string;
  title: string;
  status: TypedColumn;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}

interface TaskType {
  id: TypedColumn;
  name: string;
  description: string;
  color: string;
}
