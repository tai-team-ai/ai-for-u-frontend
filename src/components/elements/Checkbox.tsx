import { Checkbox as NextUICheckbox, Text, type CheckboxProps as NextUICheckboxProps } from '@nextui-org/react'
import InfoPopover from './InfoPopover'

declare type CheckboxProps = Omit<NextUICheckboxProps, 'label'> & {
  tooltip?: string
  label?: string | JSX.Element
}

const Checkbox = ({ tooltip = '', label, ...props }: CheckboxProps): JSX.Element => {
  const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>
  return (
  // @ts-expect-error this is for the third party library checkbox so overriding it's label type is necessary.
    <NextUICheckbox fullwidth {...props} label={finalLabel}/>
  )
}

export default Checkbox
