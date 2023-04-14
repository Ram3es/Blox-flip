const GameInfoListItem = ({ label, children }: { label: string, children: JSX.Element }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="uppercase text-gray-primary font-extrabold text-13">{label}</span>
      <div className="p-4 min-w-[121px] bg-blue-accent flex justify-center rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default GameInfoListItem
