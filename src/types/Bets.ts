import { MouseEvent } from 'react'

export interface BetToolkit {
  label: string
  function: (value: MouseEvent<HTMLButtonElement | MouseEvent>) => void
}
