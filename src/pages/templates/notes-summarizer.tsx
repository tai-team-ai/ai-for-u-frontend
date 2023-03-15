import Layout from "@/components/layout/layout";
import Template from "@/components/layout/template";
import { uFetch } from "@/utils/http";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NoteSummarizer = () => {
    const {data: session} = useSession();
    const [notesToSummarize, setNotesToSummarize] = useState("");
    const [numberOfBullets, setNumberOfBullets] = useState(0);
    const [numberOfActionItems, setNumberOfActionItems] = useState(0);
    const [includeSummarySentence, setIncludeSummarySentence] = useState(false);
    const [generatedText, setGeneratedText] = useState("");
    const body = {
        notesToSummarize,
        numberOfBullets,
        numberOfActionItems,
        includeSummarySentence
    }

    const resetValues = () => {
        setNotesToSummarize("");
        setNumberOfBullets(0);
        setNumberOfActionItems(0);
        setIncludeSummarySentence(false);
    }

    const submitNotes = async () => {
        const response = await uFetch("/api/ai-for-u/note-summarizer", {
            session,
            method: "POST",
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if(response.status === 200) {
            const {summarySentence, bulletPoints, actionItems} = data;
            const text = summarySentence? [summarySentence] : [];
            if(bulletPoints) {
                text.push("");
                text.push("Bullet Points:")
                text.push(bulletPoints);
            }
            if(actionItems) {
                text.push("");
                text.push("Action Items:")
                text.push(actionItems);
            }
            setGeneratedText(text.join("\n"));
        }
        else if (response.status === 422) {

        }
    }

    return (
        <Layout>
            <Template>
                <h1>Note Summarizer</h1>
                <Textarea
                    autoFocus
                    fullWidth
                    label="Text to Summarize *"
                    value={notesToSummarize}
                    onChange={(event) => {setNotesToSummarize(event.target.value)}}
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
                <Textarea
                    fullWidth
                    label="Results"
                    readOnly
                    value={generatedText}
                    ></Textarea>
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
