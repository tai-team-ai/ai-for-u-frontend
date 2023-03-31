import { Input as NextUIInput, Text } from "@nextui-org/react"
import { Props as NextUIInputProps } from "@nextui-org/react/types/input/input-props"
import InfoPopover from "./InfoPopover";


declare type InputProps = NextUIInputProps & {
    tooltip?: string;
}


const Input = ({tooltip="", label, type, ...props}: InputProps) => {
    const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>;
    return (
    <NextUIInput fullwidth {...props} label={finalLabel}/>
    )
}

export default Input;