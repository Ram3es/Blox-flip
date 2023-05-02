const RoundWinBorderBottomEffect = ({ isShown, isAddWinClass }: { isShown: boolean, isAddWinClass: boolean }) => {
  return (isShown
    ? <div className="relative z-10">
      <span className={`${isAddWinClass ? 'border-green-primary' : 'border-red-primary'} border w-1/2 absolute -inset-x-full mx-auto bottom-0 z-20`} />
    </div>
    : null)
}

export default RoundWinBorderBottomEffect
