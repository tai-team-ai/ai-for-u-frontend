import { Textarea as NextUITextarea, Text } from '@nextui-org/react'
import { type TextareaProps as NextUITextareaProps } from '@nextui-org/react/types/textarea/textarea'
import InfoPopover from './InfoPopover'

declare type TextareaProps = Omit<NextUITextareaProps, 'minRows' | 'maxRows'> & {
  tooltip?: string
  label?: string | JSX.Element
  minRows?: number
  maxRows?: number
}

const Textarea = ({ tooltip = '', label, ...props }: TextareaProps): JSX.Element => {
  props = { ...props }
  const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>
  // @ts-expect-error The label field needs to be string but it supports Elements as well.
  return <NextUITextarea fullwidth {...props} label={finalLabel}/>
}

export default Textarea
