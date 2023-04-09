import Input from "./Input";
import Textarea from "./Textarea";
import Dropdown from "./Dropdown";
import { Checkbox, Button, Loading, Text } from "@nextui-org/react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import { ResponseProps } from "../modals/FeedbackModal";
import { ResultBox } from "../layout/template";
import Markdown from "markdown-to-jsx";
import { ShowDiffBtn } from "./diffview";
import { showSnackbar } from "./Snackbar";

const camelToTitle = (camel: string) => {
    const reuslt = camel.replace(/([A-Z])/g, " $1");
    return reuslt.charAt(0).toUpperCase() + reuslt.slice(1);
}

const defaultType = (type: string) => {
    if (type === "string") {
        return "";
    }
    if (type === "integer") {
        return 0;
    }
    if (type === "array") {
        return [];
    }
    if (type === "boolean") {
        return false;
    }
}

export declare type State = {
    setValue: (v: any) => void;
}

declare type TemplateFormProps = {
    task: string;
    properties: any;
    requiredList: string[];
    resets: { [key: string]: Reset }
    dataToChildren?: ((v: any) => JSX.Element) | null;
}

declare type ResultChildrenProps = {
    task: string;
    data: any;
    body: any;
}

const ResultChildren = ({ task, data, body }: ResultChildrenProps) => {
    if (task === "text-revisor") {
        return <>
            {data.revisedTextList.map((text: string, index: number) => <>
                <Text b>{`Revision ${index + 1}: `}</Text>
                <Markdown>{text}</Markdown>
                <ShowDiffBtn oldValue={body.textToRevise} newValue={text} />
            </>)}
        </>
    }
    else if (task === "catchy-title-creator") {
        return <>
            <Text h3>Titles</Text>
            <ul>
                {data.titles.map((title: string) => {
                    return <>
                        <li><Markdown>{title}</Markdown></li>
                    </>
                })}
            </ul>
        </>
    }
    else if (task === "cover-letter-writer") {
        return <>
            <Markdown>{data.coverLetter}</Markdown>
        </>
    }
    else if (task === "text-summarizer") {
        return <>
            <Markdown>{data.summary}</Markdown>
        </>
    }
    else {
        return <>
            <Markdown>{JSON.stringify(data)}</Markdown>
        </>
    }
}

const jsonTypeToInputType = (jsonType: string) => {
    if (jsonType === "string") {
        return "text";
    }
    else if (jsonType === "integer") {
        return "number";
    }
    return undefined;
}

export declare type Reset = {
    value: any;
    setValue: (v: any) => void;
    default: any;
}

const TemplateForm = ({ task, properties, requiredList, resets }: TemplateFormProps) => {

    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [responseProps, setResponseProps] = useState<ResponseProps>({
        aiToolEndpointName: "",
        userPromptFeedbackContext: {},
        aiResponseFeedbackContext: {},
    });
    const [children, setChildren] = useState<JSX.Element>(<></>)


    const transforms: { [key: string]: (v: any) => any } = {};

    return (<>
        <form
            onSubmit={
                async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    const formData = new FormData(e.target as HTMLFormElement);
                    const body = Object.fromEntries(Array.from(formData.entries()).map(([key, val]: any) => [key, transforms[key](val)]))

                    const response = await uFetch(`/api/ai-for-u/${task}`, { session, method: "POST", body: JSON.stringify(body) });
                    if (response.status === 200) {
                        const data = await response.json();
                        setResponseProps({ aiResponseFeedbackContext: data, aiToolEndpointName: task, userPromptFeedbackContext: body });
                        setChildren(<ResultChildren body={body} data={data} task={task} />);
                        setLoading(false);
                        setShowResult(true);
                    }
                    else if (response.status === 429) {
                        const message = await response.json();
                        showSnackbar(message.message);
                        setLoading(false);
                    }
                    else {
                        const message = await response.text();
                        showSnackbar(message);
                        setLoading(false);
                    }
                }
            }
            onReset={
                (e) => {
                    const checkboxes: NodeListOf<HTMLInputElement> = e.currentTarget.querySelectorAll("input[type=checkbox]");
                    checkboxes.forEach((box) => {
                        if (box.checked) {
                            box.click();
                        }
                    })
                    for (const reset of Object.values(resets)) {
                        reset.setValue(reset.default);
                    }
                    setShowResult(false);
                }
            }
        >
            {
                Object.entries(properties).map(([title, property]: any) => {
                    const required = requiredList.includes(title);
                    const labelValue = camelToTitle(title);
                    const label = <>
                        <span>{labelValue}<span style={{ color: "red" }}>{required ? "*" : ""}</span></span>
                    </>;
                    const inputProps = {
                        required: required,
                        name: title,
                        id: title,
                        type: jsonTypeToInputType(property.type),
                        fullWidth: true,
                        minLength: property.minLength,
                        maxLength: property.maxLength,
                        min: property.minimum | 0,
                        max: property.maximum,
                        label: label,
                    }
                    if (property.type === "string") {
                        transforms[title] = String;
                        if (typeof property.maxLength != "undefined" && property.maxLength <= 200) {
                            return <Input  {...inputProps} />
                        }
                        return <Textarea {...inputProps} />
                    }
                    if (property.type === "integer") {
                        transforms[title] = Number;
                        return <Input {...inputProps} />
                    }
                    if (property.type === "boolean") {
                        transforms[title] = Boolean;
                        // @ts-ignore
                        return <Checkbox size="sm" {...inputProps} />
                    }
                    const dropdownProps = {
                        id: title,
                        name: title,
                        label: label,
                    }
                    if (typeof property.allOf !== "undefined") {
                        transforms[title] = String;
                        const [selected, setSelected] = useState([property.default]);
                        resets[title] = { value: selected, setValue: setSelected, default: [property.default] }
                        return <Dropdown {...dropdownProps} validSelections={property.allOf[0].enum} selectionMode="single" selected={selected} setSelected={setSelected} />
                    }
                    if (property.type === "array" && typeof property.items.enum !== "undefined") {
                        transforms[title] = v => v.split(", ");
                        const [selected, setSelected] = useState(property.default);
                        resets[title] = { value: selected, setValue: setSelected, default: property.default }
                        return <Dropdown {...dropdownProps} validSelections={property.items.enum} selectionMode="multiple" selected={selected} setSelected={setSelected} />
                    }
                })
            }
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "1em" }}>
                <Button
                    light
                    color="error"
                    type="reset"
                >Reset</Button>
                <Button
                    flat
                    type="submit"
                    disabled={loading}
                >{loading ? <Loading type="points" /> : "Submit"}
                </Button>
            </div>
            <ResultBox showResult={showResult} loading={loading} responseProps={responseProps} >
                {children}
            </ResultBox>
        </form></>);
}

export default TemplateForm