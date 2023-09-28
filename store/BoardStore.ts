import { databases, storage } from "@/appwrite";
import { getTodosGroupByColumn } from "@/lib/getTodosGroupByColumns";
import uploadImage from "@/lib/uploadImage";
import { ID } from "appwrite";
import { todo } from "node:test";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, toddoId: Todo, id: TypedColumn) => void;
  newTaskInput:string;
  setnewTaskInput:(input:string)=>void;
  newTaskType:TypedColumn;
  setNewTaskType:(columnId:TypedColumn)=>void;
  image:File|null;
  setImage:(image:File|null)=> void;
  addTask:(todo:string,columnId:TypedColumn,image?:File|null)=>void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  newTaskInput:"",
  newTaskType:"todo",
  image:null,
  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    //Delete todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  setnewTaskInput:(input:string)=> set({newTaskInput:input}), 
  setNewTaskType:(columnId:TypedColumn)=> set({newTaskType:columnId}),
  
  setImage:(image:File|null)=>set({image}),

  addTask:async(todo:string, columnId:TypedColumn,image?:File|null)=>{

    let file:Image|undefined;

    if(image){
      const fileUpoaded = await uploadImage(image);
      //If image uploadedd then we will give info to our variable
      if(fileUpoaded){
        file={
          bucketId:fileUpoaded.bucketId,
          fileId:fileUpoaded.$id,
        }
      }
    }

   const{$id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title:todo,
        status:columnId,
        //Include the image if exist
        ...(file&&{image:JSON.stringify(file)})
      }
    );

    set({newTaskInput:""});
    set((state)=>{
      const newColumn= new Map(state.board.columns);
      const newTodo: Todo = {
          $id,
          $createdAt:new Date().toISOString(),
          title:todo,
          status:columnId,
          ...(file && {image:file})
      }
      const column = newColumn.get(columnId);
      if(!column){
        newColumn.set(columnId,{
          id:columnId,
          todos:[newTodo],
        })
      }else{
        newColumn.get(columnId)?.todos.push(newTodo);
      }

      return {
        board:{
          columns:newColumn,
        }
      }
    })
  }

}));
