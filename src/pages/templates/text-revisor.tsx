import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";
import Input from "@/components/elements/Input"
import Textarea from "@/components/elements/Textarea"
import ToneDropdown, {ValidTones} from "@/components/elements/ToneDropdown";
import { Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import Markdown from 'markdown-to-jsx';
import { placeholderDefault } from "@/utils/transform";
import { ShowDiffBtn } from "@/components/elements/diffview";
import { ResponseProps } from "@/components/modals/FeedbackModal";


const TextRevisor = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [revisedTextList, setRevisedTextList] = useState<string[]>([]);
    const [initialValue, setInitialValue] = useState("");
    const defaultTone = "friendly" as ValidTones;
    const [selectedTone, setSelectedTone] = useState<ValidTones>(defaultTone);
    const [responseProps, setResponseProps] = useState<ResponseProps>({
        aiToolEndpointName: "",
        userPromptFeedbackContext: {},
        aiResponseFeedbackContext: {},
    });

    const onSubmit = async (event: FormEvent) => {
        setLoading(true);
        setShowResult(true);
        event.preventDefault();
        // @ts-ignore
        const textToRevise = event.target.textToRevise.value
        const body = {
            textToRevise: textToRevise,
            // @ts-ignore
            numberOfRevisions: Number(placeholderDefault(event.target.numberOfRevisions)),
            // @ts-ignore
            revisionTypes: placeholderDefault(event.target.revisionTypes).split(",").map(value => value.trim()),
            // @ts-ignore
            tone: selectedTone,
            // @ts-ignore
            creativity: Number(placeholderDefault(event.target.creativity)),
            // @ts-ignore
            freeformCommand: event.target.freeformCommand.value,
        }

        uFetch("/api/ai-for-u/text-revisor", { session, method: "POST", body: JSON.stringify(body) }).then(response => response.json())
            .then(data => {
                setRevisedTextList([...data.revisedTextList]);
                setResponseProps({
                    aiResponseFeedbackContext: data,
                    userPromptFeedbackContext: body,
                    aiToolEndpointName: "text-revisor"
                });
                setInitialValue(textToRevise);
                setLoading(false);
            })
    }
    const exampleUrl = `/api/ai-for-u/text-revisor-examples`
    const fillMapping = {
        "tone": setSelectedTone
    };
    const defaults: [(a: any) => void, any][] = [
        [setSelectedTone, defaultTone],
    ]
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit} setShowResult={setShowResult} fillMapping={fillMapping} defaults={defaults} resultBox={
                    <ResultBox showResult={showResult} loading={loading} responseProps={responseProps}>
                        {revisedTextList.map((text, index) => <>
                            <Text b>{`Revision ${index + 1}: `}</Text>
                            <Markdown>{text}</Markdown><ShowDiffBtn oldValue={initialValue} newValue={text}></ShowDiffBtn>
                        </>)}
                    </ResultBox>
                }>
                    <Textarea id="textToRevise" name="textToRevise" fullWidth label="Text to revise" form="task-form" />
                    <Input id="numberOfRevisions" name="numberOfRevisions" type="number" min={0} fullWidth label="Number of revisions" placeholder="1" />
                    <Input id="revisionTypes" name="revisionTypes" fullWidth label="Revision types" placeholder="spelling, grammar, sentence structure, word choice, consistency, punctuation" />
                    <ToneDropdown selectedTone={selectedTone} setSelectedTone={setSelectedTone}/>
                    <Input id="creativity" name="creativity" type="number" min={0} fullWidth label="Creativity" placeholder="50" />
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform Command" />
                </Template>
            </Layout>
        </>
    )
}

export default TextRevisor;