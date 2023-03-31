import { Textarea as NextUITextarea, Text } from "@nextui-org/react"
import  {TextareaProps as NextUITextareaProps} from "@nextui-org/react/types/textarea/textarea";
import InfoPopover from "./InfoPopover";


declare type TextareaProps = Omit<NextUITextareaProps, "minRows"|"maxRows"> & {
    tooltip?: string;
    label?: string | JSX.Element
    minRows?: number
    maxRows?: number
}


const Textarea = ({tooltip="", label, ...props}: TextareaProps) => {
    props = {...props};
    const finalLabel = <Text span>{label}<InfoPopover text={tooltip}/></Text>;
    return <NextUITextarea fullwidth {...props} label={finalLabel}/>
}

export default Textarea;