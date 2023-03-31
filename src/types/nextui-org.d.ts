import { InputProps, FormElement } from "@nextui-org/react"
import { Props as InputProps } from "@nextui-org/react/types/input/input-props"
import { CheckboxProps as CheckboxProps_ } from "@nextui-org/react/types/checkbox/checkbox"


declare module "@nextui-org/react/types/input/input-props" {
    export interface Props extends Omit<InputProps, "label"> {
        label: string | JSX.Element
    }
}
