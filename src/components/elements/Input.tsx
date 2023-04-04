import { Input as NextUIInput, Text } from "@nextui-org/react"
import { Props as NextUIInputProps } from "@nextui-org/react/types/input/input-props"
import InfoPopover from "./InfoPopover";


declare type InputProps = Omit<NextUIInputProps, "label"> & {
    tooltip?: string;
    label?: string | JSX.Element
}


const Input = ({tooltip="", label, ...props}: InputProps) => {
    const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>;
    return (
    <NextUIInput fullwidth {...props} label={finalLabel}/>
    )
}

export default Input;