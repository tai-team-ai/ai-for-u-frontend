import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";

import { Input, Textarea, Text } from "@nextui-org/react";
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
            tone: event.target.tone.value,
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
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit} setShowResult={setShowResult}>
                    <Textarea id="textToRevise" name="textToRevise" fullWidth label="Text to revise" form="task-form" />
                    <Input id="numberOfRevisions" name="numberOfRevisions" type="number" min={0} fullWidth label="Number of revisions" placeholder="1" />
                    <Input id="revisionTypes" name="revisionTypes" fullWidth label="Revision types" placeholder="spelling, grammar, sentence structure, word choice, consistency, punctuation" />
                    <label style={{ display: "block" }} htmlFor="tone">Tone</label>
                    <select id="tone" name="tone">
                        <option value="friendly">friendly</option>
                        <option value="formal">formal</option>
                        <option value="informal">informal</option>
                        <option value="optimistic">optimistic</option>
                        <option value="worried">worried</option>
                        <option value="curious">curious</option>
                        <option value="assertive">assertive</option>
                        <option value="encouraging">encouraging</option>
                        <option value="surprised">surprised</option>
                        <option value="cooperative">cooperative</option>
                    </select>
                    <Input id="creativity" name="creativity" type="number" min={0} fullWidth label="Creativity" placeholder="50" />
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform Command" />
                    <ResultBox showResult={showResult} loading={loading} responseProps={responseProps} template="text-revisor">
                        {revisedTextList.map((text, index) => <>
                            <Text b>{`Revision ${index + 1}: `}</Text>
                            <Markdown>{text}</Markdown><ShowDiffBtn oldValue={initialValue} newValue={text}></ShowDiffBtn>
                        </>)}
                    </ResultBox>
                </Template>
            </Layout>
        </>
    )
}

export default TextRevisor;