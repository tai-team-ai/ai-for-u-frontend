import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";

import { Input, Textarea, Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import Markdown from 'markdown-to-jsx';


const TextRevisor = () => {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [rawResponse, setRawResponse] = useState("");
    const [revisedTextList, setRevisedTextList] = useState<string[]>([]);

    const onSubmit = async (event: FormEvent) => {
        setLoading(true);
        setShowResult(true);
        event.preventDefault();
        const data = {
            // @ts-ignore
            textToRevise: event.target.textToRevise.value,
            // @ts-ignore
            numberOfRevisions: event.target.numberOfRevisions.value,
            // @ts-ignore
            revisionTypes: event.target.revisionTypes.value.split(","),
            // @ts-ignore
            tone: event.target.tone.value,
            // @ts-ignore
            creativity: event.target.creativity.value,
            // @ts-ignore
            freeformCommand: event.target.freeformCommand.value,
        }

        uFetch("/api/ai-for-u/text-revisor", {session, method: "POST", body: JSON.stringify(data)}).then(response => response.json())
        .then(data => {
            setRevisedTextList([...data.revisedTextList]);
            setRawResponse(data.revisedTextList.join("\n"));
            setLoading(false);
        })
    }
    const exampleUrl = `/api/ai-for-u/text-revisor-examples`
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit}>
                    <Textarea id="textToRevise" name="textToRevise" fullWidth label="Text to revise" form="task-form"/>
                    <Input id="numberOfRevisions" name="numberOfRevisions" type="number" fullWidth label="Number of revisions"/>
                    <Input id="revisionTypes" name="revisionTypes" fullWidth label="Revision types" />
                    <label style={{display: "block"}} htmlFor="tone">Tone</label>
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
                    <Input id="creativity" name="creativity" type="number" fullWidth label="Creativity"/>
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform Command"/>
                    <ResultBox showResult={showResult} loading={loading} rawResponse={rawResponse} template="text-revisor">
                        {revisedTextList.map((text, index) => <>
                            <Text h3>{`Revision ${index+1}`}</Text>
                            <Markdown>{text}</Markdown>
                        </>)}
                    </ResultBox>
                </Template>
            </Layout>
        </>
    )
}

export default TextRevisor;