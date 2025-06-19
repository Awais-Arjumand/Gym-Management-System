import React from 'react'
interface CreateMealBoxesProps {
  label: string;
}
const CreateMealBoxes = ({label}:CreateMealBoxesProps) => {
  return (
    <div className='w-full h-fit rounded-2xl bg-white text-black flex justify-center items-center'>
      <h1 className='text-lg font-semibold'>{label}</h1>
    </div>
  )
}

export default CreateMealBoxes
