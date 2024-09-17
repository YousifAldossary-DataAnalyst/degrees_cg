"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

function CopyButton({aiResponse}:any) {
  return (
    <div>
          <Button variant='ghost' className='bg-primary/80 hover:bg-primary text-white hover:text-white size-10 md:size-14 lg:size-18 w-14 md:w-20 text-xs md:text-sm lg:text-lg'
          onClick={()=>navigator.clipboard.writeText(aiResponse)}
                >Copy</Button>
    </div>
  )
}

export default CopyButton