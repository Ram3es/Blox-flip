import { ChangeEvent, InputHTMLAttributes, useRef, useState } from 'react'
import { Button } from '../base/Button'

interface UploaderWithInlineLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const UploaderWithInlineLabel = ({ label, ...inputProps }: UploaderWithInlineLabelProps) => {
  const [file, setFile] = useState<File>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    setFile(event.target.files[0])

    if (inputProps.onChange) {
      inputProps.onChange(event)
    }
  }
  return (
    <div className='pl-4 pr-4 rounded-10 gradient-background--blue__secondary py-4 flex items-center justify-between w-full cursor-text'>
      <div className='flex items-center gap-2'>
        <span className='rounded-md px-5 py-2 font-medium text-sm gradient--background--blue__third text-gray-primary'>
          {label}
        </span>
        {file && (
          <span
            className='px-3 py-2 min-w-[60px] rounded-[10px] font-medium text-white'
            style={{
              background:
                'linear-gradient(228.46deg, rgba(64, 73, 112, 0.55) 2.2%, rgba(82, 101, 181, 0.55) 99.81%)'
            }}
          >
            {file?.name}
          </span>
        )}
      </div>
      <input type='file' ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      <div className='flex items-center justify-end'>
        <Button type='button' variant='GreenGradient' onClick={handleUploadClick}>
          <span className='px-2 py-2 text-xs'>Upload new</span>
        </Button>
      </div>
    </div>
  )
}

export default UploaderWithInlineLabel
