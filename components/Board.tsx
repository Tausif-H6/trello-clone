"use client";
import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext,DropResult,Droppable } from 'react-beautiful-dnd';
import Columns from './Columns';
function Board() {
  const getBoard = useBoardStore((state)=>state.getBoard);
  const board = useBoardStore((state)=>state.board)
  const setBoardState =useBoardStore((state)=> state.setBoardState)
  useEffect(()=>{
    getBoard();
  },[getBoard])
console.log("board",board);
const handleOnDragEnd =(result: DropResult)=>{
  const {destination, source,type}= result;
  console.log("destination",destination,"source",source,"type",type);
  if(!destination)return;

  //Handle Column Drag and drop
  if(type==="column"){
    const entries = Array.from(board.columns.entries());
    const [removed] = entries.splice(source.index,1);
    entries.splice(destination.index,0,removed);
    const rearrangedColumns = new Map(entries);
    setBoardState({
      ...board,columns:rearrangedColumns
    })

  }
  
}
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided)=> <div
        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
        {...provided.droppableProps}
        ref={provided.innerRef}
        >{
        // Rendering columns
        Array.from(board.columns.entries()).map(([id,column],index)=>(
          <Columns
            key={id}
            id={id}
            todos={column.todos}
            index={index}
          />
        ))
        
        }{provided.placeholder} {/* Add the placeholder */}
        </div> }
        

      </Droppable>
    </DragDropContext>
  )
}

export default Board