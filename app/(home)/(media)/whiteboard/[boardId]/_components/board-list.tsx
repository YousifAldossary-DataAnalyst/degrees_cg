import { GetBoard, GetEditBoardData } from '@/lib/data';
import React from 'react'

interface BoardListPorps {
    boardId: string;
}
// {boardId}: BoardListPorps
const BoardList = async () => {
    const getId = await  GetBoard()
    const data = await GetEditBoardData(getId[0]) 
     //WIP: change to API call
    if(!data?.length) {
        return ( 
            <div>
                No boards available
            </div>
        )
    }
  return (
    <div>
        {data.map((edit) => edit.title)} + hello
    </div>
  )
}

export default BoardList