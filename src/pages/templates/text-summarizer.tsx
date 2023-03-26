import Template, { ResultBox } from "@/components/layout/template";
import Layout from "@/components/layout/layout";

import { Input, Textarea, Text } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";
import Markdown from "markdown-to-jsx"
import { ResponseProps } from "@/components/modals/FeedbackModal"


const TextSummarizer = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [summarySentence, setSummarySentence] = useState("");
    const [actionItems, setActionItems] = useState("");
    const [freeformSection, setFreeformSection] = useState("");
    const [bulletPoints, setBulletPoints] = useState("");
    const [responseProps, setResponseProps] = useState<ResponseProps>({
        aiToolEndpointName: "",
        userPromptFeedbackContext: {},
        aiResponseFeedbackContext: {},
    });


    const onSubmit = async (event: FormEvent) => {
        setShowResult(true);
        setLoading(true);
        event.preventDefault();

        const body = {
            // @ts-ignore
            textToSummarize: event.target.textToSummarize.value,
            // @ts-ignore
            includeSummarySentence: event.target.includeSummarySentence.checked,
            // @ts-ignore
            numberOfBullets: event.target.numberOfBullets.value,
            // @ts-ignore
            numberOfActionItems: event.target.numberOfActionItems.value,
            // @ts-ignore
            freeformCommand: event.target.freeformCommand.value,
        }

        uFetch("/api/ai-for-u/text-summarizer", { session, method: "POST", body: JSON.stringify(body) }).then(response => response.json())
            .then(data => {
                setSummarySentence(data.summarySentence);
                setBulletPoints(data.bulletPoints)
                setActionItems(data.actionItems);
                setFreeformSection(data.freeformSection);
                setResponseProps({
                    aiResponseFeedbackContext: data,
                    userPromptFeedbackContext: body,
                    aiToolEndpointName: "text-summarizer"
                });
                setLoading(false);
            })
    }
    const exampleUrl = `/api/ai-for-u/text-summarizer-examples`
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit} setShowResult={setShowResult}>
                    <Textarea id="textToSummarize" name="textToSummarize" fullWidth label="Text to summarize" form="task-form" />
                    <input type="checkbox" id="includeSummarySentence" name="includeSummarySentence" />
                    <label htmlFor="includeSummarySentence" style={{ paddingLeft: "1em" }}>Include summary sentence</label>
                    <Input id="numberOfBullets" name="numberOfBullets" type="number" min={0} fullWidth label="Number of bullets" />
                    <Input id="numberOfActionItems" name="numberOfActionItems" type="number" min={0} fullWidth label="Number of action items" />
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform command" />
                    <ResultBox showResult={showResult} loading={loading} responseProps={responseProps} template="text-summarizer">
                        <Text h3>Summary Sentence</Text>
                        <Markdown>{summarySentence}</Markdown>
                        <Text h3>Bullet Points</Text>
                        <Markdown>{bulletPoints}</Markdown>
                        <Text h3>Action Items</Text>
                        <Markdown>{actionItems}</Markdown>
                        <Text h3>Freeform Section</Text>
                        <Markdown>{freeformSection}</Markdown>
                    </ResultBox>
                </Template>
            </Layout>
        </>
    )
}

export default TextSummarizer;