import Template from "@/components/layout/template";
import Layout from "@/components/layout/layout";

import { Input, Textarea } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { uFetch } from "@/utils/http";
import { useSession } from "next-auth/react";


const TextRevisor = () => {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event: FormEvent) => {
        setLoading(true);
        event.preventDefault();

        const data = {
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

        uFetch("/api/ai-for-u/text-summarizer", {session, method: "POST", body: JSON.stringify(data)}).then(response => response.json())
        .then(data => {
            alert(JSON.stringify(data));
            setLoading(false);
        })
    }
    const exampleUrl = `/api/ai-for-u/text-summarizer-examples`
    return (
        <>
            <Layout>
                <Template exampleUrl={exampleUrl} formLoading={loading} handleSubmit={onSubmit}>
                    <Textarea id="textToSummarize" name="textToSummarize" fullWidth label="Text to summarize" form="task-form"/>
                    <input type="checkbox" id="includeSummarySentence" name="includeSummarySentence"/>
                    <label htmlFor="includeSummarySentence" style={{paddingLeft: "1em"}}>Include summary sentence</label>
                    <Input id="numberOfBullets" name="numberOfBullets" type="number" fullWidth label="Number of bullets"/>
                    <Input id="numberOfActionItems" name="numberOfActionItems" type="number" fullWidth label="Number of action items" />
                    <Input id="freeformCommand" name="freeformCommand" type="text" fullWidth label="Freeform command"/>
                </Template>
            </Layout>
        </>
    )
}

export default TextRevisor;