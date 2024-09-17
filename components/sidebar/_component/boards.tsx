import React from 'react'
import NewButton from './board-form'
import BoardLists from './list'

type Props = {}

const Boards = () => {
  return (
    <div>
        <NewButton/>
        <BoardLists/>
    </div>
  )
}

export default Boards