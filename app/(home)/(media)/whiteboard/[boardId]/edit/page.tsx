import React from 'react'
import Canvas from './_components/canvas'
import { Room } from '@/components/global/room';
import { Loading } from './_components/laoding';
import SideBar from '@/components/sidebar';
import Navigation from '@/components/site/navigation';

type Props = {
      boardId: string;
  }
const EditPage = ({ boardId }: Props) => {
    //WIP: each editboard should be saved individually.
  return (
    <Room roomId={boardId} fallback={<Loading /> }>
        <Canvas boardId={boardId}/>
    </Room>
  )
}

export default EditPage