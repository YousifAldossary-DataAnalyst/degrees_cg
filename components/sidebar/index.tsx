import React from 'react'
import NewButton from './_component/boards'
import Boards from './_component/boards'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <aside className=' z-[1] left-0 bg-primary/80 h-full w-[80px] flex-col flex p-3 gap-y-4 text-white items-center border rounded-md'>
      <Boards/>
    </aside>
  )
}

export default SideBar