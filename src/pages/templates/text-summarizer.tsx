import Layout from "@/components/layout/layout";
import Template from "@/components/layout/template";
import { uFetch } from "@/utils/http";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateInput } from "@/utils/input";

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

    const updateTextToSummarize = (text: string) => {
        updateInput({selector:"#text-to-summarize", value:text, update:setTextToSummarize});
    }
    const updateNumberOfBullets = (num: number) => {
        updateInput({selector:"#number-of-bullets", value:num, update:setNumberOfBullets});
    }
    const updateNumberOfActionItems = (num: number) => {
        updateInput({selector:"#number-of-action-items", value:num, update:setNumberOfActionItems});
    }
    const updateIncludeSummarySentence = (checked: boolean) => {
        updateInput({selector:"#include-summary-sentence", value:checked, update:setIncludeSummarySentence});
    }
    const updateFreeformCommand = (text: string) => {
        updateInput({selector:"#freeform-command", value:text, update:setFreeformCommand});
    }

    const resetValues = () => {
        updateTextToSummarize("")
        updateNumberOfBullets(0)
        updateNumberOfActionItems(0)
        updateIncludeSummarySentence(false)
        updateFreeformCommand("")
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
                <pre>{summarySentence}</pre>
                <pre>{bulletPoints}</pre>
                <pre>{actionItems}</pre>
                <pre>{freeformSection}</pre>
            </>);
        }
        else if (response.status === 422) {

        }
    }

    const fillExample = ({textToSummarize, numberOfBullets, numberOfActionItems, includeSummarySentence, freeformCommand}: TextSummarizerProps) => {
        resetValues();
        updateTextToSummarize(textToSummarize);
        updateNumberOfBullets(numberOfBullets);
        updateNumberOfActionItems(numberOfActionItems);
        updateIncludeSummarySentence(includeSummarySentence);
        updateFreeformCommand(freeformCommand);
    }

    return (
        <Layout>
            <Template exampleUrl="/api/ai-for-u/text-summarizer-examples" fillExample={fillExample}>
                <h1>Text Summarizer</h1>
                <Textarea
                    id="text-to-summarize"
                    autoFocus
                    fullWidth
                    label="Text to Summarize *"
                    onChange={(event) => {setTextToSummarize(event.target.value)}}
                />

                <Input
                    id="number-of-bullets"
                    type="number"
                    fullWidth
                    label="Number of Bullets"
                    onChange={(event) => {setNumberOfBullets(Number(event.target.value))}}
                />
                <Input
                    id="number-of-action-items"
                    type="number"
                    fullWidth
                    label="Number of Action Items"
                    onChange={(event) => {setNumberOfActionItems(Number(event.target.value))}}
                />
                <div>
                    <Checkbox
                        id="include-summary-sentence"
                        label="Include Summary Sentence"
                        onChange={(event) => {setIncludeSummarySentence(event)}}
                    />
                </div>
                <Input
                    id="freeform-command"
                    type="text"
                    fullWidth
                    label="Freeform Command"
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
