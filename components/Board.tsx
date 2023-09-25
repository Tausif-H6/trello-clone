"use client";
import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext,DropResult,Droppable } from 'react-beautiful-dnd';
import Columns from './Columns';
function Board() {
  const getBoard = useBoardStore((state)=>state.getBoard);
  const board = useBoardStore((state)=>state.board)
  useEffect(()=>{
    getBoard();
  },[getBoard])
console.log("board",board);
const handleOnDragEnd =(result: DropResult)=>{}
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided)=> <div
        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
        {...provided.droppableProps}
        ref={provided.innerRef}
        >{
        // Rendering columns
        Array.from(board.colums.entries()).map(([id,column],index)=>(
          <Columns
            key={id}
            id={id}
            todos={column.todos}
            index={index}
          />
        ))
        
        }</div> }
        

      </Droppable>
    </DragDropContext>
  )
}

export default Board