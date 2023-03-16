import Layout from "@/components/layout/layout";
import Template from "@/components/layout/template";
import { uFetch } from "@/utils/http";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { convertNewlines } from "@/utils/response";

interface TextSummarizerProps {
    textToSummarize: string
    includeSummarySentence: boolean
    numberOfBullets: number
    numberOfActionItems: number
    freeformCommand: string
}

const NoteSummarizer = () => {
    const {data: session} = useSession();
    const [textToSummarize, setTextToSummarize] = useState("");
    const [numberOfBullets, setNumberOfBullets] = useState(0);
    const [numberOfActionItems, setNumberOfActionItems] = useState(0);
    const [includeSummarySentence, setIncludeSummarySentence] = useState(false);
    const [freeformCommand, setFreeformCommand] = useState("");
    const [generatedText, setGeneratedText] = useState<JSX.Element>(()=><></>);
    const body = {
        textToSummarize,
        numberOfBullets,
        numberOfActionItems,
        includeSummarySentence,
        freeformCommand,
    }

    const resetValues = () => {
        setTextToSummarize("");
        setNumberOfBullets(0);
        setNumberOfActionItems(0);
        setIncludeSummarySentence(false);
        setFreeformCommand("");
        setGeneratedText(<></>)
    }

    const submitNotes = async () => {
        const response = await uFetch("/api/ai-for-u/text-summarizer", {
            session,
            method: "POST",
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if(response.status === 200) {
            const {summarySentence, bulletPoints, actionItems, freeformSection} = data;

            setGeneratedText(<>
                <div>{convertNewlines(summarySentence)}</div>
                <div>{convertNewlines(bulletPoints)}</div>
                <div>{convertNewlines(actionItems)}</div>
                <div>{convertNewlines(freeformSection)}</div>
            </>);
        }
        else if (response.status === 422) {

        }
    }

    const fillExample = ({textToSummarize, numberOfBullets, numberOfActionItems, includeSummarySentence, freeformCommand}: TextSummarizerProps) => {
        resetValues();
        setTextToSummarize(textToSummarize);
        setNumberOfBullets(numberOfBullets);
        setNumberOfActionItems(numberOfActionItems);
        setIncludeSummarySentence(includeSummarySentence);
        setFreeformCommand(freeformCommand);
    }

    return (
        <Layout>
            <Template exampleUrl="/api/ai-for-u/text-summarizer-examples" fillExample={fillExample}>
                <h1>Text Summarizer</h1>
                <Textarea
                    autoFocus
                    fullWidth
                    label="Text to Summarize *"
                    value={textToSummarize}
                    onChange={(event) => {setTextToSummarize(event.target.value)}}
                />

                <Input
                    type="number"
                    fullWidth
                    label="Number of Bullets"
                    value={numberOfBullets}
                    onChange={(event) => {setNumberOfBullets(Number(event.target.value))}}
                />
                <Input
                    type="number"
                    fullWidth
                    label="Number of Action Items"
                    value={numberOfActionItems}
                    onChange={(event) => {setNumberOfActionItems(Number(event.target.value))}}
                />
                <div>
                    <Checkbox
                        label="Include Summary Sentence"
                        isSelected={includeSummarySentence}
                        onChange={(event) => {setIncludeSummarySentence(event)}}
                    />
                </div>
                <Input
                    type="text"
                    fullWidth
                    label="Freeform Command"
                    value={freeformCommand}
                    onChange={(event) => {setFreeformCommand(event.target.value)}}
                />
                <div>
                    {generatedText}
                </div>
                <Button
                    light
                    color="error"
                    onPress={resetValues}
                >
                    Reset
                </Button>
                <Button
                    onPress={submitNotes}
                >
                    Submit
                </Button>

            </Template>
        </Layout>

    )
}

export default NoteSummarizer;
