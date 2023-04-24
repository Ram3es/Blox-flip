import clsx from 'clsx'

export enum LabelFillEnum {
  Blue = 'Blue',
  Green = 'Green'
}

interface LabelProps {
  label: string
  labelFill?: keyof typeof LabelFillEnum
  labelClasses?: string
}

const Label = ({ label, labelClasses, labelFill = LabelFillEnum.Blue }: LabelProps) => {
  const labelBaseClasses = clsx('rounded-md px-5 py-2 font-medium text-sm', {
    'gradient--background--blue__third text-gray-primary': labelFill === LabelFillEnum.Blue,
    'bg-green-primary/20 text-green-primary': labelFill === LabelFillEnum.Green
  })
  return <span className={labelClasses ?? labelBaseClasses}>{label}</span>
}

export default Label
