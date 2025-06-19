import Link from "next/link";
import React from "react";
interface ContactIconProps {
  icon: React.ReactNode;
  label: string;
    href: string;
}
const ContactLinks = ({ icon,label,href }: ContactIconProps) => {
  return (
    <Link href={href} className="w-fit h-fit flex flex-col gap-y-2 justify-center items-center cursor-pointer">
      <div className="w-14 h-14 text-2xl flex gap-x-4 items-center justify-center bg-[#2b3036] rounded-full">
        {icon}
      </div>
      <h1>{label}</h1>
    </Link>
  );
};

export default ContactLinks;
