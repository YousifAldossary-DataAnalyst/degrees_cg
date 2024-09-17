'use client'
import SideBar from '@/components/sidebar';
import OrgSideBar from '@/components/sidebar/orgsidebar';
import React from 'react'
import RemoveSideBar from './[boardId]/_components/remove-side-bar';
import { useParams } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex gap-y-4 h-full'>
        <div className='w-full h-full'>
            <div className='flex gap-x-4 h-full'>
                {/* <OrgSideBar/> */}
                <div className='h-full flex-1'>
                    {/** add content */}
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout