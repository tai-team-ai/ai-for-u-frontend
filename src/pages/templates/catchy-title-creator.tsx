import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";

import { Input, Textarea, Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import Markdown from 'markdown-to-jsx';
import { placeholderDefault } from "@/utils/transform";


const TextRevisor = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [rawResponse, setRawResponse] = useState("");
    const [titlesList, setTitlesList] = useState<string[]>([]);

    const onSubmit = async (event: FormEvent) => {
        setLoading(true);
        setShowResult(true);
        event.preventDefault();
        const data = {
            // @ts-ignore
            text: event.target.text.value,
            // @ts-ignore
            textType: placeholderDefault(event.target.textType),
            // @ts-ignore
            targetAudience: placeholderDefault(event.target.targetAudience),
            // @ts-ignore
            expectedTone: placeholderDefault(event.target.expectedTone),
            // @ts-ignore
            specificKeywordsToInclude: event.target.specificKeywordsToInclude.value.split(","),
            // @ts-ignore
            numTitles: Number(event.target.numTitles.value),
            // @ts-ignore
            creativity: placeholderDefault(event.target.creativity),
            // @ts-ignore
            freeformCommand: event.target.freeformCommand.value,
        }

        uFetch("/api/ai-for-u/catchy-title-creator", { session, method: "POST", body: JSON.stringify(data) }).then(response => response.json())
            .then(data => {
                setTitlesList([...data.titles]);
                setRawResponse(data.titles.join("\n"));
                setLoading(false);
            })
    }
    const exampleUrl = `/api/ai-for-u/catchy-title-creator-examples`
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit} setShowResult={setShowResult}>
                    <Textarea id="text" name="text" fullWidth label="Text" form="task-form" />
                    <Input id="textType" name="textType" type="text" fullWidth label="Text type" placeholder="document" />
                    <Input id="targetAudience" name="targetAudience" type="text" fullWidth label="Target audience" placeholder="public" />
                    <Input id="expectedTone" name="expectedTone" type="text" fullWidth label="Expected tone" placeholder="informal" />
                    <Input id="specificKeywordsToInclude" name="specificKeywordsToInclude" type="text" fullWidth label="Specific keywords to include" placeholder="" />
                    <Input id="numTitles" name="numTitles" type="number" min={0} fullWidth label="Number of titles" placeholder="3" />
                    <Input id="creativity" name="creativity" type="number" min={0} fullWidth label="Creativity" placeholder="50" />
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform Command" />
                    <ResultBox showResult={showResult} loading={loading} rawResponse={rawResponse} template="catchy-title-creator-examples">
                        <Text h3>Titles</Text>
                        <ul>
                            {titlesList.map(title => {
                                return <>
                                    <li><Markdown>{title}</Markdown></li>
                                </>
                            })}
                        </ul>
                    </ResultBox>
                </Template>
            </Layout>
        </>
    )
}

export default TextRevisor;