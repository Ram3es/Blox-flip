import React from 'react'

const GiftCard = () => {
  return (
        <div className="px-3 mb-6 xs:mb-10 sm:mb-18 w-full xs:w-1/3 max-w-[calc(100vw)]">
        <div className="relative radial--press rounded-2xl border border-pink-primary/25 h-full">
            <img src="/src/assets/img/gift.png" alt="" width="200" height="192" loading="lazy" decoding="async" className="absolute z-10 -top-4 -right-6" />
            <div className="relative z-20 overflow-hidden pl-6 pr-6 pr-18 pt-12 pb-4">
                <div className="text-4xl font-extrabold text-white uppercase ">want free robux?</div>
                <div className="uppercase text-lightblue-primary font-extrabold text-26 ml-4 mt-2 no-underline">press</div>
                <div className="relative -left-3 mb-5">
                    <img src="/src/assets/img/gift_btn_outline.svg" alt="" width="467" height="72" loading="lazy" decoding="async" className="relative z-10 max-w-none" />
                    <a href="#" className="absolute top-1/2 -mt-4 left-5 bg-pink-secondary text-white uppercase font-xs leading-8 px-10 rounded-full z-20 w-48 text-center max-w-full ">here</a>
                </div>
                <div className="text-center">
                    <a href="#" className="inline-block font-xs text-pink-accent leading-4 py-2 px-10 rounded-full bg-pink-accent/10">Rewards & Faucets</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GiftCard
