import React from 'react'
interface ContactIconBoxesProps {
    icon: React.ReactNode;
    label: string;
    details?: string;
}
const ContactBoxes = ({icon,label,details}:ContactIconBoxesProps) => {
  return (
    <div className='w-fit h-fit flex gap-x-4 items-center justify-center'>
      <div className='w-14 h-14 rounded-lg text-2xl bg-[#2B3036] flex justify-center items-center text-white'>{icon}</div>
      <div className='w-fit h-fit flex flex-col gap-y-1 justify-center'>
        <h1 className='text-white font-medium text-base'>{label}</h1>
        <h1 className='text-[#A3ABB2] font-normal text-sm'>{details}</h1>
      </div>
    </div>
  )
}

export default ContactBoxes
