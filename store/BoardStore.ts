
import { getTodosGroupByColumn } from '@/lib/getTodosGroupByColumns';
import { create } from 'zustand'

interface BoardState {
board:Board;
getBoard:()=>void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board:{
    colums: new Map<TypedColumn,Column>()
  },
  getBoard:async()=>{
   const board =await getTodosGroupByColumn()
   set({board});
  }
}))