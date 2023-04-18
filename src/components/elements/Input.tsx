import { Input as NextUIInput, Text } from '@nextui-org/react'
import { type Props as NextUIInputProps } from '@nextui-org/react/types/input/input-props'
import InfoPopover from './InfoPopover'
import React from 'react'

declare type InputProps = Omit<NextUIInputProps, 'label'> & {
  tooltip?: string
  label?: string | JSX.Element
}

const Input = ({ tooltip = '', label, ...props }: InputProps): JSX.Element => {
  const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>
  return (
    // @ts-expect-error the Input class's label field is expected to be a string but supports an element.
    <NextUIInput fullwidth css={{ marginBottom: '0.4rem' }} {...props} label={finalLabel}/>
  )
}

export default Input
