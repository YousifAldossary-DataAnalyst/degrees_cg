'use client'

import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const RemoveSideBar = (props: Props) => {
    const searchParams = useParams<{boardId: string}>()
    if (searchParams) {
      console.log(searchParams)
      return (
        <div className="">
        </div>
      );
    }
  return (
    <div>RemoveSideBar</div>
  )
}

export default RemoveSideBar