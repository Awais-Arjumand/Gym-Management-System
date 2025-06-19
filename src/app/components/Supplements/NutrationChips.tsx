// NutrationChips.tsx
import React from 'react'

interface NutrationChipsTypes {
    label: string
    active?: boolean
    onClick?: () => void
}

const NutrationChips = ({ label, active = false, onClick }: NutrationChipsTypes) => {
  return (
    <div 
      className={`w-fit px-4 py-2 hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-2xl ${active ? 'bg-white' : 'bg-[#2B3036]'} flex justify-center items-center`}
      onClick={onClick}
    >
      <h1 className={`font-medium text-sm ${active ? '!text-black' : '!text-white'}`}>{label}</h1>
    </div>
  )
}

export default NutrationChips