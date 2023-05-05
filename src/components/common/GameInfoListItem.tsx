const GameInfoListItem = ({ label, children }: { label: string, children: JSX.Element }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="uppercase text-gray-primary font-extrabold text-13">{label}</span>
      <div className="px-2 min-w-[121px] min-h-[48px] bg-blue-accent flex items-center justify-center rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default GameInfoListItem
