import { Checkbox as NextUICheckbox, Text } from "@nextui-org/react"
import { CheckboxProps as NextUICheckboxProps } from "@nextui-org/react";
import InfoPopover from "./InfoPopover";


declare type CheckboxProps = Omit<NextUICheckboxProps, "label"> & {
    tooltip?: string;
    label?: string | JSX.Element
}


const Checkbox = ({tooltip="", label, ...props}: CheckboxProps) => {
    const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>;
    return (
        // @ts-ignore
    <NextUICheckbox fullwidth {...props} label={finalLabel}/>
    )
}

export default Checkbox;