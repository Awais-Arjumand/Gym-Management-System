import { MemberShipDealsInfoData } from '@/app/utils/data'
import React from 'react'
import MemberShipDeals from './MemberShipDeals'
import { useUser } from "@clerk/nextjs";

const MembershipOptions = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full h-fit px-4 sm:px-6 md:px-16 lg:px-20 py-10 md:py-14 flex flex-col gap-y-8 md:gap-y-10">
      <div className="w-full text-center md:text-left">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Membership Options</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 justify-items-center">
        {MemberShipDealsInfoData.map((item, key) => (
          <MemberShipDeals
            key={key}
            PaymentTitle={item.PaymentTitle}
            Price={item.Price}
            ButtonText={item.ButtonText}
            features={item.features}
            isFree={item.Price === "Free"}
            isSignedIn={isSignedIn}
          />
        ))}
      </div>
    </div>
  )
}

export default MembershipOptions