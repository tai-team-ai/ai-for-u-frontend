import Input from "./Input";
import Textarea from "./Textarea";
import Dropdown from "./Dropdown";
import { Checkbox, Button } from "@nextui-org/react";

import { ChangeEvent, useState } from "react";


const camelToTitle = (camel: string) => {
    const reuslt = camel.replace(/([A-Z])/g, " $1");
    return reuslt.charAt(0).toUpperCase() + reuslt.slice(1);
}

const defaultType = (type: string) => {
    if( type === "string") {
        return "";
    }
    if( type === "integer") {
        return 0;
    }
    if (type === "array") {
        return [];
    }
    if(type === "boolean") {
        return false;
    }
}

export declare type State = {
    value: any
    setValue: (v:any) => void;
    defaultValue: any
    initialValue: any
}

declare type TemplateFormProps = {
    properties: any;
    requiredList: string[];
    state: {[key: string]: State}
}

const TemplateForm = ({properties, requiredList, state}: TemplateFormProps) => {
    return (
        <>
        {Object.entries(properties).map(([title, property]: any) => {
        const required = requiredList.includes(title);
        const labelValue = camelToTitle(title);
        const label = <>
            <span>{labelValue}<span style={{color: "red"}}>{required ? "*" : ""}</span></span>
        </>;
        let placeholder = "";
        if(typeof property.default !== "undefined") {
            placeholder = property.default;
        }
        if(Array.isArray(placeholder)) {
            placeholder = placeholder.join(", ");
        }

        const defaultValue = defaultType(property.type);

        const [value, setValue] = useState(placeholder);
        const initialValue = placeholder;
        state[title] = {value, setValue, defaultValue, initialValue};
        const handleChange = function(e: ChangeEvent|boolean, cast: (v:any)=>void=String) {
            if(typeof e === "boolean") {
                state[title].setValue(e);
            }
            else {
                // @ts-ignore
                state[title].setValue(cast(e.target.value));
            }
        }

        if (typeof property.allOf !== "undefined") {
            const validSelection = Object.fromEntries(property.allOf[0].enum.map((value: string) => {
                return [value, value.charAt(0).toUpperCase() + value.slice(1)];
            }));

            return <Dropdown
                selectionMode="single"
                value={state[title].value}
                setValue={state[title].setValue}
                validSelections={validSelection}
                id={title}
                label={label}
                placeholder={placeholder as string}
            />
        }
        if (property.type === "string") {
            if(typeof property.maxLength === "undefined" || property.maxLength > 200) {
                return (
                <Textarea
                    id={title}
                    name={title}
                    fullWidth
                    maxLength={property.maxLength}
                    label={label}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                />)
            }
            else {
                return (
                <Input
                    fullWidth
                    id={title}
                    name={title}
                    maxLength={property.maxLength}
                    label={label}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                />);
            }
        }
        if(property.type === "integer") {
            const min = typeof property.minimum === "undefined" ? 0 : property.minimum;
            return (
                <Input
                    fullWidth
                    id={title}
                    name={title}
                    type="number"
                    min={min}
                    max={property.maximum}
                    required={required}
                    label={label}
                    placeholder={placeholder}
                    onChange={(e: ChangeEvent) => handleChange(e, Number)}
                />
            )
        }
        if(property.type === "boolean") {
            return (
                <Checkbox
                    id={title}
                    name={title}
                    size="xs"
                    color="primary"
                    // @ts-ignore
                    label={label}
                    onChange={(e: boolean) => handleChange(e, Boolean)}
                />
            )
        }
        if(property.type === "array") {
            if(typeof property.items.enum === "undefined") {
                return (
                <Input
                    fullWidth
                    id={title}
                    name={title}
                    maxLength={property.maxLength}
                    label={label}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                />);
            }
            else {
                const validSelection = Object.fromEntries(property.items.enum.map((value: string) => {
                    return [value, value.charAt(0).toUpperCase() + value.slice(1)];
                }));
                return <Dropdown
                    selectionMode="multiple"
                    value={state[title].value}
                    setValue={state[title].setValue}
                    validSelections={validSelection}
                    id={title}
                    label={label}
                    placeholder={placeholder as string}
                />;
            }
        }
    })}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "1em" }}>
        <Button
            light
            color="error"
            onPress={(e) => {
                Object.entries(state).forEach(([key, {value, setValue, defaultValue, initialValue}]) => {
                    setValue(initialValue);
                    const element: HTMLInputElement|null = document.querySelector(`input#${key},textarea#${key}`);
                    if(element) {
                        element.value = defaultValue;

                        if (element.type === "checkbox") {
                            setValue(defaultValue);
                        }

                        if(element.checked !== defaultValue) {
                            element.click();
                        }
                    }
                });
            }}
        >Reset</Button>
        <Button
            flat
            onPress={(e) => {
                const body = Object.fromEntries(Object.entries(state).map(([key, {value, setValue, defaultValue}]) => {
                    return [key, value];
                }));
                alert(JSON.stringify(body));
            }}>Submit
        </Button>
    </div>
    </>);
}

export default TemplateForm