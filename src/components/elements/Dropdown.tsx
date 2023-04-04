import {Dropdown as NextUIDropdown, SelectionMode} from "@nextui-org/react"
import InfoPopover from "./InfoPopover";



declare type DropdownProps = {
    id?: string
    label?: string | JSX.Element
    placeholder?: string | null;
    selectionMode: SelectionMode
    value: string
    setValue: (v: any) => void;
    validSelections: {[key: string]: string};
    tooltip?: string
}


const Dropdown = ({id="", label="", placeholder=null, selectionMode="single", setValue, value, tooltip = "", validSelections = {}}: DropdownProps) => {
    let [defaultValue, defaultLabel] = Object.entries(validSelections)[0];
    console.log(value)
    console.log(typeof value);
    if(placeholder) {
        defaultValue = placeholder;
        defaultLabel = validSelections[placeholder];
    }

    return (
        <>
            <label style={{ display: "block"}} htmlFor={id}>{label} <InfoPopover text={tooltip}/></label>
            <NextUIDropdown >
                <NextUIDropdown.Button css={{textTransform: "capitalize"}} flat>
                    {
                        value
                    }
                </NextUIDropdown.Button>
                <NextUIDropdown.Menu
                    disallowEmptySelection
                    selectionMode={selectionMode}
                    selectedKeys={value.split(", ")}
                    // @ts-ignore
                    onSelectionChange={(v: Key) => {
                        if(selectionMode === "single") {
                            setValue(v.currentKey)
                        }
                        else {
                            setValue(Array.from(v).join(", "));
                        }
                    }}
                >
                    {Object.entries(validSelections).map(([key, val]) => {
                        return <NextUIDropdown.Item css={{textTransform: "capitalize"}} key={key}>{val}</NextUIDropdown.Item>
                    })}

                </NextUIDropdown.Menu>
            </NextUIDropdown>
    </>
    )
}

export default Dropdown;
