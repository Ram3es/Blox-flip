import clsx from 'clsx'

enum LabelStyleEnum {
  Default = 'Default',
  Green = 'Green'
}

enum ChildrenStyleEnum {
  Default = 'Default',
  None = 'None'
}

interface GameInfoListItemProps {
  label: string
  children: JSX.Element
  labelStyle?: keyof typeof LabelStyleEnum
  childrenStyle?: keyof typeof ChildrenStyleEnum
}

const GameInfoListItem = ({
  label,
  children,
  labelStyle = LabelStyleEnum.Default,
  childrenStyle = ChildrenStyleEnum.Default
}: GameInfoListItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span
        className={clsx('text-xs font-extrabold uppercase', {
          'text-gray-primary': labelStyle === LabelStyleEnum.Default,
          'text-green-primary': labelStyle === LabelStyleEnum.Green
        })}
      >
        {label}
      </span>
      <div
        className={clsx('min-w-[120px] min-h-[48px] flex items-center justify-center', {
          'px-2 bg-blue-accent rounded-lg': childrenStyle === ChildrenStyleEnum.Default
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default GameInfoListItem
