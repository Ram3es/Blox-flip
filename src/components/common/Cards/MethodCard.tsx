import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IMethodCardProps {
  path: string
  title: string
  image: string

}

const MethodCard: FC<IMethodCardProps> = ({ path, title, image }) => {
  return (
    <div className="px-1.5 pb-3 w-1/2 xxs:w-1/3 md:w-1/2 deposite--case">
    <Link to={path} className="border--mask-hover border--radial-blue rounded h-full overflow-hidden text-sm group">
        <div className="bg-gradient--blue-darken from-blue-accent-secondary/20 hover:bg-transparent hover:bg-gradient-radial-80 hover:from-blue-light-secondary/30 hover:to-blue-accent-secondary/0 rounded h-full text-center relative z-20 border-y border-y-transparent group-hover:border-y-sky-primary/40">
            <div className="flex flex-col items-center justify-between rounded h-full py-4 px-2">
                <div className="bg-blue-primary/30 rounded px-2 w-10/12 py-1 leading-4 font-semibold text-gray-primary mb-5 flex flex-col justify-center group-hover:bg-blue-highlight">{title}</div>
                <div className="w-full pb-60% h-0 relative mb-2">
                    <img src={image} loading="lazy" decoding="async" className="absolute -inset-full m-auto" />
                </div>
            </div>
        </div>
    </Link>
</div>
  )
}

export default MethodCard
